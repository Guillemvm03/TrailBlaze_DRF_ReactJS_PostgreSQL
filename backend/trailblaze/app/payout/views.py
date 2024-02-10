from django.shortcuts import render
from rest_framework import viewsets, status, views
from rest_framework.response import Response
from rest_framework.decorators import api_view, action, permission_classes
from rest_framework.permissions import (IsAuthenticated, AllowAny, IsAdminUser, IsAuthenticatedOrReadOnly)
from ..users.serializers import UserSerializer
from ..users.models import User
from decimal import Decimal
from .models import Payout

from django.conf import settings

import stripe

# Create your views here.

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def Charge(request):
    try:
        amount = request.data.get('amount')
        if amount is not None:
            if amount not in [10, 30, 50]:
                amount = 10
                
        stripe.api_key=settings.STRIPE_SECRET_KEY
        id_payment = request.data.get('id')
        if id_payment is not None:
            email = request.user
            payment = stripe.PaymentIntent.retrieve(id_payment)
            payout_exists = Payout.objects.filter(id_payment=id_payment).exists()
            
            if payout_exists:
                return Response({'error': "Payment already exists"}, status=status.HTTP_400_BAD_REQUEST)
            
            if payment and payment['status'] == 'succeeded':
                user_instance = User.objects.get(email=email)
                user_instance.balance += Decimal(payment['amount'] / 100)
                user_instance.save()
                Payout.objects.create(id_payment=id_payment, id_user=user_instance, amount=Decimal(payment['amount'] / 100))
            else:
                return Response({'error': "Payment not found"}, status=status.HTTP_404_NOT_FOUND)
            
            return Response({'id_payment': id_payment, "payment": payment}, status=status.HTTP_200_OK)
        else:
            intent = stripe.PaymentIntent.create(
                amount=amount*100,
                currency="eur",
                payment_method_types=["card"],
            )
            return Response({'cs': intent['client_secret']})

    except Exception as e:
        print("Exception:", str(e))
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
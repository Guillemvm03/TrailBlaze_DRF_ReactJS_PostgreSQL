from django.shortcuts import render
from rest_framework import viewsets, status, views
from rest_framework.response import Response
from rest_framework.decorators import api_view, action, permission_classes
from rest_framework.permissions import (IsAuthenticated, AllowAny, IsAdminUser, IsAuthenticatedOrReadOnly)
from django.contrib.auth import authenticate
from trailblaze.app.core.permissions import IsAdmin
from trailblaze.app.rent.models import Rent
from trailblaze.app.bikes.models import Bike
from trailblaze.app.slots.models import Slot
from trailblaze.app.rent.serializers import RentSerializer
from trailblaze.app.users.serializers import UserSerializer

from django.utils import timezone

# Create your views here.


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def start_rent(request):
    try:
        email = request.user
        user_serializer_context = { 'email': email }
        user_serializer = UserSerializer.getUser(context=user_serializer_context)
        print ("serializer", user_serializer)

            #    rent_data = request.data
            # serializer = self.get_serializer(data=rent_data)
            # print ("serializer", serializer.data)
            # serializer.is_valid(raise_exception=True) 
    
        return Response ("serializer.data", status=status.HTTP_201_CREATED)
    except Exception as e:
        print("Exception:", str(e))
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




class RentView(viewsets.ModelViewSet):
    queryset = Rent.objects.all()
    serializer_class = RentSerializer 
    permission_classes=[IsAdmin]
    # lookup_field='slug'
    # filterset_class = RentFilter

    http_method_names = ['get', 
                         'post', 
                         'put', 
                         'delete']
    


    # @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    # def start_rent(self, request):
    #     try:
    #         rent_data = request.data
    #         serializer = self.get_serializer(data=rent_data)
    #         print ("serializer", serializer.data)
    #         serializer.is_valid(raise_exception=True)
    #         print (serializer.data)

    #         return Response("serializer.data", status=status.HTTP_201_CREATED)
    #     except Exception as e:
    #         return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    # @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    # def end_rent(self, request, pk=None):
    #     rent = self.get_object()
    #     serializer = self.get_serializer(rent, data=request.data, partial=True)
    #     if serializer.is_valid():
    #         rent = serializer.save(
    #             end_date=timezone.now(),
    #             status='completed'  
    #         )
    #         # rent.amount = calculate_rent_amount(rent.start_date, rent.end_date)
    #         rent.save()
    #         return Response({
    #             'status': 'Rent ended',
    #             # 'total_amount': rent.amount
    #         }, status=status.HTTP_200_OK)
    #     else:
    #         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
from django.shortcuts import render
from rest_framework import viewsets, status, views
from rest_framework.response import Response
from rest_framework.decorators import api_view, action, permission_classes
from rest_framework.permissions import (IsAuthenticated, AllowAny, IsAdminUser, IsAuthenticatedOrReadOnly)
from django.contrib.auth import authenticate
from trailblaze.app.core.permissions import IsAdmin
from trailblaze.app.rent.models import Rent
from trailblaze.app.slots.models import Slot
from trailblaze.app.users.models import User
from trailblaze.app.rent.serializers import RentSerializer
from trailblaze.app.users.serializers import UserSerializer

from datetime import datetime, timezone
from decimal import Decimal
from trailblaze.app.core.utils import calculate_price
# Create your views here.

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def start_rent(request):
    try:

        if request.user.balance < Decimal('5.00'):
            return Response({'error': 'El balance no es suficiente'}, status=status.HTTP_400_BAD_REQUEST)
        
        active_rents = Rent.objects.filter(user=request.user, status='active').count()
        if active_rents > 0:
            return Response({'error': 'Ya tienes una reserva activa'}, status=status.HTTP_400_BAD_REQUEST)
        

        slot_id = request.data.get('collection_slot')
        slot = Slot.objects.get(pk=slot_id, status='Active')

        user = User.objects.get(email=request.user.email)


        bike = slot.bike
        rent = Rent.objects.create(
            user=user,
            bike=bike,
            collection_slot=slot,
            return_slot=None,
            start_date=datetime.now(),
            amount=0.0,
            status='active'
        )

        slot.status = 'free'
        slot.bike = None

        slot.save()

        request.user.balance -= Decimal('0.25')
        request.user.save()

        serializer = RentSerializer(rent)


        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    except Slot.DoesNotExist:
        return Response({'error': 'El slot de recogida no está disponible'}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def end_rent(request, rent_id):
    try:
        user = request.user

        # Verificar si la renta pertenece al usuario y está activa
        rent = Rent.objects.get(id=rent_id, user=user, status='active')

        # Obtener el slot de retorno
        return_slot_id = request.data.get('return_slot')
        return_slot = Slot.objects.get(id=return_slot_id, status='free', bike=None)

        end_time = datetime.now(timezone.utc)
        start_time = rent.start_date.replace(tzinfo=timezone.utc)
        duration = end_time - start_time

        price = calculate_price(start_time, end_time)
        price = round(price, 2)

        # Asignar el precio al campo amount de la renta
        rent.amount = price
        rent.save()

        # Actualizar el balance del usuario
        user.balance -= Decimal(str(price))
        user.save()

        # Actualizar la renta y el slot de retorno
        rent.end_date = datetime.now()
        rent.status = 'inactive'
        rent.return_slot = return_slot
        rent.save()

        return_slot.bike = rent.bike
        return_slot.status = 'Active'
        return_slot.save()

        serializer = RentSerializer(rent)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Rent.DoesNotExist:
        return Response({'error': 'La renta no existe o no está activa'}, status=status.HTTP_400_BAD_REQUEST)
    except Slot.DoesNotExist:
        return Response({'error': 'El slot de retorno no está disponible o ya tiene una bicicleta asignada'}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class RentView(viewsets.ModelViewSet):
    queryset = Rent.objects.all()
    serializer_class = RentSerializer 
    permission_classes=[IsAuthenticated]
    # permission_classes=[IsAdmin]

    # lookup_field='slug'
    # filterset_class = RentFilter

    http_method_names = ['get', 
                         'post', 
                         'put', 
                         'delete']
    
    @action(detail=False, methods=['get'])
    def user_rent(self, request):
            
        user = request.user
        try:
            active_rent = Rent.objects.get(user=user, status='active')
            serializer = self.get_serializer(active_rent)
            return Response(serializer.data)
        except Rent.DoesNotExist:
            return Response({'error': 'No hay reserva activa para este usuario'}, status=status.HTTP_404_NOT_FOUND)
        
    @action(detail=False, methods=['get'])
    def rental_history(self, request):

        user = request.user
        rental_history = Rent.objects.filter(user=user, status='inactive').order_by('-start_date')
        print(rental_history)
        serializer = self.get_serializer(rental_history, many=True)
        return Response(serializer.data)
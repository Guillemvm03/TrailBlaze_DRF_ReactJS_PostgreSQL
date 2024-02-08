from django.shortcuts import render
from rest_framework import viewsets, status, views
from rest_framework.response import Response
from rest_framework.decorators import api_view, action, permission_classes
from rest_framework.permissions import (IsAuthenticated, AllowAny, IsAdminUser, IsAuthenticatedOrReadOnly)
from django.contrib.auth import authenticate
from trailblaze.app.rent.models import Rent
from trailblaze.app.bikes.models import Bike
from trailblaze.app.slots.models import Slot
from trailblaze.app.rent.serializers import RentSerializer

# Create your views here.

class RentView(viewsets.ModelViewSet):
    queryset = Rent.objects.all()
    serializer_class = RentSerializer 
    permission_classes=[IsAuthenticated]
    # lookup_field='slug'
    # filterset_class = ArticleFilter
    http_method_names = ['get', 'post', 'put', 'delete']
    

    # def create(self, request, *args, **kwargs):
    #     data = request.data
    #     user = request.user
    #     bike = Bike.objects.get(id=data['bike'])
    #     collection_slot = Slot.objects.get(id=data['collection_slot'])
    #     return_slot = Slot.objects.get(id=data['return_slot'])
    #     amount = data['amount']
    #     status = data['status']
    #     lat = data['lat']
    #     lng = data['lng']
    #     rent = Rent.objects.create(
    #         user=user,
    #         bike=bike,
    #         collection_slot=collection_slot,
    #         return_slot=return_slot,
    #         amount=amount,
    #         status=status,
    #         lat=lat,
    #         lng=lng
    #     )
    #     rent.save()
    #     serializer = RentSerializer(rent)
    #     return Response(serializer.data, status=status.HTTP_201_CREATED)
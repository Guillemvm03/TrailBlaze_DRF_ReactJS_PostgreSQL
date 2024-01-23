from django.shortcuts import render

from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework import viewsets

from .models import Bike
from .serializers import BikeSerializer

# Create your views here.
class BikeView(viewsets.GenericViewSet):

    def get(self, request,slug = None):
        if slug:
            bike_one = get_object_or_404(Bike.objects.all(), slug=slug)
            serializer_one = BikeSerializer(bike_one)
            return Response(serializer_one.data)
        
        bikes = Bike.objects.all()
        serializer = BikeSerializer(bikes, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        bike = request.data
        serializer = BikeSerializer(data=bike)
        # print(serializer)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            # print(serializer.data)
        return Response(serializer.data)

    def delete(self, request, slug):
        bike = get_object_or_404(Bike.objects.all(), slug=slug)
        bike.delete()
        return Response({'data': 'Bike deleted'})

    def put(self, request, slug):
        bike = get_object_or_404(Bike.objects.all(), slug=slug)
        data = request.data
        serializer = BikeSerializer(
            instance=bike, data=data, partial=True)
        if (serializer.is_valid(raise_exception=True)):
            serializer.save()
        return Response(serializer.data)
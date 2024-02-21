from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from .models import Slot
from .serializers import SlotSerializer
from ..bikes.models import Bike
from ..bikes.serializers import BikeSerializer
from ..stations.models import Station
from ..stations.serializers import StationSerializer

# Create your views here.
class SlotView(viewsets.GenericViewSet):
    
    def get(self, request, station_slug, slot_id=None):
        station = get_object_or_404(Station.objects.all(), slug=station_slug)
        if not station:
            return Response("Station not found")
        
        station = StationSerializer(station).data
        
        if slot_id:
            try:
                show_slots = Slot.objects.get(station_id=station["id"], pk=slot_id)
                serializer = SlotSerializer(show_slots).data
                return Response(serializer)
            except Slot.DoesNotExist:
                return Response("Slot not found")
        
        slots = Slot.objects.filter(station_id=station["id"])
        serializer = SlotSerializer(slots, many=True).data
        for slot in serializer:
            if slot["bike_id"]:
                bike = Bike.objects.get(id=slot["bike_id"])
                bike = BikeSerializer(bike).data
                slot["bike_slug"] = bike["slug"]
            else:
                slot["bike_slug"] = None
            
        return Response(serializer)
    
    def post(self, request, station_slug):
        
        context = { 'station_slug': station_slug }
        
        serializer = SlotSerializer.create(context=context)
        slots = Slot.objects.filter(id=serializer.id)
        
        return Response(SlotSerializer(slots, many=True).data)
    
    def put(self, request, station_slug, slot_id):
        station = get_object_or_404(Station.objects.all(), slug=station_slug)
        if not station:
            return Response("Station not found")
        
        station = StationSerializer(station).data
        
        if slot_id:
            try:
                slot = Slot.objects.get(station_id=station["id"], pk=slot_id)
                context={ 'bike_slug': request.data['bike_slug'], 'status': request.data['status'] }
                serializer = SlotSerializer(SlotSerializer.change_bike(instance=slot, context=context)).data
                if serializer["bike_id"]:
                    bike = Bike.objects.get(id=serializer["bike_id"])
                    bike = BikeSerializer(bike).data
                    serializer["bike_slug"] = bike["slug"]
                else:
                    serializer["bike_slug"] = None
                
                return Response(serializer)
            except Slot.DoesNotExist:
                return Response("Slot not found")
    
    def delete(self, request, station_slug, slot_id):
        try:
            station = get_object_or_404(Station.objects.all(), slug=station_slug)
            if not station:
                return Response("Station not found")
            
            station = StationSerializer(station).data
            if slot_id:
                try:
                    slot = Slot.objects.get(station_id=station["id"], pk=slot_id)
                    slot.delete()
                    return Response("Deleted")
                except Slot.DoesNotExist:
                    return Response("Slot not found")
        except Exception as e:
            return Response(e)    
        

    def get_all(self, request):
        slots = Slot.objects.all()
        serializer = SlotSerializer(slots, many=True).data
        return Response(serializer)

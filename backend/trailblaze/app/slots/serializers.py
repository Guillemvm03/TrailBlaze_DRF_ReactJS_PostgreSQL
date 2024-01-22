from rest_framework import serializers
from .models import Slot
from ..bikes.models import Bike
from ..stations.models import Station
from random import randint

class SlotSerializer(serializers.ModelSerializer):
        
        class Meta:
            model = Slot
            fields = ['id', 'station_id', 'bike_id', 'status']
        
        def to_Slot(instance):
            return {
                "id": instance.id,
                "station_id": instance.station_id,
                "bike_id": instance.bike_id,
                "status": instance.status,
            }
        
        def create(context):
            station_slug = context['station_slug']
            station = Station.objects.get(slug=station_slug)
            
            if station is None:
                raise serializers.ValidationError(
                    'Station is not find'
                )
            
            slot = Slot.objects.create(
                station_id=station.id,
                bike_id=None,
                status='free'
            )
            
            slot.save()
            return slot
        
        def change_bike(instance, context):
            bike_slug = context['bike_slug']
            status = context['status']
            
            bike = Bike.objects.get(slug=bike_slug)
            if bike is None:
                raise serializers.ValidationError(
                    'Bike is not find'
                )
            
            if status == 'manteinance':
                instance.status = 'manteinance'
                instance.bike_id = None
                instance.save()
                return instance
            
            if bike.id != 0 and instance.bike_id is not None:
                raise serializers.ValidationError(
                    'Slot is in use'
                )
            
            if bike.id != 0 and instance.bike_id is None:
                instance.bike_id = bike.id
                instance.status = 'used'
            
            if bike.id == 0:
                instance.bike_id = None
                instance.status = 'free'
            
            instance.save()
            return instance
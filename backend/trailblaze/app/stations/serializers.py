from rest_framework import serializers
from .models import Station

from random import randint

class StationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Station
        fields = ('id', 'slug', 'station_name', 'description', 'address', 'lat', 'lng', 'capacity', 'image')

        def to_representation(self, instance):
            return {
                'id': instance.id,
                'slug': instance.slug,
                'station_name': instance.station_name,
                'description': instance.description,
                'address': instance.address,
                'lat': instance.lat,
                'lng': instance.lng,
                'capacity': instance.capacity,
                'image': instance.image,
            }
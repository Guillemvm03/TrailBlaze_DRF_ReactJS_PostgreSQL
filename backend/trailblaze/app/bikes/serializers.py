from rest_framework import serializers
from .models import Bike

from random import randint

class BikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bike
        fields = ('id', 'slug', 'bike_type', 'gps')

        def to_Bike(self, instance):
            return {
                'id': instance.id,
                'slug': instance.slug,
                'bike_type': instance.bike_type,
                'gps': instance.gps,
            }
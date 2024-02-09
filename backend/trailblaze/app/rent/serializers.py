from datetime import datetime
from rest_framework import serializers
from .models import Rent
# from .utils import get_rental_price
from trailblaze.app.users.models import User
from trailblaze.app.slots import Slot 
from trailblaze.app.bikes import Bike 

class RentSerializer(serializers.ModelSerializaer):

    class Meta:
        model = Rent
        fields = '__all__'

    def create(self, validated_data):
        user = User.objects.get(id=validated_data['user_id'])
        bike = Bike.objects.get(id=validated_data['bike_id'])
        slot = Slot.objects.get(id=validated_data['slot_id'])
        rent = Rent.objects.create(
            user=user,
            bike=bike,
            slot=slot,
            start_time=validated_data['start_time'],
            end_time=validated_data['end_time'],
            price=validated_data['price'],
            status=validated_data['status']
        )
        return rent

    def update(self, instance, validated_data):
        instance.user_id = validated_data.get('user_id', instance.user_id)
        instance.bike_id = validated_data.get('bike_id', instance.bike_id)
        instance.slot_id = validated_data.get('slot_id', instance.slot_id)
        instance.start_time = validated_data.get('start_time', instance.start_time)
        instance.end_time = validated_data.get('end_time', instance.end_time)
        instance.price = validated_data.get('price', instance.price)
        instance.status = validated_data.get('status', instance.status)
        instance.save()
        return instance

    def validate(self, data):
        if data['start_time'] > data['end_time']:
            raise serializers.ValidationError("Start time must be before end time")
        return data

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['user'] = UserSerializer(instance.user).data
        representation['bike'] = BikeSerializer(instance.bike).data
        representation['slot'] = SlotSerializer(instance.slot).data
        return representation
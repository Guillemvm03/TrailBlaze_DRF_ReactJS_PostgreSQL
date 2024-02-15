from datetime import datetime
from rest_framework import serializers
from .models import Rent
# from .utils import get_rental_price
from trailblaze.app.users.models import User
from trailblaze.app.slots.models import Slot 
from trailblaze.app.bikes.models import Bike 

class RentSerializer(serializers.ModelSerializer):

    rent_id = serializers.CharField(required=False)
    # user = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField()
    bike = serializers.SerializerMethodField()
    collection_slot = serializers.SerializerMethodField()
    return_slot = serializers.SerializerMethodField()
    start_date = serializers.DateTimeField(required=False)
    end_date = serializers.DateTimeField(required=False)
    amount = serializers.DecimalField(max_digits=10, decimal_places=2,required=False)
    status = serializers.CharField(required=False)
    lat = serializers.CharField(required=False)
    lng = serializers.CharField(required=False)
    class Meta:
        model = Rent
        fields = ['id', 'rent_id', 'user', 'bike', 'collection_slot','return_slot','start_date', 'end_date', 'amount', 'status', 'lat', 'lng']
        # read_only_fields = [ 'user' ]



    def rent(context):
        username = context['username']
        slot_id = context['slot_id']

        # user = User.objects.get(username=username)
        # if user is None:
        #     raise serializers.ValidationError(
        #         'User not found'
        #     )

        slot = Slot.objects.get(pk=slot_id)
        if slot is None or slot.bike_id is None:
            raise serializers.ValidationError(
                'Slot not found '
            )

        bike = Bike.objects.get(pk=slot.bike_id)
        if bike is None:
            raise serializers.ValidationError(
                'Bike not found'
            )

        rent_user = Rent.objects.filter(user_id=user.id, end_slot_id=None)
        if len(rent_user) > 0:
            raise serializers.ValidationError(
                'The user can only have one rent open at a time'
            )

        # CREATE RENT

        rent = Rent.objects.create(
            user_id=user.id,
            bike_id=slot.bike_id,
            start_slot_id=slot_id
        )
        rent.save()

        # SLOT UPDATE

        slot.bike_id = None
        slot.status = 'unused'
        slot.save()

        # BIKE UPDATE

        bike.status = 'used'
        bike.save()

        return rent 


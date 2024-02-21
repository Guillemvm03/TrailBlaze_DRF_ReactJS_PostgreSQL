from datetime import datetime
from rest_framework import serializers
from .models import Rent
# from .utils import get_rental_price
from trailblaze.app.users.models import User
from trailblaze.app.slots.models import Slot 
from trailblaze.app.bikes.models import Bike 

class RentSerializer(serializers.ModelSerializer):

    # user = serializers.SerializerMethodField()
    # bike = serializers.SerializerMethodField()
    # collection_slot = serializers.SerializerMethodField()
    # return_slot = serializers.SerializerMethodField()
    # start_date = serializers.DateTimeField(required=False)
    # end_date = serializers.DateTimeField(required=False)
    # amount = serializers.DecimalField(max_digits=10, decimal_places=2,required=False)
    # status = serializers.CharField(required=False)
    # lat = serializers.CharField(required=False)
    # lng = serializers.CharField(required=False)
    
    class Meta:
        model = Rent
        fields = ['id', 'user', 'bike', 'collection_slot','return_slot','start_date', 'end_date', 'amount', 'status', 'lat', 'lng']
        # read_only_fields = [ 'user' ]


    def create(self, validated_data):
        return self
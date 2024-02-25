from rest_framework import serializers
from .models import Notification
from ..users.serializers import UserSerializer
from ..stations.serializers import StationSerializer
from ..rent.serializers import RentSerializer
class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'
        
    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = UserSerializer(instance.user).data
        response['to_user'] = UserSerializer(instance.to_user).data if instance.to_user else None
        response['response'] = NotificationSerializer(instance.response_notification).data if instance.response_notification else None
        response['station'] = StationSerializer(instance.station).data if instance.station else None
        response['rent'] = RentSerializer(instance.rent).data if instance.rent else None
        return response
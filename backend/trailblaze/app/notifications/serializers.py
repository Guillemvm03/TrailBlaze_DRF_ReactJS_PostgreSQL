from rest_framework import serializers
from .models import Notification
from ..users.serializers import UserSerializer

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'
        
    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = UserSerializer(instance.user).data
        response['response'] = NotificationSerializer(instance.response_notification).data if instance.response_notification else None
        return response
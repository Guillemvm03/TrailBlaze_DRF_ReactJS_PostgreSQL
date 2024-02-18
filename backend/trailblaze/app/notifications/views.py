from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Notification
from .serializers import NotificationSerializer

# Create your views here.
class NotificationView(viewsets.ModelViewSet):
    
    def list(self, request, id = None):
        if id:
            notification_one = get_object_or_404(Notification.objects.all(), id=id)
            serializer_one = NotificationSerializer(notification_one)
            return Response(serializer_one.data)
        
        notifications = Notification.objects.filter(type="incident")

        serializer = NotificationSerializer(notifications, many=True)
        return Response(serializer.data)
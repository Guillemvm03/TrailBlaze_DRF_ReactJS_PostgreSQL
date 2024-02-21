from rest_framework.decorators import action
from rest_framework.permissions import (IsAuthenticated, AllowAny, IsAdminUser, IsAuthenticatedOrReadOnly)
from ..core.permissions import IsAdmin
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Notification
from .serializers import NotificationSerializer
from rest_framework import status

# Create your views here.
class NotificationView(viewsets.ModelViewSet):
    
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]
    http_method_names = ['get', 'post', 'put', 'delete']
    
    def get_permissions(self):
        if self.action == 'list_admin':
            return [IsAdmin()]
        elif self.action == 'delete_incident':
            return [IsAuthenticated()]
        return super().get_permissions()    

    def list(self, request, pk=None):
        if pk:
            # notification = get_object_or_404(Notification, pk=pk, user=request.user)
            notification = self.queryset.filter(pk=pk, user=request.user) | self.queryset.filter(pk=pk, to_user=request.user)
            serializer = self.get_serializer(notification)
            return Response(serializer.data)
        
        # notifications = self.queryset.filter(type="incident", user=request.user)
        notifications = self.queryset.filter(type="incident", user=request.user) | self.queryset.filter(type="incident", to_user=request.user)
        serializer = self.get_serializer(notifications, many=True)
        return Response(serializer.data)
    
    def create(self, request, *args, **kwargs):
        context=request.data
        context['user'] = request.user.id
        context['created_by'] = request.user.role == "Admin" and "admin" or "client"
        serializer = self.get_serializer(data=context)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
    def destroy(self, request, pk, *args, **kwargs):
        try:
            isAdmin = request.user.role == "Admin"
            if isAdmin:
                notification = self.queryset.get(pk=pk)
            else:
                notification = self.queryset.filter(pk=pk, user=request.user) | self.queryset.filter(pk=pk, to_user=request.user)                
                if notification.exists():
                    notification = notification.first()
            
            if notification is None:
                return Response({"error": "Error not found."}, status=status.HTTP_404_NOT_FOUND)
                
            if notification.type != "incident":
                return Response({"error": "Error not incident."}, status=status.HTTP_400_BAD_REQUEST)
            
            response_notification = notification.response_notification
            
            if response_notification:
                response_notification.delete()
                
            notification.delete()
            
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Notification.DoesNotExist:
            return Response({"error": "Error not found."}, status=status.HTTP_404_NOT_FOUND)
    
    @action(detail=False, methods=['get'])
    def list_admin(self, request, pk=None):
        if pk:
            notification = get_object_or_404(Notification, pk=pk)
            serializer = self.get_serializer(notification)
            return Response(serializer.data)
        
        notifications = self.queryset.filter(type="incident")
        serializer = self.get_serializer(notifications, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['post'])
    def create_response(self, request, pk, *args, **kwargs):
        parent_notification = get_object_or_404(Notification, pk=pk)
        
        if parent_notification is None:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        if parent_notification.type != "incident":
            return Response({"error": "Invalid notification type"}, status=status.HTTP_400_BAD_REQUEST)
        
        if parent_notification.response_notification:
            return Response({"error": "Response already exists"}, status=status.HTTP_400_BAD_REQUEST)
        
        context = request.data
        context['user'] = request.user.id
        context['to_user'] = parent_notification.user.id
        context['type'] = "response"
        context['created_by'] = request.user.role == "Admin" and "admin" or "client"
        
        serializer = self.get_serializer(data=context)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        parent_notification.response_notification = serializer.instance
        parent_notification.is_read = True
        parent_notification.save()
        
        return Response(self.get_serializer(parent_notification).data, status=status.HTTP_201_CREATED)
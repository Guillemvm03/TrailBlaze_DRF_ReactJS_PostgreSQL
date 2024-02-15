from rest_framework import permissions
from trailblaze.app.users.models import User
from django.contrib.auth.models import AnonymousUser

class IsAdmin(permissions.BasePermission):
     
    message = 'You must be an admin to perform this action.'
    def has_permission(self, request, view):
        if type(request.user) is AnonymousUser:
            return False
        
        return request.user and request.user.role == 'Admin'

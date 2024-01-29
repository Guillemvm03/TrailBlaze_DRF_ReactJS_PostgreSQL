from rest_framework import permissions
from trailblaze.app.users.models import User

class IsAdmin(permissions.BasePermission):
    message = "You aren't an admi"
    def has_permission(self, request, view):
        try:
            user = User.objects.get(username=request.user)
            return user.type == 'Admin'
        except:
            return False

from rest_framework import permissions

class IsAdmin(permissions.BasePermission):
    message = "You aren't an admin"
    def has_permission(self, request, view):
        try:
            return request.user.role == 'Admin'
        except:
            return False
        
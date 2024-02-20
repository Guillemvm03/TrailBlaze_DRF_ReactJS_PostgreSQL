from django.db import models
from ..users.models import User
from ..rent.models import Rent
from ..stations.models import Station

# Create your models here.
class Notification(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=200)
    is_read = models.BooleanField(default=False)
    
    created_by = models.CharField(max_length=15, choices=[('admin', 'Admin'), ('client', 'Client')], default="admin")
    
    type = models.CharField(max_length=10, choices=[('incident', 'Incident'), ('response', 'Response')], default="incident")
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, related_name="notifications")
    to_user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    
    rent = models.ForeignKey(Rent, on_delete=models.CASCADE, null=True, related_name="notifications")
    station = models.ForeignKey(Station, on_delete=models.CASCADE, null=True, related_name="notifications")
    
    response_notification = models.OneToOneField('self', on_delete=models.CASCADE, null=True, blank=True, related_name='response')

    def __str__(self):
        return str(self.id)
from django.db import models
from ..stations.models import Station
from ..bikes.models import Bike

# Create your models here.
class Slot(models.Model):
    
    station = models.ForeignKey(
        Station, on_delete=models.CASCADE, null=False, related_name="slots")
    bike = models.OneToOneField(
        Bike, on_delete=models.CASCADE, null=True, unique=True, related_name="slots")
    status = models.CharField(max_length=200)
    
    def __str__(self):
        return str(self.id)
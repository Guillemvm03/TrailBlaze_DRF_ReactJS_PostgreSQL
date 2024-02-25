from django.db import models
from trailblaze.app.users.models import User
from trailblaze.app.slots.models import Slot
from trailblaze.app.bikes.models import Bike

class Rent(models.Model):
    
    # rent_id = models.CharField('rent_id', max_length=36, unique=True, editable=False, null=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user')   
    bike = models.ForeignKey(Bike, on_delete=models.CASCADE, related_name='bike')   
    collection_slot = models.ForeignKey(Slot, on_delete=models.CASCADE, related_name='collection_slot')
    return_slot = models.ForeignKey(Slot, on_delete=models.CASCADE, related_name='return_slot', null=True)  
    start_date = models.DateTimeField(auto_now_add=True)
    end_date = models.DateTimeField(default=None, null=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    status = models.CharField(max_length=50)
    lat = models.CharField(max_length=150)
    lng = models.CharField(max_length=150)

    def __str__(self):
        return str(self.id)
    
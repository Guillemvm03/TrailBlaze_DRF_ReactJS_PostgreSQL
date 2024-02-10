from django.db import models
from ..users.models import User
from django.utils.timezone import now

# Create your models here.

class Payout(models.Model):
    id_payment = models.CharField('pi', max_length=36, unique=True, editable=False, null=False, primary_key=True)
    id_user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateTimeField(default=now)

    def __str__(self):
        return str(self.id_payment)
    
    class Meta:
        db_table = 'Payout'
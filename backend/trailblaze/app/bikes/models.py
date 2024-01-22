from django.db import models

# Create your models here.

class Bike(models.Model):
    bike_type = models.CharField(max_length=50)
    slug = models.SlugField(max_length=150, unique=True, editable=False)
    gps = models.CharField(max_length=150)



    def __str__(self):
        return str(self.id)
    
    class Meta:
        db_table = 'Bike'
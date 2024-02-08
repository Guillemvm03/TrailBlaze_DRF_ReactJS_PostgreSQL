from django.db import models

# Create your models here.

class Station(models.Model):
    station_name = models.CharField(max_length=50)
    slug = models.SlugField(max_length=150, unique=True, editable=False)
    description = models.CharField(max_length=100)
    address = models.CharField(max_length=100)  
    lat = models.CharField(max_length=150)
    lng = models.CharField(max_length=150)
    capacity = models.IntegerField()
    image = models.CharField(max_length=150)
    status = models.CharField(max_length=100)


    def __str__(self):
        return str(self.id)
    
    class Meta:
        db_table = 'Station'
    

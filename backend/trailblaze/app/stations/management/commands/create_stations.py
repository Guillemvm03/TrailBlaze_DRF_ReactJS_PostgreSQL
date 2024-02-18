from django.core.management.base import BaseCommand
from trailblaze.app.stations.models import Station
from trailblaze.app.bikes.models import Bike
import random

class Command(BaseCommand):
    help = 'Create dummy stations'

    def handle(self, *args, **options):
        
        stations = [
            {'name': 'Hospital General', 'address': 'Avinguda de Francisco Cerdà, 3, 46870 Ontinyent, Valencia', 'description': 'Hospital general', 'latitude': 38.82018059977002, 'longitude': -0.6029612830128839},
            {'name': 'Estación de Servicio Repsol', 'address': 'Carrer del Dos de Maig, 207, D, 46870 Ontinyent, Valencia', 'description': 'Description 2', 'latitude': 38.81828554278073, 'longitude': -0.6043501152928811},
            {'name': 'IES La Estación', 'address': 'Ctra. ESTACIÓ, S/N, 46870 Ontinyent, Valencia', 'description': 'Description 3', 'latitude': 38.810286665108876, 'longitude': -0.6035119775403537},
            {'name': 'Polideportivo Municipal', 'address': 'Carrer Vicent Lluís Montés Penadés, S/N, 46870 Ontinyent, Valencia', 'description': 'Description 4', 'latitude': 38.81074626514784, 'longitude': -0.6106678917566789},
            {'name': 'Pou Clar', 'address': 'CV-81, 46870 Ontinyent, Valencia', 'description': 'Description 5', 'latitude': 38.798755071798176, 'longitude': -0.6120636405835954},
            {'name': 'El Teler', 'address': 'Carrer del Pintor Josep Segrelles, 1, 46870 Ontinyent, Valencia', 'description': 'Description 6', 'latitude': 38.82454003132385, 'longitude': -0.6027581054078655},
            {'name': 'IES Pou Clar', 'address': 'Av. Vicente Gironés, 16, 46870 Ontinyent, Valencia', 'description': 'Description 7', 'latitude': 38.826637773970454, 'longitude': -0.6141585414265855},
            {'name': 'IES Jaume I', 'address': 'Av. de, Av. dAlbaida, 23, 46870 Ontinyent, Valencia', 'description': 'Description 8', 'latitude': 38.82177246263011, 'longitude': -0.5969750108857443},
            {'name': 'Family Cash', 'address': 'Av. del Textil, 56, 46870 Ontinyent, Valencia', 'description': 'Description 9', 'latitude': 38.82741089220847, 'longitude': -0.5832476612271636}
        ]
        
        bikes_types = ['mountain', 'road', 'electric', 'city', 'trial', 'bmx', 'folding', 'tandem', 'cruiser', 'hybrid', 'cyclocross', 'recumbent', 'tricycle', 'unicycle']
        
        for station in stations:
            station_name = station['name']
            station_address = station['address']
            station_description = station['description']
            station_latitude = station['latitude']
            station_longitude = station['longitude']
            station_capacity = 0
            station_image = 'https://picsum.photos/200/300'
            station_status = 'Active'
            station_ = Station.objects.create(station_name=station_name, address=station_address, description=station_description, lat=station_latitude, lng=station_longitude, capacity=station_capacity, image=station_image, status=station_status)
            for slot in range(5):
                bike_ = Bike.objects.create(bike_type=random.choice(bikes_types), gps=f'{station_latitude},{station_longitude}')
                station_.slots.create(bike=bike_, status='Active')
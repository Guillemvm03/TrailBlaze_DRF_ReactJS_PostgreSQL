from django.core.management.base import BaseCommand
from trailblaze.app.users.models import User

from django.apps import apps

def empty_tables():
    modelos = apps.get_models()

    for modelo in modelos:
        modelo.objects.all().delete()
        
class Command(BaseCommand):
    help = 'Create dummy users'
    empty_tables()
    def handle(self, *args, **options):
        
        for i in ['guillem', 'kevin', 'admin']:
            admin_username = f'{i}'
            admin_email = f'{i}@gmail.com'
            admin_phone = '123456789'
            admin_password = '1234'
            User.objects.create_superuser(username=admin_username, email=admin_email, password=admin_password, phone=admin_phone)
        
        for i in ['miguel', 'david', 'johan']:
            username = f'{i}'
            email = f'{i}@gmail.com'
            phone = f'123456789'
            password = '1234'
            User.objects.create_user(username=username, email=email, password=password, phone=phone)

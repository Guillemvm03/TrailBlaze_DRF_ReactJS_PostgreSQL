from django.apps import AppConfig


class RentConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'trailblaze.app.rent'

    # def ready(self):
    #     import trailblaze.app.rent.signals
from django.apps import AppConfig


class BikesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'trailblaze.app.bikes'
    

    def ready(self):
        import trailblaze.app.bikes.signals
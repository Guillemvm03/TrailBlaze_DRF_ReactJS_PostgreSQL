from django.apps import AppConfig


class StationsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'trailblaze.app.stations'


    def ready(self):
        import trailblaze.app.stations.signals

    
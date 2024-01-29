from django.apps import AppConfig


class UsersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'trailblaze.app.users'


    def ready(self):
        import trailblaze.app.users.signals
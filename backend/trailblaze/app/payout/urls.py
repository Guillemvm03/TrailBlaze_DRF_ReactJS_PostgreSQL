from django.urls import path
from .views import Charge

urlpatterns = [
    path('charge', Charge, name='Charge'),
]

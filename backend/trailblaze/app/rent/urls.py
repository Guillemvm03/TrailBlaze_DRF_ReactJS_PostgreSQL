from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import RentView
rent_router = DefaultRouter()

rent_router.register('rent', RentView, basename='rent')

url_patterns = [
    path('', include(rent_router.urls))
]
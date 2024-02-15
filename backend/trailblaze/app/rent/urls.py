from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import start_rent

from .views import RentView

rent_router = DefaultRouter(trailing_slash=False)

rent_router.register('rent', RentView, basename='rent')

urlpatterns = [
    path('', include(rent_router.urls)),
    path('start_rent/', start_rent, name='Start-rental'),

    # path('start_rent/', RentView.as_view({'post': 'start_rent'}), name='start_rent'),

]
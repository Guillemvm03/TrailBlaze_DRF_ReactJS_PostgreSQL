from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import start_rent, end_rent

from .views import RentView

rent_router = DefaultRouter()

rent_router.register('rent', RentView, basename='rent')

urlpatterns = [
    path('', include(rent_router.urls)),
    path('start_rent/', start_rent, name='Start-rental'),
    path('end_rent/<int:rent_id>/', end_rent, name='End-rental'),
    path('user_rent/', RentView.as_view({'get':'user_rent'})),
    path('rental_history/', RentView.as_view({'get':'rental_history'})),

    # path('start_rent/', RentView.as_view({'post': 'start_rent'}), name='start_rent'),

]
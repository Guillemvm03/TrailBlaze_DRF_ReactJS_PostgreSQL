from django.urls import path
from .views import SlotView

urlpatterns = [
    path('station/<str:station_slug>/slot', SlotView.as_view({'get': 'get'})),
    path('station/<str:station_slug>/slot/<int:slot_id>', SlotView.as_view({'get': 'get'})),
    path('station/<str:station_slug>/slot', SlotView.as_view({'post': 'post'})),
    path('station/<str:station_slug>/slot/<int:slot_id>', SlotView.as_view({'delete': 'delete'})),
    path('station/<str:station_slug>/slot/<int:slot_id>', SlotView.as_view({'put': 'put'})),
    path('slot/all', SlotView.as_view({'get': 'get_all'})),  
]
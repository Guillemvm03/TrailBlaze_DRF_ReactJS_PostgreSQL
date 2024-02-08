from django.urls import path
from .views import BikeView

urlpatterns = [
    path('bike', BikeView.as_view({'get': 'get'})),
    path('bike/<str:slug>/', BikeView.as_view({'get': 'get'})),
    path('bike', BikeView.as_view({'post': 'post'})),
    path('bike/<str:slug>', BikeView.as_view({'delete': 'delete'})),
    path('bike/<str:slug>', BikeView.as_view({'put': 'put'})),
]

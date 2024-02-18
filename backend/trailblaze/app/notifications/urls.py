from django.urls import path
from .views import NotificationView

urlpatterns = [
    path('notification/', NotificationView.as_view({'get': 'list'})),
    path('notification/<int:id>/', NotificationView.as_view({'get': 'list'})),
    # path('notification/', NotificationView.as_view({'post': 'create'})),
    # path('notification/<slug:slug>/', NotificationView.as_view({'delete': 'destroy'})),
    # path('notification/<slug:slug>/', NotificationView.as_view({'put': 'update'})),
]
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import NotificationView

notification_router = DefaultRouter()

notification_router.register('notification', NotificationView, basename='notification')

urlpatterns = [
    
    path('admin/notification/', NotificationView.as_view({'get': 'list_admin'})),
    path('admin/notification/<int:pk>/', NotificationView.as_view({'get': 'list_admin'})),
    path('notification/<int:pk>/response', NotificationView.as_view({'post': 'create_response'})),
    path('', include(notification_router.urls)),

]

# urlpatterns = [
#     path('notification/', NotificationView.as_view({'get': 'list'})),
#     path('notification/<int:id>/', NotificationView.as_view({'get': 'list'})),
#     # path('notification/', NotificationView.as_view({'post': 'create'})),
#     # path('notification/<slug:slug>/', NotificationView.as_view({'delete': 'destroy'})),
#     # path('notification/<slug:slug>/', NotificationView.as_view({'put': 'update'})),
# ]

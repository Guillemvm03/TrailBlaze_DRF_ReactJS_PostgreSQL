"""
URL configuration for trailblaze project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path("__debug__/", include("debug_toolbar.urls")),
    path('api/', include('trailblaze.app.stations.urls')),
    path('api/', include('trailblaze.app.bikes.urls')),
    path('api/', include('trailblaze.app.slots.urls')),
    path('api/', include('trailblaze.app.users.urls')),
    path('api/', include('trailblaze.app.payout.urls')),
    path('api/', include('trailblaze.app.rent.urls')),
    path('api/', include('trailblaze.app.notifications.urls')),
]

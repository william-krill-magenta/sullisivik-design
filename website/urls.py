from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^grid$', views.gridindex),
    url(r'^copypaste$', views.copypaste)
]


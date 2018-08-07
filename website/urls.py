from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^grid$', views.gridindex),
    url(r'^copypaste$', views.copypaste),
]


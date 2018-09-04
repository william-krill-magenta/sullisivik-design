from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^grid$', views.gridindex),
    url(r'^demo1$', views.demo1),
    url(r'^demo2$', views.demo2),
    url(r'^demo3$', views.demo3),
    url(r'^copypaste$', views.copypaste)
]


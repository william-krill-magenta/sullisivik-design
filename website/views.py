from django.shortcuts import render
from django.http import HttpResponse


def index(request):
    return render(request, 'website/testsite.html')

def gridindex(request):
    return render(request, 'website/gridsite.html')

def copypaste(request):
    return render(request, 'website/copypaste.html')
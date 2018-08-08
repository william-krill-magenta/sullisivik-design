from django.shortcuts import render
from django.http import HttpResponse

def gridindex(request):
    return render(request, 'website/gridsite.html')

def copypaste(request):
    return render(request, 'website/copypaste.html')

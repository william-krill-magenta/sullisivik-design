from django.shortcuts import render
from django.http import HttpResponse

def gridindex(request):
    return render(request, 'website/gridsite.html')

def copypaste(request):
    return render(request, 'website/copypaste.html')

def demo1(request):
    return render(request, 'website/demo1.html')

def demo2(request):
    return render(request, 'website/demo2.html')

def demo3(request):
    return render(request, 'website/demo3.html')

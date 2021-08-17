from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product
from .serializers import ProductSerializer
# Create your views here.

@api_view(['Get'])
def getRoutes(request):

    routes = [
        '/api/products',
        '/api/products/<id>'
    ]

    return Response(routes)


@api_view(['Get'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products,many=True) 
    return Response(serializer.data)


@api_view(['Get'])
def getProduct(request,pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product,many=False)
    return Response(serializer.data)



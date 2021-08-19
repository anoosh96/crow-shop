from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product
from .serializers import ProductSerializer,MyTokenObtainPairSerializer,UserSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
# Create your views here.


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

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



@api_view(['Get'])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user,many=False)
    return Response(serializer.data)



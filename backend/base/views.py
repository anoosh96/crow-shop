from django.contrib.auth.models import User
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import permissions,status
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework.response import Response
from .models import Product
from .serializers import ProductSerializer,MyTokenObtainPairSerializer,UserSerializer, UserSerializerWithToken
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
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user,many=False)
    return Response(serializer.data)


@api_view(['Get'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users,many=True)
    return Response(serializer.data)


@api_view(['Post'])
def registerUser(request):
    user = request.data
    serializer = UserSerializer(data=user)
    
    try:
        if serializer.is_valid():
            savedUser = serializer.save()
            return Response(UserSerializerWithToken(savedUser).data)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    except:
        return Response({'detail':'Email Taken'},status=status.HTTP_400_BAD_REQUEST)
    
   




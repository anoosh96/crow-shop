from ..models import Order
from django.contrib.auth.models import User
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view,permission_classes
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework.response import Response
from ..serializers import MyTokenObtainPairSerializer, OrderSerializer,UserSerializer, UserSerializerWithToken,UserUpdateSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
# Create your views here.


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['Get'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user,many=False)
    return Response(serializer.data)


@api_view(['Get'])
# @permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users,many=True)
    return Response(serializer.data)


@api_view(['Post'])
def registerUser(request):
    user = request.data
    serializer = UserSerializer(data=user)
    
    # try:
    if serializer.is_valid():
        savedUser = serializer.save()
        return Response(UserSerializerWithToken(savedUser).data)
    else:
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    # except:
    #     return Response({'detail':'Email Taken'},status=status.HTTP_400_BAD_REQUEST)


@api_view(['Put'])
@permission_classes([IsAuthenticated])
def updateUser(request):
    user = request.user
    serializer = UserUpdateSerializer(user,data=request.data)
    
    # try:
    if serializer.is_valid():
        savedUser = serializer.save()
        return Response(UserSerializerWithToken(savedUser).data)
    else:
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    # except:
    #     return Response({'detail':'Email Taken'},status=status.HTTP_400_BAD_REQUEST) 
    
   


class MyOrders(ListAPIView):
    serializer_class = OrderSerializer
    # permission_classes=[IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user_id=self.kwargs['pk'])


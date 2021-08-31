from datetime import datetime
from functools import partial
from django.contrib.auth.models import User
from django.http import request
from rest_framework import serializers, status
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView, UpdateAPIView
from stripe.api_resources import source
from ..models import Order,OrderItem, Product,ShippingAddress
from ..serializers import OrderDetailSerializer, OrderItemSerializer, OrderSerializer, ShippingSerializer
import stripe

stripe.api_key = 'sk_test_51JUB2PGQ1KpthHMidxD5RMqmIgTbiOXyBWGgh5HEXLZL0PW6I0lQzG3wOLth46up6TMPSJSYicAtOnkszdsPPczF00dzjObQeM'
# Create your views here.




class OrderItemsListCreate(APIView):

    permission_classes = [IsAuthenticated]

    def post(self,request):

        #user = request.user
        data = request.data
        
        orderItems = data["orderItems"]

        if (not orderItems) or (len(orderItems) == 0):
            return Response({'detail':'No Order Items'},status=status.HTTP_400_BAD_REQUEST)

        # (1) Create Order
        # (2) Create Shipping Address
        # (3) Create Order Items

        else:
            order = Order(
                user=request.user,
                paymentMethod=data['paymentMethod'],
                taxPrice=data['taxPrice'],
                shippingPrice=data['shippingPrice'],
                totalPrice=data['totalPrice']
            )

            serializer = OrderSerializer(data=OrderSerializer(order,many=False).data)
            if(serializer.is_valid()):
                savedOrder = serializer.save()

                # create shipping 

                data["shippingAddress"]["order"] = savedOrder._id
                shippingSerializer = ShippingSerializer(data=data["shippingAddress"])
                if(shippingSerializer.is_valid()):
                    shippingSerializer.save()

                    
                    # add order items 

                    for item in data["orderItems"]:
                        product = Product.objects.get(_id=item["product"])
                        #item["product"] = product 
                        item["order"] = savedOrder._id
                        
                        orderItemSerializer = OrderItemSerializer(data=item)

                        if(orderItemSerializer.is_valid()):
                            orderItemSerializer.save()
                            product.countInStock -= 1
                            product.save()


                            orderData = OrderSerializer(savedOrder,many=False)     
                            return Response(orderData.data,status=status.HTTP_200_OK)
                        else:

                            return Response(orderItemSerializer.errors,status=status.HTTP_400_BAD_REQUEST)

                else:
                    return Response(shippingSerializer.errors,status=status.HTTP_400_BAD_REQUEST)

            else:
                return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

    
    def get(self,request):
         return Response(OrderSerializer(Order.objects.all(),many=True).data)



class OrderItemsRetreive(RetrieveAPIView):

    serializer_class = OrderDetailSerializer
    lookup_field = '_id'
    lookup_url_kwarg= 'pk'
    def get_queryset(self):
        return Order.objects.all()




class ChargeOrder(APIView):
   
    # permission_classes=[IsAuthenticated]

    def post(self,req,*args,**kwargs):

        if(not req.data['token']):
            return Response({'detail':'no token provided'},status=status.HTTP_400_BAD_REQUEST)
        customer = stripe.Customer.create(
            email= req.user.email,
            name= req.user.first_name,
            source=str(req.data['token'])
        )

        stripe.Charge.create(
            customer=customer,
            amount=(int(req.data["amount"])*100),
            currency='usd',
            description='purchase'
        )

        serializer = OrderSerializer(Order.objects.get(_id=kwargs['pk']),data={'isPaid':True,'paidAt':datetime.now()},partial=True)

        if(serializer.is_valid()):
            serializer.save()

        return Response({'detail':'Payment Successfull'},status=status.HTTP_200_OK)




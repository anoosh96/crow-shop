from datetime import datetime
from django.contrib.auth.models import User
from rest_framework import serializers, status
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import RetrieveAPIView, UpdateAPIView
from ..models import Order,OrderItem, Product,ShippingAddress
from ..serializers import OrderItemSerializer, OrderSerializer, ShippingSerializer
# Create your views here.




class OrderItemsListCreate(APIView):


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
                user=User.objects.first(),
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

    serializer_class = OrderSerializer
    lookup_field = '_id'
    lookup_url_kwarg= 'pk'
    def get_queryset(self):
        return Order.objects.all()



class UpdateOrderPayment(UpdateAPIView):

    serializer_class = OrderSerializer
    lookup_field = '_id'
    lookup_url_kwarg= 'pk'


    def get_queryset(self):
        return Order.objects.all()
    
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        request.data["isPaid"] = True
        request.data["paidAt"] = datetime.now()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}


        return Response({'detail':'order payment updated'})
        






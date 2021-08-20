from rest_framework import status
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework.response import Response
from ..models import Product
from ..serializers import ProductSerializer
# Create your views here.



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


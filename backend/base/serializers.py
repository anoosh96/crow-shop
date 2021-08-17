from django.db import models
from rest_framework import fields, serializers
from .models import Product,Review


class ProductReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    #review_set = ProductReviewSerializer(many=True)
    numReviews = serializers.ReadOnlyField()
    class Meta:
        model = Product
        fields = '__all__'

from rest_framework import fields, serializers
from .models import Product,Review
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.contrib.auth import password_validation

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data 

        for k,v in serializer.items():
            data[k] = v
        
        return data 


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    _id = serializers.SerializerMethodField()
    isAdmin = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True,required=True,validators=[password_validation.validate_password])
    password2 = serializers.CharField(write_only=True,required=True,validators=[password_validation.validate_password])

    class Meta:
        model = User
        fields = ['_id','username','email','name','isAdmin','password','password2','first_name']
        read_only_fields = ['name','_id','isAdmin']
        write_only_fields = ['first_name']

    def get_name(self,obj):
        name = obj.first_name
        if name=='':
            name = obj.email
        return name

    def get__id(self,obj):
        return obj.id

    def get_isAdmin(self,obj):
        return obj.is_staff

    def create(self, validated_data):
        
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['username'],
            first_name=validated_data['first_name'],
        )

        user.set_password(validated_data['password'])
        user.save()

        return user

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id','username','email','name','isAdmin','token']

    def get_token(self,obj):
        token = RefreshToken.for_user(obj)
        return str(token)




class ProductReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    #review_set = ProductReviewSerializer(many=True)
    numReviews = serializers.ReadOnlyField()
    rating = serializers.ReadOnlyField()
    class Meta:
        model = Product
        fields = '__all__'

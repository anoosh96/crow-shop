from django.urls import path
from . import views 

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path('',views.getRoutes,name="routes"),
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('products/',views.getProducts,name="products"),
    path('products/<int:pk>',views.getProduct,name="productDetail"),
    path('users/profile/',views.getUserProfile,name="userProfile"),
    path('users/',views.getUsers,name="userList"),
    path('users/register',views.registerUser, name="registerUser")


]
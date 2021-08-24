from django.urls import path
from ..views import user_views as views 

from rest_framework_simplejwt.views import (
    TokenRefreshView
)


urlpatterns = [
    
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/',views.getUserProfile,name="userProfile"),
    path('',views.getUsers,name="userList"),
    path('register/',views.registerUser, name="registerUser"),
    path('profile/update',views.updateUser, name="user-profile-update")



]
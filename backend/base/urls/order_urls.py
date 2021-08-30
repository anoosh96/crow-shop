from django.urls import path
from ..views import order_views as views 


urlpatterns = [
    path('',views.OrderItemsListCreate.as_view(),name="createListOrder"),
    path('<int:pk>/',views.OrderItemsRetreive.as_view(), name="getOrder"),
    path('<int:pk>/charge/',views.ChargeOrder.as_view(), name="chargeOrder"),

]

from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    path('register/',RegistrationAPI.as_view(),name='registration-and-cart-creation'),
    path('login/',LoginAPI.as_view(),name='login-user'),
    path('logout/',Logout,name='logging-out'),
    path('products/',ProductAPI.as_view(),name='Extracting-all-products'),
    path('addtocart/',AddToCartAPI.as_view(),name='adding-to-cart'),
    path('getcartproducts/',AddToCartAPI.getMyCart,name='getting-products-of-cart'),
    path('getproduct/<str:id>/',getProduct,name='getting-particular-product'),

    path('products/search/', ProductSearchView.as_view(), name='product-search'),

    path('reducequantity/<str:id>/',reduceQuantity,name='Reduce-quantity-by-1'),
    path('increasequantity/<str:id>/',increaseQuantity,name='Increase-quantity-by-1')

]

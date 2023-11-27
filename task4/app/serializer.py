from rest_framework import serializers
from rest_framework import response
from .models import *
import shutil

class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.CharField()
    password = serializers.CharField()

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class CopyOfProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = CopyOfProduct
        fields = '__all__'
        depth = 1
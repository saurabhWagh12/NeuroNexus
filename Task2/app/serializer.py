from rest_framework import serializers
from rest_framework import response
from .models import *
import shutil

class JobAppilicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobPOST
        fields = '__all__'
        depth = 1

class ApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = '__all__'
        depth = 1 

class USERSerializer(serializers.ModelSerializer):
    class Meta:
        model = USER
        fields = ['isEmployer']

class JobPOSTSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobPOST
        fields = '__all__'

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField()
    isEmployer = serializers.BooleanField()
    phone = serializers.CharField()
    firstname = serializers.CharField()
    lastname = serializers.CharField()

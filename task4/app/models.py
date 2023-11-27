from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Cart(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE,null=False,blank=False)
    def __str__(self):
        return self.user.username
    

class Product(models.Model):
    name = models.CharField(max_length=500,null=False,blank=False)
    description=models.TextField()
    price = models.BigIntegerField(null=False,blank=False)
    image = models.ImageField()
    date = models.DateField(auto_now_add=True)
    def __str__(self):
        return self.name


class CopyOfProduct(models.Model):
    productId = models.IntegerField()
    name = models.CharField(max_length=500,null=False,blank=False)
    image = models.ImageField()
    price = models.BigIntegerField(null=False,blank=False)
    quantity = models.IntegerField()
    belongTo = models.ForeignKey(Cart,null=False,blank=False,on_delete=models.CASCADE)


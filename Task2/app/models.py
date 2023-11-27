from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class USER(models.Model):
    user = models.OneToOneField(User,null=False,blank=False,on_delete=models.CASCADE)
    isEmployer = models.BooleanField(default=False)
    phone = models.CharField(max_length=10,blank=True,null=True)

    def __str__(self):
        return self.user.username

class JobPOST(models.Model):
    belongTo = models.ForeignKey(USER,null=False,blank=False,on_delete=models.CASCADE)
    description = models.TextField()
    position = models.CharField(max_length=500)
    experience = models.IntegerField()
    date = models.DateField(auto_now_add=True)
    def __str__(self):
        return self.belongTo.user.username+" Posted"

class Application(models.Model):
    user = models.ForeignKey(USER,null=False,blank=False,on_delete=models.CASCADE)
    onPOST = models.ForeignKey(JobPOST,null=False,blank=False,on_delete=models.CASCADE) 
    date = models.DateField(auto_now_add=True)
    resume = models.FileField()
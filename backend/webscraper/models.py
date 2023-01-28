from django.db import models

# Create your models here.
class Department(models.Model):
    name = models.CharField(max_length=100)
    link = models.URLField(max_length=200)

class Item(models.Model):
    dept = models.ForeignKey(Department, on_delete=models.CASCADE)
    link = models.URLField(max_length = 200)
    name = models.CharField(max_length = 200)
    img =  models.CharField(max_length = 200)
    price= models.CharField(max_length = 50)

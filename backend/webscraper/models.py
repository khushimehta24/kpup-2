from django.db import models

# Create your models here.
class Department(models.Model):
    name = models.CharField(max_length=100)
    link = models.URLField(max_length=200)

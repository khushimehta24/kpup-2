from django.utils import timezone
from django.db import models
from accounts.models import User
from webscraper.models import Department

# Create your models here.
    
class StorageItem(models.Model):
    name = models.CharField(max_length=200)
    img = models.URLField(max_length=200, blank=True, default='')
    desc = models.TextField(null=True, blank=True)
    added_date = models.DateField(default=timezone.now)
    expiry_date = models.DateField(null=True, blank=True)
    category = models.ForeignKey(Department, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    threshold = models.CharField(max_length=50, default="0")
    restock = models.BooleanField(default=False)

class CostCount(models.Model):
    item = models.ForeignKey(StorageItem, on_delete=models.CASCADE)
    cost_price = models.CharField(max_length=200)
    selling = models.CharField(max_length=200, blank=True, default='')
    count = models.IntegerField(default=0)
    sold_count = models.IntegerField(default=0)
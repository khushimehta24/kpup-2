from django.db import models

# Create your models here.
class Note(models.Model):
    id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=50)
    desc = models.CharField(max_length=100)
    is_restock = models.BooleanField(default=False)
    is_dispatch = models.BooleanField(default=False)
    is_done = models.BooleanField(default=False)

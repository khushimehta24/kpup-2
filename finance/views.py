from django.shortcuts import render
from rest_framework.generics import GenericAPIView, ListAPIView
from rest_framework import status, permissions
from .serializers import *
from django.http.response import JsonResponse
from backend.warehouse.models import *
from backend.webscraper.models import *

# Create your views here.
class TopStatsAPI(GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = TopStatsSerializer

    def get(self, request):
        storage_items = StorageItem.objects.filter(user = self.request.user)
        categories = Department.objects.all()
        total_sale = {}
        total_spending = {}
        profit = {}
        for category in categories:
            sale,spending, profit = 0,0,0
            storage_items.filter(dept = category)
            for item in storage_items:
                costcounts = CostCount.objects.filter(item = item)
                for cc in costcounts:
                    sale += cc.sold_count*int(cc.selling)
                    spending += (cc.sold_count+cc.count)*int(cc.cost_price)
            total_sale[category.name] = sale
            total_spending[category.name] = spending
            profit[category.name] = profit





from django.shortcuts import render
from rest_framework.generics import GenericAPIView, ListAPIView
from rest_framework import status, permissions
from .serializers import *
from django.http.response import JsonResponse
from warehouse.models import *
from webscraper.models import *

# Create your views here.
class GraphAPI(GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        storage_items = StorageItem.objects.filter(user = self.request.user)
        categories = Department.objects.all()
        total_sale = {"name":"sale"}
        total_spending = {"name":"spending"}
        profit = {"name":"profit"}
        for category in categories:
            data1, data2, data3 = [], [], []
            sale,spending, profit = 0,0,0
            storage_items.filter(dept = category)
            for item in storage_items:
                costcounts = CostCount.objects.filter(item = item)
                for cc in costcounts:
                    sale += cc.sold_count*int(cc.selling)
                    spending += (cc.sold_count+cc.count)*int(cc.cost_price)
            data1.append(sale)
            data2.append(spending)
            data3.append(profit)
        total_sale['data'] = data1
        total_spending['data'] = data2
        profit['data'] = data3
        return JsonResponse({[total_sale, total_spending, profit]}, status= status.HTTP_200_OK)





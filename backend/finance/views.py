import json
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
    serializer_class = GraphSerializer

    def get(self, request):
        storage_items = StorageItem.objects.filter(user = self.request.user)
        categories = Department.objects.all()
        total_sale = {"name":"sale"}
        total_spending = {"name":"spending"}
        total_profit = {"name":"profit"}
        for category in categories:
            data1, data2, data3 = [], [], []
            sale,spending= 0,0
            storage_items.filter(category = category)
            for item in storage_items:
                costcounts = CostCount.objects.filter(item = item)
                for cc in costcounts:
                    if cc.selling == '':
                        cc.selling = '0'
                    sale += cc.sold_count*int(cc.selling)
                    if cc.cost_price== '':
                        cc.cost_price = '0'
                    spending += (cc.sold_count+cc.count)*int(cc.cost_price)
            data1.append({"value":sale})
            data2.append({"value":spending})
            profit = sale-spending
            data3.append({"value":profit})
        total_sale['data'] = data1
        total_spending['data'] = data2
        total_profit['data'] = data3
        response = {"response":[total_sale, total_spending, total_profit]}
        return JsonResponse(data = response, status= status.HTTP_200_OK)






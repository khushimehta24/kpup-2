import json
from django.shortcuts import render
from rest_framework.generics import GenericAPIView, ListAPIView
from rest_framework import status, permissions
from .serializers import *
from django.http.response import JsonResponse
from warehouse.models import *
from webscraper.models import *

# Create your views here.
class GetSetGoAPI(GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = GetSetGoSerializer

    def get(self, request):
        storage_items = StorageItem.objects.filter(user = self.request.user)
        categories = Department.objects.all()
        data1, data2= [], []
        for category in categories:
            sale,spending, sold_count= 0,0,0
            storage_items.filter(category = category)
            for item in storage_items:
                costcounts = CostCount.objects.filter(item = item)
                for cc in costcounts:
                    if cc.selling == '':
                        cc.selling = '0'
                    sale += cc.sold_count*int(cc.selling)
                    if cc.cost_price== '':
                        cc.cost_price = '0'
                    sold_count += cc.sold_count
                    spending += (cc.sold_count+cc.count)*int(cc.cost_price)
            profit = sale-spending
            data1.append(profit)
            data2.append(sold_count)

        total_profit = sum(data1)
        total_sold_count = sum(sold_count)

        score = total_profit/total_sold_count

        response = {"score":score}
        return JsonResponse(data = response, status= status.HTTP_200_OK)






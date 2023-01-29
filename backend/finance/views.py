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
            sale, sold_count= 0,0
            storage_items.filter(category = category)
            for item in storage_items:
                costcounts = CostCount.objects.filter(item = item)
                for cc in costcounts:
                    if cc.selling == '':
                        cc.selling = '0'
                    sale += cc.sold_count*int(cc.selling)
            data1.append(sale)
            data2.append(cc.sold_count)

        total_sale = sum(data1)
        total_sold_count = sum(data2)

        if total_sold_count != 0:
            score = total_sale/total_sold_count
        else:
            score = 0

        ranks = ['unranked', 'bronze', 'gold', 'silver']
        if score <= 0:
            rank = ranks[0]
        elif score >= 0:
            rank = ranks[1]
        elif score >= 100:
            rank = ranks[2]
        elif score >= 200:
            rank = ranks[3]

        response = {"score":score, "rank":score}
        return JsonResponse(data = response, status= status.HTTP_200_OK)






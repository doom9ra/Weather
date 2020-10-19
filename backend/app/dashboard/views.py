from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import Weather
from .serializers import WeatherSerializer
from rest_framework.generics import get_object_or_404
from datetime import datetime, timedelta


class WeatherView(APIView):

    def get(self, request):

        startDate = request.query_params.get('startDate')
        finishDate = request.query_params.get('finishDate')
        
        if startDate and finishDate:
            finishDate = self.__get_all_day_date(finishDate)
            weather = Weather.objects.filter(
                date__range=[startDate, finishDate]
            ).order_by('date')
        else:
            # если значения пустые вывести за последнюю неделю
            startDate = (datetime.now() - timedelta(days=21)).strftime('%Y-%m-%d')
            finishDate = self.__get_all_day_date(datetime.now())
            weather = Weather.objects.filter(
                date__range=[startDate, finishDate]
            ).order_by('date')
        serializer = WeatherSerializer(weather, many=True)
        return Response({"weather": serializer.data})


    def __get_all_day_date(self, finishDate):
        """функция прибавляет время до конца дня,
        чтобы база выводила все значения за выбранный день"""
        if type(finishDate) == str:
            datetime_date = datetime.strptime(finishDate, '%Y-%m-%d')
        else:
            datetime_date = finishDate 
        all_datetime_day = datetime_date + timedelta(hours=23,minutes=59,seconds=59)
        return all_datetime_day.strftime('%Y-%m-%d %H:%M:%S')

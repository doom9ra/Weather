from rest_framework import serializers
from .models import Weather


class WeatherSerializer(serializers.Serializer):
    """Преобразуем к json формату наш djangoORM obj,
    чтобы затем передать их через наш api"""

    humidity = serializers.IntegerField()
    pressure = serializers.IntegerField()
    temp = serializers.IntegerField()
    date = serializers.DateTimeField()

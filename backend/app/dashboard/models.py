from django.db import models
import datetime


class Weather(models.Model):
    """Модель описывает погодные показатели 
    в одном регионе"""
    humidity = models.IntegerField('Влажность')
    pressure = models.IntegerField('Атм. давление')
    temp = models.IntegerField('Температура')
    date = models.DateTimeField('Дата')

    def __str__(self):
        return self.date.strftime('%Y-%m-%d')
    
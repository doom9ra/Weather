import requests
from db_conn import Database
from datetime import datetime, timedelta
import schedule
import time


def main():
    """Функция опрашивает API раз в час и загружает данные в бд"""
    
    startDateURL = (datetime.now() - timedelta(days=3) ).strftime("%Y-%m-%d")
    endDateURL = (datetime.now() - timedelta(days=1) ).strftime("%Y-%m-%d")

    URL = "https://www.ncei.noaa.gov/" + \
    "access/services/data/v1?" + \
    "dataset=local-climatological-data&" + \
    "stations=72509014739&" + \
    "units=metric&" + \
    f"startDate={startDateURL}&endDate={endDateURL}&" + \
    "format=json"

    # запрос к погодной api
    r = requests.get(URL)
    request_json = r.json()

    try:
        # Сохранение в переменную данных за последний доступный час
        last_hour_values = request_json[-1]
    except IndexError:
        # Выход тк нет данных
        return
        
    #получение всех данных от нужного датчика
    FM_15_current_day_list = []
    for FM_15_values in request_json:
        if FM_15_values['REPORT_TYPE'] == 'FM-15':
            FM_15_current_day_list.append(FM_15_values)

    # вывод значений последнего доступного часа            
    last_hour_values = FM_15_current_day_list[-1]
    current_date = datetime.strptime(last_hour_values['DATE'] + '+03:00', '%Y-%m-%dT%H:%M:%S%z')
    hourly_humidity = float(last_hour_values['HourlyRelativeHumidity'])
    hourly_temp = float(last_hour_values['HourlyDryBulbTemperature'])
    hourly_pressure = float(last_hour_values['HourlyStationPressure'])*25.4

    db_conn = Database()

    try:
        last_date = db_conn.select("""
                                      SELECT date FROM dashboard_weather
                                      ORDER BY date DESC LIMIT 5
                                   """)[0][0]
    except IndexError:
        last_date = False

    # условие для проверки повторений
    if last_date != current_date:
        db_conn.add("""
                        INSERT INTO dashboard_weather
                        (humidity, pressure, temp, date)
                        VALUES (%s, %s, %s, %s)
                    """, (hourly_humidity, hourly_pressure, hourly_temp, current_date))

    db_conn.close()

if __name__ == '__main__':
    # выставлем таймер на опрос API каждый час
    schedule.every().hour.do(main)

    while True:
        schedule.run_pending()
        time.sleep(1)

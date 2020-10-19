from db_conn import Database
from datetime import datetime, timedelta
import random

db_conn = Database()

now = datetime.now()

for days in range(7, 500):
	
	for hours in range(1, 2):
		hourly_humidity = random.randint(40,61)
		hourly_pressure = random.randint(780,891)
		hourly_temp = random.randint(10,27)
		new_date = now - timedelta(days=days, hours=hours)

		db_conn.add("""
	    	            INSERT INTO dashboard_weather
	       	        	(humidity, pressure, temp, date)
	           	    	VALUES (%s, %s, %s, %s)
		            """, (hourly_humidity, hourly_pressure, hourly_temp, new_date))

db_conn.close()
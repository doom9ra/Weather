import psycopg2
import os


class Database:

    __database=os.environ.get("POSTGRES_DB")
    __user=os.environ.get("POSTGRES_USER")
    __password=os.environ.get("POSTGRES_PASSWORD")
    __host='db'
    __port=5432

    def __init__(self):
        self.__conn = psycopg2.connect(database=self.__database,
                                    user=self.__user,
                                    password=self.__password,
                                    host=self.__host,
                                    port=self.__port)
        self.__cursor = self.__conn.cursor()

    def close(self):
        self.__cursor.close()
        self.__conn.close()

    def add(self, sql_code, parameters=None):
        self.__cursor.execute(sql_code, parameters)
        self.__conn.commit()

    def update(self, sql_code, parameters=None):
        self.__cursor.execute(sql_code, parameters)
        self.__conn.commit()

    def select(self, sql_code, parameters=None):
        self.__cursor.execute(sql_code, parameters)
        return self.__cursor.fetchall()
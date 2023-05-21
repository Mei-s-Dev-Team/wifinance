import mysql.connector
import os
from datetime import date
from dotenv import load_dotenv
from flask import Flask

load_dotenv()

class Wifinance:
    def __init__(self):
        self.expenses_db = mysql.connector.connect(
            host = os.getenv("DB_HOST"),
            user = os.getenv("DB_USER"),
            password = os.getenv("DB_PW"),
            database = 'wifinance'
        )
        #order of names matters
        self.safeKeys = ['user_id','amount','payment_type','vendor','date','purchase_type']

    def get_all_expenses(self, id):
        cursor = self.expenses_db.cursor()
        sql = "select * from expenses where id=%s;"
        params = (id,)
        cursor.execute(sql,params)
        ret = cursor.fetchall()
        cursor.close()
        return ret
    
    #order of variables matters
    def insert_expenses(self, data):
        fields = []
        if "user_id" not in data:
            return False
        if "amount" not in data:
            return False
        
        for key in self.safeKeys:
            if key in data and data[key]:
                fields.append(data[key])
            else:
                fields.append(None)

        print("fields: ", fields)

        try:
            sql = """insert into expenses (user_id, amount, payment_type, vendor, date, purchase_type) 
                                    values(%s, %s, %s, %s, %s, %s);"""
            params = (fields[0],fields[1],fields[2],fields[3],fields[4],fields[5])
            print('params: ', params)
            cursor = self.expenses_db.cursor()
            cursor.execute(sql, params)
            self.expenses_db.commit()
            cursor.close()
            return True

        except mysql.connector.Error as e :
            print("Mysql command err: ", e)
            return False

    def update_expenses(self, data):
        if "id" not in data:
            return False
        id = data['id']

        sql = "update expenses set "
        keys = list(data.keys())
        vals = list(data.values())
        counts = 0
        for key in keys:
            if key !="id" and key not in self.safeKeys:
                return False
            if key != keys[len(keys)-1]:
                sql += key+"=%s, "
            else:
                sql += key+"=%s "
            counts += 1

        sql += "where id=%s"
        vals.append(id)
        params = tuple(vals)
        print("sql command: %s, params: %s" % (sql, params))
        try:
            params = (params)
            cursor = self.expenses_db.cursor()
            cursor.execute(sql, params)
            self.expenses_db.commit()
            cursor.close()
            return True

        except mysql.connector.Error as e :
            print("Mysql command err: ", e)
            return False

    def delete_expenses(self, id):
        if not id:
            return False
        try:
            sql = """delete from expenses where id=%s;"""
            params = (id,)
            cursor = self.expenses_db.cursor()
            cursor.execute(sql, params)
            self.expenses_db.commit()
            cursor.close()
            return True
        
        except mysql.connector.Error as e :
            print("Mysql command err: ", e)
            return False
    
    def close_db(self):
        self.expenses_db.close()





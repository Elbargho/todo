import sqlite3
from flask import g
import os


class DatabaseInterface:
    def __init__(self, folder_name):
        self.db_folder = f"databases/{folder_name}"

    def createDb(self, debug):
        db_path = f"{self.db_folder}/database.db"
        if os.path.exists(db_path):
            if debug:
                os.remove(db_path)
            else:
                raise FileExistsError("database.db file exists and may contain data!")
        conn = self.connect()
        cur = conn.cursor()
        with open(f"./{self.db_folder}/schema.sql") as f:
            cur.executescript(f.read())
        conn.commit()
        conn.close()

    def connect(self):
        conn = sqlite3.connect(f"{self.db_folder}/database.db")
        conn.row_factory = sqlite3.Row
        return conn

    def getConn(self):
        conn = getattr(g, '_database', None)
        if conn is None:
            conn = g._database = self.connect()
        return conn

    def commit(self, func):
        def wrapper(*args):
            conn = None
            try:
                conn = self.getConn()
                res = func(*args)
                conn.commit()
            except Exception as e:
                if conn:
                    conn.rollback()
                raise e
            else:
                return res

        return wrapper

    def query(self, query, params=()):
        params = params if type(params) == tuple else (params,)
        curr = self.getConn().cursor()
        try:
            rows = curr.execute(query, params).fetchall()
        except Exception as e:
            raise e
        else:
            return [dict(row) for row in rows]

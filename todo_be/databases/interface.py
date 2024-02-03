import sqlite3
import os


class DatabaseInterface:
    def __init__(self, folder_name):
        self.db_folder = f"databases/{folder_name}"

    def initDb(self, debug):
        db_path = f"{self.db_folder}/database.db"
        if os.path.exists(db_path):
            if debug:
                os.remove(db_path)
            else:
                raise FileExistsError("database.db file exists and may contain data!")
        connection = sqlite3.connect(db_path)
        with open(f"./{self.db_folder}/schema.sql") as f:
            connection.executescript(f.read())

    def connect(self):
        conn = sqlite3.connect(f"{self.db_folder}/database.db")
        conn.row_factory = sqlite3.Row
        return conn

    def alterQuery(self, query, params=()):
        params = params if type(params) == tuple else (params,)
        conn = self.connect()
        rows = None
        try:
            rows = conn.execute(query, params).fetchall()
            conn.commit()
        except Exception as e:
            raise e
        finally:
            conn.close()
            if rows != None:
                return [dict(row) for row in rows]

    def selectQuery(self, query, params=()):
        params = params if type(params) == tuple else (params,)
        conn = self.connect()
        rows = None
        try:
            rows = conn.execute(query, params).fetchall()
        except Exception as e:
            raise e
        finally:
            conn.close()
            if rows != None:
                return [dict(row) for row in rows]

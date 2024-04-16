from databases.interface import DatabaseInterface
from databases.tasks import dbm as tasks_dbm
from datetime import datetime
import pytz
from configparser import ConfigParser
from app import app

tasks = DatabaseInterface("tasks")
tracker = DatabaseInterface("tracker")
notes = DatabaseInterface("notes")


def createDBs(debug):
    tasks.createDb(debug)
    tracker.createDb(debug)
    notes.createDb(debug)


def initDBs():
    with app.app_context():
        try:
            conn = tasks.getConn()
            tasks_dbm.addCategory("My Day")
            tasks_dbm.addCategory("Work")
            tasks.query("INSERT INTO tasks_order (order_list) VALUES (?)", ("[]"))
            curr_day_str = datetime.now(pytz.timezone("Israel")).strftime("%a %d/%m/%Y")
            tasks.query("INSERT INTO today (current_day) VALUES (?)", (curr_day_str,))
            conn.commit()
        except Exception as e:
            conn.rollback()
            raise e


if __name__ == "__main__":
    config = ConfigParser()
    config.read("../devops/config.properties")
    debug = config.getboolean("DEBUG", "debug", fallback=False)

    createDBs(debug)
    initDBs()

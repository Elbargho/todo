from databases.interface import DatabaseInterface
from databases.tasks import dbm as tasks_dbm
from datetime import datetime
from configparser import ConfigParser

tasks = DatabaseInterface("tasks")
tracker = DatabaseInterface("tracker")
notes = DatabaseInterface("notes")
config = ConfigParser()

def initDBs(debug):
    tasks.initDb(debug)
    tracker.initDb(debug)
    notes.initDb(debug)


if __name__ == "__main__":
    config.read("../devops/config.properties")
    debug = config.getboolean("DEBUG", "debug", fallback=False)
    initDBs(debug)

    tasks_dbm.addCategory("My Day")
    tasks_dbm.addCategory("Work")
    tasks_dbm.addTasksOrderList()

    curr_day_str = datetime.now().strftime("%a %d/%m/%Y")
    tasks.alterQuery("INSERT INTO today (current_day) VALUES (?)", (curr_day_str,))

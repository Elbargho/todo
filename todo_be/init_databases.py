from databases.interface import DatabaseInterface
from databases.tasks import dbm as tasks_dbm
from datetime import datetime
from configparser import ConfigParser
import pytz

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

    curr_day_str = datetime.now(pytz.timezone("Israel")).strftime("%a %d/%m/%Y")
    tasks.alterQuery("INSERT INTO today (current_day) VALUES (?)", (curr_day_str,))

    # notes.alterQuery("UPDATE notes_list SET created_at = created_at || ' 00:00:01'")
    # notes.alterQuery("ALTER TABLE notes_list ADD COLUMN last_updated TIMESTAMP")
    # notes.alterQuery("UPDATE notes_list SET last_updated = created_at")

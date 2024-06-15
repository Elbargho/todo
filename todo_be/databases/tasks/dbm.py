from ..interface import DatabaseInterface
from datetime import datetime, timedelta
import pytz, os
import json

parent_folder = os.path.split(os.path.dirname(__file__))[-1]
db = DatabaseInterface(parent_folder)
query = db.query


def addCategory(name):
    created_at = getCurrentDay()
    return query(
        "INSERT INTO categories (name, is_active, created_at) VALUES (?, ?, ?) RETURNING *",
        (name, 1, created_at),
    )[0]


def addTask(category_id, title, raw_title, is_done, repeat, times_done):
    created_at = getCurrentDay()
    is_in_my_day = None if category_id == 1 else True
    return query(
        "INSERT INTO tasks (category_id, title, raw_title, is_done, repeat, times_done, is_active, is_in_my_day, disable_today, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id",
        (category_id, title, raw_title, is_done, repeat, times_done, 1, is_in_my_day, 0, created_at),
    )[0]["id"]


def addSubTask(task_id, title, is_done):
    created_at = getCurrentDay()
    query(
        "INSERT INTO sub_tasks (task_id, title, is_done, created_at) VALUES (?, ?, ?, ?)",
        (task_id, title, is_done, created_at),
    )


def addTaskHistory(task_id, updated_task_id):
    query(
        "INSERT INTO tasks_history (task_id, updated_task_id) VALUES (?, ?)",
        (task_id, updated_task_id),
    )


def updateCurrentDay():
    current_day_str = getCurrentDay()
    current_day_date = datetime.strptime(current_day_str, "%Y-%m-%d")
    next_day_date = current_day_date + timedelta(days=1)
    next_day_str = next_day_date.strftime("%Y-%m-%d")
    query("UPDATE today SET current_day = ?", (next_day_str,))
    return next_day_str


def addTaskProgress(task_id):
    now = datetime.now(pytz.timezone("Israel")).strftime("%Y-%m-%d %H:%M:%S")
    time = now.split(' ')[1]
    done_at = f"{getCurrentDay()} {time}"
    query("INSERT INTO tasks_progress (task_id, done_at, now) VALUES (?, ?, ?)", (task_id, done_at, now))


def addSubTaskProgress(sub_task_id):
    now = datetime.now(pytz.timezone("Israel")).strftime("%Y-%m-%d %H:%M:%S")
    time = now.split(' ')[1]
    done_at = f"{getCurrentDay()} {time}"
    query("INSERT INTO sub_tasks_progress (sub_task_id, done_at, now) VALUES (?, ?, ?)", (sub_task_id, done_at, now))


def removeTaskProgress(task_id):
    date = getCurrentDay()
    query("DELETE FROM tasks_progress WHERE task_id = ? AND done_at LIKE ? || '%'", (task_id, date))


def removeSubTaskProgress(sub_task_id):
    date = getCurrentDay()
    query("DELETE FROM sub_tasks_progress WHERE sub_task_id = ? AND done_at LIKE ? || '%'", (sub_task_id, date))


def removeTaskAllSubTasksProgress(task_id):
    date = getCurrentDay()
    query(
        "DELETE FROM sub_tasks_progress WHERE sub_task_id IN (SELECT id FROM sub_tasks WHERE task_id = ?) AND done_at LIKE ? || '%'",
        (task_id, date),
    )


def getCategories():
    return query("SELECT * FROM categories WHERE is_active = 1")


def getCategoryTasks(category_id):
    if int(category_id) == 1:
        return query(
            "SELECT t.*, c.name as category_name FROM tasks AS t JOIN categories AS c ON t.category_id = c.id WHERE (t.is_in_my_day IS NULL OR t.is_in_my_day = 1) AND t.disable_today = 0 AND t.is_active = 1 AND c.is_active = 1 ORDER BY t.id DESC"
        )
    return query(
        "SELECT * FROM tasks WHERE is_active = 1 AND category_id = ? ORDER BY id DESC",
        (category_id,),
    )


def getTask(id):
    return query("SELECT * FROM tasks WHERE id = ?", (id,))[0]


def getTaskSubTasks(task_id):
    return query("SELECT * FROM sub_tasks WHERE task_id = ?", (task_id,))


def getTaskStatus(id):
    row = query(
        "SELECT COUNT(*) AS numOfSTs, SUM(CASE WHEN is_done = 0 THEN 1 ELSE 0 END) AS numOfUndoneSTs \
                       FROM sub_tasks WHERE task_id = ?",
        (id,),
    )
    return list(row[0].values())


def getTaskFirstUndoneSubTaskId(task_id):
    return query(
        "SELECT MIN(id) AS min_id FROM sub_tasks WHERE is_done = 0 AND task_id = ?",
        (task_id,),
    )[
        0
    ]["min_id"]


def getTasksOrderList():
    order_list_str = query("SELECT order_list FROM tasks_order")[0]["order_list"]
    return json.loads(order_list_str)


def getCurrentDay():
    return query("SELECT current_day FROM today LIMIT 1")[0]["current_day"]


def updateCategoryName(id, name):
    query("UPDATE categories SET name = ? WHERE id = ?", (name, id))


def updateCategoryIsActive(id, is_active):
    query("UPDATE categories SET is_active = ? WHERE id = ?", (is_active, id))


def updateSubTaskIsDone(id):
    return query(
        "UPDATE sub_tasks SET is_done = 1 - is_done WHERE id = ? RETURNING is_done",
        (id,),
    )[
        0
    ]["is_done"]


def updateTaskAllSubTasksIsDone(task_id):
    return query("UPDATE sub_tasks SET is_done = 0 WHERE task_id = ?", (task_id,))


def updateTaskIsDone(id, status=None):
    new_status = str(status) if status != None else "1 - is_done"
    row = query(
        f"UPDATE tasks SET is_done = {new_status} WHERE id = ? RETURNING is_done, repeat",
        (id,),
    )
    return list(row[0].values())


def updateTaskTimesDone(id, to_add):
    return query("UPDATE tasks SET times_done = times_done + ? WHERE id = ?", (to_add, id))


def updateTaskIsActive(id, is_active):
    query("UPDATE tasks SET is_active = ? WHERE id = ?", (is_active, id))


def updateTaskIsInMyDay(id):
    return query("UPDATE tasks SET is_in_my_day = 1 - is_in_my_day WHERE id = ? RETURNING is_in_my_day", (id))[0][
        "is_in_my_day"
    ]


def updateTaskDisableToday(id, disable_today):
    query("UPDATE tasks SET disable_today = ? WHERE id = ?", (disable_today, id))


def updateTasksOrderList(order_list):
    order_list_str = json.dumps(order_list)
    query("UPDATE tasks_order SET order_list = ?", order_list_str)


def updateNextDayTasks(is_first_day_of_month):
    query("UPDATE tasks SET disable_today = 0 WHERE disable_today = 1")
    query("UPDATE tasks SET is_active = 0 WHERE (repeat = '' or INSTR(repeat, '+') > 0) AND is_done = 1")
    query("UPDATE tasks SET is_done = 0 WHERE repeat != ''")
    query(
        "UPDATE sub_tasks SET is_done = 0 WHERE task_id IN (SELECT sub_tasks.task_id FROM sub_tasks JOIN tasks ON sub_tasks.task_id = tasks.id WHERE tasks.repeat != '')"
    )
    if is_first_day_of_month:
        query("UPDATE tasks SET times_done = 0 WHERE times_done IS NOT NULL AND is_active = 1")

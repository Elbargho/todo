from ..interface import DatabaseInterface
from datetime import datetime, timedelta
import pytz, os
import json

parent_folder = os.path.split(os.path.dirname(__file__))[-1]
db = DatabaseInterface(parent_folder)
alterQuery, selectQuery = db.alterQuery, db.selectQuery


def addCategory(name):
    created_at = datetime.now(pytz.timezone("Israel")).strftime("%Y-%m-%d %H:%M:%S")

    return alterQuery(
        "INSERT INTO categories (name, is_active, created_at) VALUES (?, ?, ?) RETURNING *",
        (name, 1, created_at),
    )[0]


def addTask(category_id, title, raw_title, is_done, repeat, times_done, created_at):
    # created_at = datetime.now(pytz.timezone('Israel')).strftime(
    #     "%Y-%m-%d %H:%M:%S")
    created_at = created_at.split(" ")[1]

    return alterQuery(
        "INSERT INTO tasks (category_id, title, raw_title, is_done, repeat, times_done, is_active, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?) RETURNING id",
        (category_id, title, raw_title, is_done, repeat, times_done, 1, created_at),
    )[0]["id"]


def addSubTask(task_id, title, is_done):
    alterQuery(
        "INSERT INTO sub_tasks (task_id, title, is_done) VALUES (?, ?, ?)",
        (task_id, title, is_done),
    )


def addTaskHistory(task_id, updated_task_id):
    alterQuery(
        "INSERT INTO tasks_history (task_id, updated_task_id) VALUES (?, ?)",
        (task_id, updated_task_id),
    )


def addTasksOrderList():
    alterQuery("INSERT INTO tasks_order (order_list) VALUES (?)", ("[]"))


def addNextDay(current_day_str):
    current_day_date = datetime.strptime(current_day_str, "%a %d/%m/%Y")
    next_day_date = current_day_date + timedelta(days=1)
    next_day_str = next_day_date.strftime("%a %d/%m/%Y")
    alterQuery("INSERT INTO today (current_day) VALUES (?)", (next_day_str,))
    return next_day_str


def getCategories():
    return selectQuery("SELECT * FROM categories WHERE is_active = 1")


def getCategoryTasks(category_id):
    if int(category_id) == 1:
        return selectQuery(
            "SELECT t.*, c.name as category_name FROM tasks AS t JOIN categories AS c ON t.category_id = c.id WHERE t.is_active = 1 AND c.is_active = 1 ORDER BY t.id DESC"
        )
    return selectQuery(
        "SELECT * FROM tasks WHERE is_active = 1 AND category_id = ? ORDER BY id DESC",
        (category_id,),
    )


def getTask(id):
    return selectQuery("SELECT * FROM tasks WHERE id = ?", (id,))[0]


def getTaskSubTasks(task_id):
    return selectQuery("SELECT * FROM sub_tasks WHERE task_id = ?", (task_id,))


def getTaskStatus(id):
    row = selectQuery(
        "SELECT COUNT(*) AS numOfSTs, SUM(CASE WHEN is_done = 0 THEN 1 ELSE 0 END) AS numOfUndoneSTs \
                       FROM sub_tasks WHERE task_id = ?",
        (id,),
    )
    return list(row[0].values())


def getTaskFirstUndoneSubTaskId(task_id):
    return selectQuery(
        "SELECT MIN(id) AS min_id FROM sub_tasks WHERE is_done = 0 AND task_id = ?",
        (task_id,),
    )[0]["min_id"]


def getTasksOrderList():
    order_list_str = selectQuery("SELECT order_list FROM tasks_order")[0]["order_list"]
    return json.loads(order_list_str)


def getCurrentDay():
    return selectQuery("SELECT current_day FROM today ORDER BY id DESC LIMIT 1")[0]


def updateCategoryName(id, name):
    alterQuery("UPDATE categories SET name = ? WHERE id = ?", (name, id))


def updateCategoryIsActive(id, is_active):
    alterQuery("UPDATE categories SET is_active = ? WHERE id = ?", (is_active, id))


def updateSubTaskIsDone(id):
    return alterQuery(
        "UPDATE sub_tasks SET is_done = 1 - is_done WHERE id = ? RETURNING is_done",
        (id,),
    )[0]["is_done"]


def updateTaskAllSubTasksIsDone(task_id):
    return alterQuery("UPDATE sub_tasks SET is_done = 0 WHERE task_id = ?", (task_id,))


def updateTaskIsDone(id, status=None):
    new_status = str(status) if status != None else "1 - is_done"
    row = alterQuery(
        f"UPDATE tasks SET is_done = {new_status} WHERE id = ? RETURNING is_done, repeat",
        (id,),
    )
    return list(row[0].values())


def updateTaskTimesDone(id, to_add):
    return alterQuery(
        "UPDATE tasks SET times_done = times_done + ? WHERE id = ?", (to_add, id)
    )


def updateTaskIsActive(id, is_active):
    alterQuery("UPDATE tasks SET is_active = ? WHERE id = ?", (is_active, id))


def updateTasksOrderList(order_list):
    order_list_str = json.dumps(order_list)
    alterQuery("UPDATE tasks_order SET order_list = ?", order_list_str)


def updateNextDayTasks():
    alterQuery(
        "UPDATE tasks SET is_active = 0 WHERE (repeat = '' or INSTR(repeat, '+') > 0) AND is_done = 1"
    )
    alterQuery("UPDATE tasks SET is_done = 0 WHERE repeat != ''")
    alterQuery(
        "UPDATE sub_tasks SET is_done = 0 WHERE task_id IN (SELECT sub_tasks.task_id FROM sub_tasks JOIN tasks ON sub_tasks.task_id = tasks.id WHERE tasks.repeat != '')"
    )

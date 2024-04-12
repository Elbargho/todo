from databases.tasks import dbm
from datetime import datetime
from .common import *


################### ENDPOINT PROCESSORS ###################
def getCategories():
    categories = dbm.getCategories()
    return [excludeFields(category) for category in categories]


def getCurrentDay():
    return dbm.getCurrentDay()


# Control the order of the tasks by changing "reverse" arg
def getCategoryTasks(category_id, current_day, reverse=False):
    tasks = dbm.getCategoryTasks(category_id)
    tasks_order = dbm.getTasksOrderList()
    if int(category_id) == 1:
        return sorted(
            [
                {**excludeFields(task), "sub_tasks": getSubTasks(task["id"])}
                for task in tasks
                if (isTaskDueToday(task["repeat"], task["created_at"], current_day))
            ],
            key=lambda x: tasks_order.index(x["id"]),
            reverse=reverse,
        )
    return sorted(
        [
            {**excludeFields(task), "sub_tasks": getSubTasks(task["id"])}
            for task in tasks
        ],
        key=lambda x: tasks_order.index(x["id"]),
        reverse=reverse,
    )


def addCategory(name):
    new_category = dbm.addCategory(name)
    return excludeFields(new_category)


def editCategory(id, new_name):
    dbm.updateCategoryName(id, new_name)
    return {}


def deleteCategory(id):
    dbm.updateCategoryIsActive(id, 0)
    return {}, 204


def updateTaskStatus(task_id, sub_task_id, is_multi_task):
    if not is_multi_task:
        is_done, repeat = dbm.updateTaskIsDone(task_id)
        if repeat != "":
            to_add = 1 if is_done == 1 else -1
            dbm.updateTaskTimesDone(task_id, to_add)
        is_progress = is_done == 1
    else:
        if sub_task_id == None:
            sub_task_id = dbm.getTaskFirstUndoneSubTaskId(task_id)
        if sub_task_id != None:
            numOfSTs, numOfUndomeSTs_before = dbm.getTaskStatus(task_id)
            is_progress = dbm.updateSubTaskIsDone(sub_task_id) == 1
            _, numOfUndomeSTs_after = dbm.getTaskStatus(task_id)
            if numOfUndomeSTs_after == 0:
                is_done = to_add = 1
            elif numOfSTs == numOfUndomeSTs_after:
                is_done = to_add = 0
            else:
                is_done = 0.5
                if numOfUndomeSTs_before == 0:
                    to_add = -1
                else:
                    to_add = 0
            is_done, repeat = dbm.updateTaskIsDone(task_id, is_done)
            if repeat != "":
                dbm.updateTaskTimesDone(task_id, to_add)
        else:
            resetTask(task_id, True)
            is_progress = False
    task = dbm.getTask(task_id)
    return {
        "task": {**excludeFields(task), "sub_tasks": getSubTasks(task_id)},
        "is_progress": is_progress,
    }


def addTask(category_id, raw_title, current_day, times_done=0):
    new_task_id, new_task = addTaskReturningRawData(
        category_id, raw_title, times_done, current_day
    )
    tasks_order = dbm.getTasksOrderList()
    dbm.updateTasksOrderList(tasks_order + [new_task_id])
    if int(category_id) == 1 and not isTaskDueToday(
        new_task["repeat"], new_task["created_at"], current_day
    ):
        return {}
    return excludeFields(new_task)


def editTask(task_id, category_id, raw_title, current_day):
    deactivateTask(task_id)
    task = dbm.getTask(task_id)
    times_done = task["times_done"] if task["times_done"] != None else 0
    new_task_id, new_task = addTaskReturningRawData(
        task["category_id"], raw_title, times_done, current_day
    )
    dbm.addTaskHistory(task_id, new_task_id)
    tasks_order = dbm.getTasksOrderList()
    idx = tasks_order.index(task_id)
    tasks_order[idx] = new_task_id
    dbm.updateTasksOrderList(tasks_order)
    if int(category_id) == 1 and not isTaskDueToday(
        new_task["repeat"], new_task["created_at"], current_day
    ):
        return {}, 204
    return excludeFields(new_task)


def deleteTask(task_id):
    tasks_order = dbm.getTasksOrderList()
    tasks_order.remove(task_id)
    dbm.updateTasksOrderList(tasks_order)
    deactivateTask(task_id)
    return {}, 204


def disableTaskToday(task_id):
    dbm.updateTaskDisableToday(task_id, 1)
    return {}, 204


def getNextDayTasks(category_id, current_day):
    dbm.updateNextDayTasks()
    current_day = dbm.addNextDay(current_day)
    tasks = getCategoryTasks(category_id, current_day)
    return {"tasks": tasks, "current_day": current_day}


################### HELPERS ###################
def resetTask(task_id, with_times_done):
    dbm.updateTaskAllSubTasksIsDone(task_id)
    dbm.updateTaskIsDone(task_id, 0)
    if with_times_done:
        dbm.updateTaskTimesDone(task_id, -1)


def getSubTasks(task_id):
    sub_tasks = dbm.getTaskSubTasks(task_id)
    return {st["id"]: excludeFields(st) for st in sub_tasks}


def isTaskDueToday(repeat, created_at, current_day_str):
    current_day = datetime.strptime(current_day_str, "%a %d/%m/%Y")
    if repeat == "":
        return True
    elif "*" in repeat:
        created_at = datetime.strptime(created_at, "%d/%m/%Y")
        diff_in_days = (current_day.date() - created_at.date()).days
        r = int("".join(repeat.split("*")))
        if diff_in_days % r == 0:
            return True
    elif "+" in repeat:
        created_at = datetime.strptime(created_at, "%d/%m/%Y")
        diff_in_days = (current_day.date() - created_at.date()).days
        r = int("".join(repeat.split("+")))
        if diff_in_days >= r:
            return True
    elif "-" in repeat:
        weekday = (current_day.weekday() + 1) % 7 + 1
        r1 = int(repeat[0])
        r2 = int(repeat[2])
        if r1 <= weekday <= r2:
            return True
    else:
        days = [int(x) for x in repeat.split(",")]
        weekday = (current_day.weekday() + 1) % 7 + 1
        return weekday in days
    return False


def deactivateTask(task_id):
    dbm.updateTaskIsActive(task_id, 0)


def addTaskReturningRawData(category_id, raw_title, times_done, current_day):
    title = raw_title.split("!")[0].strip()
    repeat = ""
    key_words = extractKeyWords(raw_title)
    sub_tasks_title = []
    for kw in key_words:
        if kw[:2] == "r:":
            repeat = kw[2:].strip()
        elif kw[:3] == "st:":
            sub_tasks_title = [st.strip() for st in kw[3:].split(",")]
    times_done = None if repeat == "" or "+" in repeat else times_done
    new_task_id = dbm.addTask(
        category_id, title, raw_title.strip(), 0, repeat, times_done, current_day
    )
    for title in sub_tasks_title:
        dbm.addSubTask(new_task_id, title, 0)
    new_task = dbm.getTask(new_task_id)
    return new_task_id, {**new_task, "sub_tasks": getSubTasks(new_task_id)}

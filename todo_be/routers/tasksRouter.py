from flask import Blueprint, request
from services import tasksService

tasks_bp = Blueprint("tasks", __name__)


@tasks_bp.route("/getCategories")
def getCategories():
    return tasksService.getCategories()


@tasks_bp.route("/getCurrentDay")
def getCurrentDay():
    return tasksService.getCurrentDay()


@tasks_bp.route("/getCategoryTasks")
def getCategoryTasks():
    args = request.args
    return tasksService.getCategoryTasks(args["category_id"], args["current_day"])


@tasks_bp.route("/updateTaskStatus", methods=["POST"])
def updateTaskStatus():
    data = request.get_json()
    return tasksService.updateTaskStatus(
        data["task_id"], data["sub_task_id"], data["is_multi_task"]
    )


@tasks_bp.route("/addTask", methods=["POST"])
def addTask():
    data = request.get_json()
    return tasksService.addTask(
        data["category_id"], data["raw_title"], data["current_day"]
    )


@tasks_bp.route("/editTask", methods=["POST"])
def editTask():
    data = request.get_json()
    return tasksService.editTask(
        data["task_id"], data["category_id"], data["raw_title"], data["current_day"]
    )


@tasks_bp.route("/deleteTask", methods=["POST"])
def deleteTask():
    data = request.get_json()
    return tasksService.deleteTask(data["task_id"])


@tasks_bp.route("/getNextDayTasks")
def getNextDayTasks():
    args = request.args
    return tasksService.getNextDayTasks(args["category_id"], args["current_day"])


@tasks_bp.route("/addCategory", methods=["POST"])
def addCategory():
    data = request.get_json()
    return tasksService.addCategory(data["name"])


@tasks_bp.route("/editCategory", methods=["POST"])
def editCategory():
    data = request.get_json()
    return tasksService.editCategory(data["id"], data["new_name"])


@tasks_bp.route("/deleteCategory", methods=["POST"])
def deleteCategory():
    data = request.get_json()
    return tasksService.deleteCategory(data["id"])

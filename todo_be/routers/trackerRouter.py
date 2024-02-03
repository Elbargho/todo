from flask import Blueprint, request
from services import trackerService

tracker_bp = Blueprint("tracker", __name__)


@tracker_bp.route("/getCategories")
def getCategories():
    return trackerService.getCategories()


@tracker_bp.route("/addCategory", methods=["POST"])
def addCategory():
    data = request.get_json()
    return trackerService.addCategory(data["title"], data["color"])


@tracker_bp.route("/updateCategory", methods=["POST"])
def updateCategory():
    data = request.get_json()
    return trackerService.updateCategory(
        data["id"], data["new_title"], data["new_color"]
    )


@tracker_bp.route("/getCategoriesStatuses")
def getCategoriesStatuses():
    args = request.args
    return trackerService.getCategoriesStatuses(args["fromDate"], args["toDate"])


@tracker_bp.route("/updateCategoryStatus", methods=["POST"])
def updateCategoryStatus():
    data = request.get_json()
    return trackerService.updateCategoryStatus(data["id"], data["toAdd"], data["date"])


@tracker_bp.route("/deleteCategory", methods=["POST"])
def deleteCategory():
    data = request.get_json()
    return trackerService.deleteCategory(data["id"])

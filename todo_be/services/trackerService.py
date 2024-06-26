from databases.interface import DatabaseInterface
from databases.tracker import dbm
from .common import *


db = DatabaseInterface("tracker")


################### ENDPOINT PROCESSORS ###################
def getCategories():
    categories = dbm.getCategories()
    return {category["id"]: excludeFields(category) for category in categories}


@db.commit
def addCategory(title, color):
    category = dbm.addCategory(title, color)
    return {category["id"]: {**excludeFields(category), "times_done": 0}}


@db.commit
def updateCategory(id, new_title, new_color):
    updated_category = dbm.updateCategory(id, new_title, new_color)
    return {updated_category["id"]: excludeFields(updated_category)}


def getCategoriesStatuses(fromDate, toDate):
    categories_statuses = dbm.getCategoriesStatuses(fromDate, toDate)
    categories_statuses = [cs for cs in categories_statuses if cs["times_done"] > 0]
    res = {}
    for category_status in categories_statuses:
        if category_status["done_at"] not in res:
            res[category_status["done_at"]] = {}
        res[category_status["done_at"]][category_status["category_id"]] = category_status["times_done"]
    return res


@db.commit
def updateCategoryStatus(id, to_add, date):
    times_done = dbm.updateCategoryStatus(id, to_add, date)
    return {id: times_done}


@db.commit
def deleteCategory(category_id):
    dbm.updateCategoryIsActive(category_id)
    return {}, 204

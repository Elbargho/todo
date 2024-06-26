from ..interface import *
from datetime import datetime
import pytz

parent_folder = os.path.split(os.path.dirname(__file__))[-1]
db = DatabaseInterface(parent_folder)
query = db.query


def addCategory(title, color):
    created_at = datetime.now(pytz.timezone("Israel")).strftime("%Y-%m-%d")

    return query(
        "INSERT INTO categories (title, color, is_active, created_at) VALUES (?, ?, ?, ?) RETURNING *",
        (title, color, 1, created_at),
    )[0]


def getCategories():
    today = datetime.now(pytz.timezone("Israel")).strftime("%Y-%m-%d")

    return query(
        "SELECT c.*, COALESCE(cs.times_done, 0) AS times_done FROM categories AS c LEFT JOIN categories_statuses AS cs ON c.id = cs.category_id AND cs.done_at = ? WHERE c.is_active = 1",
        (today,),
    )


def getCategoriesStatuses(fromDate, toDate):
    return query(
        "SELECT cs.* FROM categories_statuses AS cs JOIN categories AS c ON c.id = cs.category_id WHERE c.is_active = 1 AND done_at BETWEEN ? AND ? ORDER BY done_at",
        (fromDate, toDate),
    )


def updateCategoryStatus(id, to_add, date):
    res = query(
        "SELECT * FROM categories_statuses WHERE category_id = ? AND done_at = ?",
        (id, date),
    )
    if res != []:
        if res[0]["times_done"] + to_add == 0:
            query(
                "DELETE FROM categories_statuses WHERE category_id = ? AND done_at = ?",
                (id, date),
            )
            return 0
        else:
            times_done = query(
                "UPDATE categories_statuses SET times_done = times_done + ? WHERE category_id = ? AND done_at = ? RETURNING times_done",
                (to_add, id, date),
            )
    else:
        times_done = query(
            "INSERT INTO categories_statuses (category_id, times_done, done_at) VALUES (?, ?, ?) RETURNING times_done",
            (id, 1, date),
        )
    return times_done[0]["times_done"]


def updateCategory(id, new_title, new_color):
    return query(
        "UPDATE categories SET title = ?, color = ? WHERE id = ? RETURNING *",
        (new_title, new_color, id),
    )[0]


def updateCategoryIsActive(id, is_active=0):
    query("UPDATE categories SET is_active = ? WHERE id = ?", (is_active, id))

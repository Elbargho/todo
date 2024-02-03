from ..interface import *
from datetime import datetime
import pytz

parent_folder = os.path.split(os.path.dirname(__file__))[-1]
db = DatabaseInterface(parent_folder)
alterQuery, selectQuery = db.alterQuery, db.selectQuery


def getNotesList():
    return selectQuery(
        "SELECT id, name FROM notes_list WHERE is_active = 1 ORDER BY id DESC"
    )


def getNoteContents(id):
    return selectQuery(
        "SELECT id, text FROM notes WHERE is_active = 1 AND note_list_id = ? ORDER BY id DESC",
        (id,),
    )


def addNoteList(name):
    created_at = datetime.now(pytz.timezone("Israel")).strftime("%Y-%m-%d")

    return alterQuery(
        "INSERT INTO notes_list (name, is_active, created_at) VALUES (?, ?, ?) RETURNING id",
        (name, 1, created_at),
    )[0]["id"]


def addNote(note_list_id, text):
    created_at = datetime.now(pytz.timezone("Israel")).strftime("%Y-%m-%d")

    return alterQuery(
        "INSERT INTO notes (note_list_id, text, is_active, created_at) VALUES (?, ?, ?, ?) RETURNING id",
        (note_list_id, text, 1, created_at),
    )[0]["id"]


def editNoteList(id, new_name):
    alterQuery(
        "UPDATE notes_list SET name = ? WHERE id = ?",
        (new_name, id),
    )


def editNote(id, new_text):
    alterQuery(
        "UPDATE notes SET text = ? WHERE id = ?",
        (new_text, id),
    )


def deleteNoteList(id):
    alterQuery(
        "UPDATE notes_list SET is_active = ? WHERE id = ?",
        (0, id),
    )


def deleteNote(id):
    alterQuery(
        "UPDATE notes SET is_active = ? WHERE id = ?",
        (0, id),
    )

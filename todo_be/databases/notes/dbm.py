from ..interface import *
from datetime import datetime
import pytz

parent_folder = os.path.split(os.path.dirname(__file__))[-1]
db = DatabaseInterface(parent_folder)
query = db.query


def getNotesList():
    return query("SELECT id, name FROM notes_list WHERE is_active = 1 ORDER BY last_updated DESC")


def getNoteContents(id):
    return query(
        "SELECT id, text FROM notes WHERE is_active = 1 AND note_list_id = ? ORDER BY id DESC",
        (id,),
    )


def getNoteListId(note_id):
    return query(
        "SELECT note_list_id FROM notes WHERE id = ?",
        (note_id,),
    )[
        0
    ]["note_list_id"]


def addNoteList(name):
    created_at = datetime.now(pytz.timezone("Israel")).strftime("%Y-%m-%d %H:%M:%S")

    return query(
        "INSERT INTO notes_list (name, is_active, created_at, last_updated) VALUES (?, ?, ?, ?) RETURNING id",
        (name, 1, created_at, created_at),
    )[0]["id"]


def addNote(note_list_id, text):
    created_at = datetime.now(pytz.timezone("Israel")).strftime("%Y-%m-%d %H:%M:%S")

    return query(
        "INSERT INTO notes (note_list_id, text, is_active, created_at) VALUES (?, ?, ?, ?) RETURNING id",
        (note_list_id, text, 1, created_at),
    )[0]["id"]


def editNoteList(id, new_name):
    query(
        "UPDATE notes_list SET name = ? WHERE id = ?",
        (new_name, id),
    )


def editNote(id, new_text):
    query(
        "UPDATE notes SET text = ? WHERE id = ?",
        (new_text, id),
    )


def updateNoteListLastUpdated(id):
    last_updated = datetime.now(pytz.timezone("Israel")).strftime("%Y-%m-%d %H:%M:%S")

    query(
        "UPDATE notes_list SET last_updated = ? WHERE id = ?",
        (last_updated, id),
    )


def deleteNoteList(id):
    query(
        "UPDATE notes_list SET is_active = ? WHERE id = ?",
        (0, id),
    )


def deleteNote(id):
    query(
        "UPDATE notes SET is_active = ? WHERE id = ?",
        (0, id),
    )

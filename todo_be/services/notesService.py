from databases.interface import DatabaseInterface
from databases.notes import dbm
from .common import *


db = DatabaseInterface("notes")


################### ENDPOINT PROCESSORS ###################
def getNotesList():
    notes_list = dbm.getNotesList()
    return notes_list


def getNoteContents(note_list_id):
    note_contents = dbm.getNoteContents(note_list_id)
    return note_contents


@db.commit
def addNoteList(note_name):
    note_list_id = dbm.addNoteList(note_name)
    return {"id": note_list_id}


@db.commit
def addNote(note_list_id, text):
    dbm.updateNoteListLastUpdated(note_list_id)
    note_id = dbm.addNote(note_list_id, text)
    return {"id": note_id}


@db.commit
def editNote(id, new_text):
    note_list_id = dbm.getNoteListId(id)
    dbm.updateNoteListLastUpdated(note_list_id)
    dbm.editNote(id, new_text)
    return {}


@db.commit
def editNoteList(id, new_name):
    dbm.updateNoteListLastUpdated(id)
    dbm.editNoteList(id, new_name)
    return {}


@db.commit
def deleteNoteList(id):
    dbm.deleteNoteList(id)
    return {}, 204


@db.commit
def deleteNote(id):
    dbm.deleteNote(id)
    return {}, 204

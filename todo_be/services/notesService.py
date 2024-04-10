from databases.notes import dbm
from .common import *


################### ENDPOINT PROCESSORS ###################
def getNotesList():
    notes_list = dbm.getNotesList()
    return notes_list


def getNoteContents(note_list_id):
    note_contents = dbm.getNoteContents(note_list_id)
    return note_contents


def addNoteList(note_name):
    return {"id": dbm.addNoteList(note_name)}


def addNote(note_list_id, text):
    dbm.updateNoteListLastUpdated(note_list_id)
    return {"id": dbm.addNote(note_list_id, text)}


def editNote(id, new_text):
    note_list_id = dbm.getNoteListId(id)
    dbm.updateNoteListLastUpdated(note_list_id)
    dbm.editNote(id, new_text)
    return {}


def editNoteList(id, new_name):
    dbm.updateNoteListLastUpdated(id)
    dbm.editNoteList(id, new_name)
    return {}


def deleteNoteList(id):
    dbm.deleteNoteList(id)
    return {}, 204


def deleteNote(id):
    dbm.deleteNote(id)
    return {}, 204


################### HELPERS ###################

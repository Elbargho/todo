from flask import Blueprint, request
from services import notesService

notes_bp = Blueprint("notes", __name__)


@notes_bp.route("/getNotesList")
def getNotesList():
    return notesService.getNotesList()


@notes_bp.route("/getNoteContents")
def getNoteContents():
    args = request.args
    return notesService.getNoteContents(args["note_list_id"])


@notes_bp.route("/addNoteList", methods=["POST"])
def addNoteList():
    data = request.get_json()
    return notesService.addNoteList(data["note_name"])


@notes_bp.route("/addNote", methods=["POST"])
def addNote():
    data = request.get_json()
    return notesService.addNote(data["note_list_id"], data["text"])


@notes_bp.route("/editNoteList", methods=["POST"])
def editNoteList():
    data = request.get_json()
    return notesService.editNoteList(data["id"], data["new_name"])


@notes_bp.route("/editNote", methods=["POST"])
def editNote():
    data = request.get_json()
    return notesService.editNote(data["id"], data["new_text"])


@notes_bp.route("/deleteNoteList", methods=["DELETE"])
def deleteNoteList():
    args = request.args
    return notesService.deleteNoteList(args["id"])


@notes_bp.route("/deleteNote", methods=["DELETE"])
def deleteNote():
    args = request.args
    return notesService.deleteNote(args["id"])

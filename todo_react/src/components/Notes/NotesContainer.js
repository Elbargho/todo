import { useEffect, useState, Fragment } from "react";
import { Container, Typography } from "@mui/material";
import { Divider, AddItem as AddANote } from "../Common";
import { EditableNote } from "./";
import API from "../../APIs/NotesAPI";

export default function NotesContainer({ note_list_id, notes }) {
  const [editableNotes, setEditableNotes] = useState(notes);

  const noteOnBlur = async (note_id, text) => {
    let newEditableNotes = [...editableNotes];
    if (text.trim() == "") {
      if (note_id == -1) {
        newEditableNotes = newEditableNotes.filter((note) => note.id != note_id);
        setEditableNotes(newEditableNotes);
      } else await deleteNote(note_id);
    } else {
      if (note_id == -1) await addNote(text);
      else await editNote(note_id, text);
    }
  };

  const addNote = async (text) => {
    let newEditableNotes = [...editableNotes];
    const data = await API.addNote(note_list_id, text);
    if (data != null) {
      newEditableNotes = newEditableNotes.filter((note) => note.id != -1);
      newEditableNotes = [{ id: data.id, text: text }, ...newEditableNotes];
    }
    setEditableNotes(newEditableNotes);
  };

  const editNote = async (note_id, text) => {
    if (text != editableNotes.find((note) => note.id == note_id).text)
      await API.editNote(note_id, text);
  };

  const deleteNote = async (note_id) => {
    let newEditableNotes = [...editableNotes];
    const data = await API.deleteNote(note_id);
    if (data.statusCode == 204) newEditableNotes = newEditableNotes.filter((note) => note.id != note_id);
    setEditableNotes(newEditableNotes);
  };

  const addANoteContainer = () => {
    setEditableNotes([{ id: -1, text: "" }, ...editableNotes]);
  };

  const listNotes = editableNotes.map((note) => {
    return (
      <Fragment key={note.id}>
        <Divider />
        <EditableNote
          text={note.text}
          onBlur={(text) => noteOnBlur(note.id, text)}
          autoFocus={note.id == -1 ? true : false}
        />
      </Fragment>
    );
  });

  useEffect(() => {
    setEditableNotes(notes);
  }, [notes]);

  return (
    <Container maxWidth={false}>
      <Typography />
      <Container sx={{ bgcolor: "var(--task-container-color)" }} maxWidth={false} disableGutters>
        <AddANote title={"Add a note"} onClick={addANoteContainer} />
        {listNotes}
      </Container>
    </Container>
  );
}

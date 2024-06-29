import { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { NotesList, NotesContainer } from "./";
import { Header } from "../Common";
import API from "../../APIs/NotesAPI";

export default function Notes() {
  const [notesList, setNotesList] = useState();
  const [noteContents, setNoteContents] = useState();
  const [selectedNoteId, setSelectedNoteId] = useState();

  useEffect(() => {
    (async () => {
      const notesList = await API.getNotesList();
      if (notesList != null) {
        setNotesList(notesList);
        if (notesList.length > 0) setSelectedNoteId(notesList[0].id);
      }
    })();
  }, []);

  useEffect(() => {
    if (selectedNoteId != null) {
      (async () => {
        const noteContents = await API.getNoteContents(selectedNoteId);
        if (noteContents != null) setNoteContents(noteContents);
      })();
    }
  }, [selectedNoteId]);

  return (
    <>
      {notesList != null && (
        <>
          <NotesList
            notesList={notesList}
            setNotesList={setNotesList}
            selectedNoteId={selectedNoteId}
            setSelectedNoteId={setSelectedNoteId}
          />
          <Container className="appContainer" maxWidth={false}>
            {selectedNoteId != null && <Header title={notesList.find((x) => x.id == selectedNoteId).name} />}
            {noteContents != null && notesList.length != 0 && (
              <NotesContainer note_list_id={selectedNoteId} notes={noteContents} />
            )}
          </Container>
        </>
      )}
    </>
  );
}

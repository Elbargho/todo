import { Container, TextField } from "@mui/material";
import { useState } from "react";

export default function EditableNote({ text, onBlur, autoFocus = false }) {
  const [noteText, setNoteText] = useState(text);

  const noteOnChange = (event) => {
    setNoteText(event.target.value);
  };

  return (
    <Container maxWidth={false} className="NoteContainer" disableGutters>
      <TextField
        value={noteText}
        onChange={noteOnChange}
        onBlur={() => onBlur(noteText)}
        multiline
        autoFocus={autoFocus}
      />
    </Container>
  );
}

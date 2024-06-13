import { Container, TextField } from "@mui/material";
import { useState } from "react";

export default function EditableNote({ text, onBlur, autoFocus = false }) {
  const [noteText, setNoteText] = useState(text);

  const noteOnChange = (event) => {
    setNoteText(event.target.value);
  };

  const onKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      const newValue = noteText + '\t';
      setNoteText(newValue);
    }
  };

  return (
    <Container maxWidth={false} className="NoteContainer" disableGutters>
      <TextField
        value={noteText}
        onChange={noteOnChange}
        onBlur={() => onBlur(noteText)}
        multiline
        autoFocus={autoFocus}
        onKeyDown={onKeyDown}
      />
    </Container>
  );
}

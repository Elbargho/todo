import { Container, TextField } from "@mui/material";
import { useState } from "react";

export default function EditableNote({ text, onBlur, autoFocus = false }) {
  const [noteText, setNoteText] = useState(text);

  const noteOnChange = (event) => {
    setNoteText(event.target.value);
  };

  const onKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      const cursorPosition = event.target.selectionStart;
      const newValue = noteText.slice(0, cursorPosition) + "\t" + noteText.slice(cursorPosition);
      setNoteText(newValue);
      setTimeout(() => {
        event.target.selectionStart = cursorPosition + 1;
        event.target.selectionEnd = cursorPosition + 1;
      }, 0);
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

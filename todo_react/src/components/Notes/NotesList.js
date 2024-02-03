import { useState } from "react";
import { Box, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { EditableContent, ContextMenu } from "../Common";
import AddIcon from "@mui/icons-material/Add";
import API from "../../APIs/NotesAPI";

export default function NotesList({ notesList, setNotesList, selectedNoteId, setSelectedNoteId }) {
  const [noteInputId, setNoteInputId] = useState();

  const addNote = async (note_name) => {
    const data = await API.addNoteList(note_name);
    if (data != null) {
      setNotesList([{ id: data.id, name: note_name }, ...notesList]);
      setSelectedNoteId(data.id);
    }
  };

  const editNote = async (note_id, new_name) => {
    const data = await API.editNoteList(note_id, new_name);
    if (data != null)
      setNotesList(
        [{ id: note_id, name: new_name }, ...notesList.filter((note) => note_id != note.id)].sort((a, b) => b.id - a.id)
      );
  };

  const deleteNote = async (note_id) => {
    const data = await API.deleteNoteList(note_id);
    if (data.statusCode == 204) {
      const newNotesList = notesList.filter((note) => note.id != note_id);
      if (newNotesList.length == 0) setSelectedNoteId(null);
      else if (selectedNoteId == note_id) setSelectedNoteId(newNotesList[0].id);
      setNotesList(newNotesList);
    }
  };

  const { contextMenu, handleContextMenu } = ContextMenu({
    editItem: (note_id) => {
      setNoteInputId(note_id);
    },
    deleteItem: deleteNote,
  });

  const unMountNoteInput = () => {
    setNoteInputId(null);
  };

  const listItems = notesList.map((note) => (
    <ListItem
      key={note.id}
      onMouseUp={(event) => {
        if (event.button == 0) setSelectedNoteId(note.id);
      }}
      onContextMenu={(event) => handleContextMenu(event, note.id)}
      disablePadding
    >
      <ListItemButton selected={selectedNoteId == note.id}>
        <ListItemText>
          {noteInputId == note.id ? (
            <EditableContent
              value={note.name}
              onEnter={(name) => editNote(note.id, name)}
              unMountComponent={unMountNoteInput}
            />
          ) : (
            <div>{note.name}</div>
          )}
        </ListItemText>
      </ListItemButton>
    </ListItem>
  ));

  return (
    <Box className="LeftPane">
      <ListItem
        key={0}
        onMouseUp={() => {
          setNoteInputId(-1);
        }}
        disablePadding
      >
        <ListItemButton>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText color={"primary.dark"} primary={"New Note"} />
        </ListItemButton>
      </ListItem>
      {noteInputId == -1 && (
        <ListItem sx={{ height: "48px" }}>
          <EditableContent
            value={"Note"}
            onEnter={addNote}
            unMountComponent={unMountNoteInput}
            selectText={true}
            shouldValueChange={false}
          />
        </ListItem>
      )}
      {listItems}
      {contextMenu}
    </Box>
  );
}

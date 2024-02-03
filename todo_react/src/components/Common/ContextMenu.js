import { useState } from "react";
import { Menu, MenuItem, ListItemIcon, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function ContextMenu({ editItem, deleteItem }) {
  const [contextMenu, setContextMenu] = useState(null);
  const [rightClickedNoteId, setRightClickedNoteId] = useState(null);

  const handleClose = () => {
    setContextMenu(null);
  };

  const handleContextMenu = (event, note_id) => {
    event.preventDefault();
    setContextMenu({ mouseX: event.clientX - 2, mouseY: event.clientY - 4 });
    setRightClickedNoteId(note_id);
  };

  const handleItemClick = (func, ...arg) => {
    func(...arg);
    handleClose();
  };

  return {
    contextMenu: (
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={contextMenu !== null ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined}
        slotProps={{
          root: {
            onContextMenu: (e) => {
              e.preventDefault();
              handleClose();
            },
          },
        }}
      >
        <div>
          <MenuItem onClick={() => handleItemClick(editItem, rightClickedNoteId)}>
            <ListItemIcon>
              <EditIcon sx={{ color: "var(--hint-text-color)" }} fontSize="small" />
            </ListItemIcon>
            <Typography>Edit Item</Typography>
          </MenuItem>
          <MenuItem sx={{ color: "red" }} onClick={() => handleItemClick(deleteItem, rightClickedNoteId)}>
            <ListItemIcon>
              <DeleteOutlineIcon sx={{ color: "red" }} fontSize="small" />
            </ListItemIcon>
            Delete Item
          </MenuItem>
        </div>
      </Menu>
    ),
    handleContextMenu,
  };
}

import { useState } from "react";
import { Menu, MenuItem, ListItemIcon, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from '@mui/icons-material/Block';
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function ContextMenu({ editItem, disableToday, deleteItem }) {
  const [contextMenu, setContextMenu] = useState(null);
  const [rightClickedItemId, setrightClickedItemId] = useState(null);

  const handleClose = () => {
    setContextMenu(null);
  };

  const handleContextMenu = (event, note_id) => {
    event.preventDefault();
    setContextMenu({ mouseX: event.clientX - 2, mouseY: event.clientY - 4 });
    setrightClickedItemId(note_id);
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
          {editItem != null && (
            <MenuItem onClick={() => handleItemClick(editItem, rightClickedItemId)}>
              <ListItemIcon>
                <EditIcon sx={{ color: "var(--hint-text-color)" }} fontSize="small" />
              </ListItemIcon>
              <Typography>Edit Item</Typography>
            </MenuItem>
          )}
          {disableToday != null && (
            <MenuItem onClick={() => handleItemClick(disableToday, rightClickedItemId)}>
              <ListItemIcon>
                <BlockIcon sx={{ color: "var(--hint-text-color)" }} fontSize="small" />
              </ListItemIcon>
              <Typography>Disable Today</Typography>
            </MenuItem>
          )}
          {deleteItem != null && (
            <MenuItem sx={{ color: "red" }} onClick={() => handleItemClick(deleteItem, rightClickedItemId)}>
              <ListItemIcon>
                <DeleteOutlineIcon sx={{ color: "red" }} fontSize="small" />
              </ListItemIcon>
              Delete Item
            </MenuItem>
          )}
        </div>
      </Menu>
    ),
    handleContextMenu,
  };
}

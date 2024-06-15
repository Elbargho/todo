import { useState } from "react";
import { Menu, MenuItem, ListItemIcon, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from "@mui/icons-material/Block";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function ContextMenu({ editItem, removeFromMyDay, addToMyDay, disableToday, deleteItem }) {
  const [contextMenu, setContextMenu] = useState(null);
  const [rightClickedItemId, setrightClickedItemId] = useState(null);
  const [isInMyDay, setIsInMyDay] = useState(null);

  const handleClose = () => {
    setContextMenu(null);
  };

  const handleContextMenu = (event, note_id, isInMyDay) => {
    event.preventDefault();
    if (isInMyDay !== undefined) setIsInMyDay(isInMyDay);
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
          {removeFromMyDay != null && isInMyDay == true && (
            <MenuItem onClick={() => handleItemClick(removeFromMyDay, rightClickedItemId)}>
              <ListItemIcon>
                <RemoveCircleOutlineIcon sx={{ color: "var(--hint-text-color)" }} fontSize="small" />
              </ListItemIcon>
              <Typography>Remove From My Day</Typography>
            </MenuItem>
          )}
          {addToMyDay != null && isInMyDay == false && (
            <MenuItem onClick={() => handleItemClick(removeFromMyDay, rightClickedItemId)}>
              <ListItemIcon>
                <AddCircleOutlineIcon sx={{ color: "var(--hint-text-color)" }} fontSize="small" />
              </ListItemIcon>
              <Typography>Add To My Day</Typography>
            </MenuItem>
          )}
          {disableToday != null && (isInMyDay == null || isInMyDay == true) && (
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

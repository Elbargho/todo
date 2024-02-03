import { useState } from "react";
import { Box, ListItem, ListItemText, ListItemIcon, ListItemButton, Typography } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Divider, EditableContent, ContextMenu } from "../Common";
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ColorPicker from "./ColorPicker";

const colorPickerStyle = {
  display: "flex",
  marginTop: "1px",
  marginRight: "15px",
};

export default function CategoriesList({
  categories,
  newCategory,
  editCategory,
  updateCategoryStatus,
  deleteCategory,
}) {
  const [categoryAdderInputId, setCategoryAdderInputId] = useState(null);
  const [selectedColor, setSelectedColor] = useState("var(--tracker-color-grey)");
  const isCategorySelected = (category_id) => categoryAdderInputId === category_id;

  const decreaseCategoryStatus = (category_id, times_done) => {
    if (times_done != 0) updateCategoryStatus(category_id, -1);
  };

  const increaseCategoryStatus = (category_id) => {
    updateCategoryStatus(category_id, 1);
  };

  const { contextMenu, handleContextMenu } = ContextMenu({
    editItem: (category_id) => {
      setSelectedColor(categories[category_id].color);
      setCategoryAdderInputId(category_id);
    },
    deleteItem: (category_id) => {
      deleteCategory(category_id);
    },
  });

  const unMountAdderInput = () => {
    setSelectedColor("var(--tracker-color-grey)");
    setCategoryAdderInputId(null);
  };

  const listItems = Object.entries(categories).map(([category_id, category]) => (
    <ListItem key={category_id} sx={{ height: "48px" }} disableGutters>
      {isCategorySelected(category_id) ? (
        <EditableContent
          value={category.title}
          onEnter={async (e) => {
            await editCategory(category_id, e, selectedColor);
          }}
          unMountComponent={unMountAdderInput}
        >
          <ColorPicker
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            sx={{ paddingLeft: "16px", ...colorPickerStyle }}
          />
        </EditableContent>
      ) : (
        <ListItemButton onContextMenu={(event) => handleContextMenu(event, category_id)}>
          {category.color && (
            <FiberManualRecordIcon fontSize="small" sx={{ color: category.color, ...colorPickerStyle }} />
          )}
          <ListItemText primary={category.title} />
          <div style={{ display: "flex", alignItems: "center" }}>
            <RemoveCircleIcon
              sx={{ fontSize: "1rem", color: "var(--hint-text-color)" }}
              onClick={() => decreaseCategoryStatus(category_id, category.times_done)}
            />
            <Typography sx={{ padding: "0px 5px" }}>{category.times_done}</Typography>
            <AddCircleIcon
              sx={{ fontSize: "1rem", color: "var(--hint-text-color)" }}
              onClick={() => increaseCategoryStatus(category_id)}
            />
          </div>
        </ListItemButton>
      )}
    </ListItem>
  ));

  return (
    <Box className="LeftPane">
      <ListItem
        key={0}
        onMouseUp={() => {
          setCategoryAdderInputId(0);
        }}
        disablePadding
      >
        <ListItemButton>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText color={"primary.dark"} primary={"New List"} />
        </ListItemButton>
      </ListItem>
      <Divider />
      {listItems}
      {contextMenu}
      {isCategorySelected(0) && (
        <ListItem sx={{ height: "48px" }}>
          <EditableContent
            value={""}
            onEnter={async (title) => await newCategory(title, selectedColor)}
            unMountComponent={unMountAdderInput}
          >
            <ColorPicker selectedColor={selectedColor} setSelectedColor={setSelectedColor} sx={colorPickerStyle} />
          </EditableContent>
        </ListItem>
      )}
    </Box>
  );
}

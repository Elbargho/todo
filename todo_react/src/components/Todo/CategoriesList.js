import { useState } from "react";
import { Box, Container, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import WorkIcon from "@mui/icons-material/Work";
import AddIcon from "@mui/icons-material/Add";
import ChecklistIcon from "@mui/icons-material/Checklist";
import { EditableContent, ContextMenu } from "../Common";
import API from "../../APIs/TasksAPI";

export default function CategoriesList({ categories, setCategories, selectedCategoryId, setSelectedCategoryId }) {
  const [categoryInputId, setCategoryInputId] = useState();

  const addCategory = async (name) => {
    const data = await API.addCategory(name);
    if (data != null) {
      setCategories([...categories, data]);
      setSelectedCategoryId(data.id);
    }
  };

  const editCategory = async (category_id, new_name) => {
    const data = await API.editCategory(category_id, new_name);
    if (data != null) {
      const new_categories = [...categories];
      new_categories.find((cat) => cat.id == category_id).name = new_name;
      setCategories(new_categories);
    }
  };

  const deleteCategory = async (category_id) => {
    const res = await API.deleteCategory(category_id);
    if (res.statusCode == 204) {
      const new_categories = [...categories];
      const idx = categories.findIndex((cat) => cat.id == category_id);
      new_categories.splice(idx, 1);
      if (selectedCategoryId == category_id) setSelectedCategoryId(1);
      setCategories(new_categories);
    }
  };

  const { contextMenu, handleContextMenu } = ContextMenu({
    editItem: (category_id) => {
      setCategoryInputId(category_id);
    },
    deleteItem: deleteCategory,
  });

  const unMountCategoryInput = () => {
    setCategoryInputId(null);
  };

  const listItems = categories.map((category) => (
    <ListItem key={category.id} disablePadding>
      {categoryInputId == category.id ? (
        <Container maxWidth={false} sx={{ display: "flex", alignItems: "center", padding: "8px 16px" }} disableGutters>
          <ListItemIcon>
            <ChecklistIcon />
          </ListItemIcon>
          <ListItemText>
            <EditableContent
              value={category.name}
              onEnter={(name) => editCategory(category.id, name)}
              unMountComponent={unMountCategoryInput}
            />
          </ListItemText>
        </Container>
      ) : (
        <ListItemButton
          onMouseUp={(event) => {
            if (event.button == 0) setSelectedCategoryId(category.id);
          }}
          onContextMenu={(event) => {
            if (category.id > 2) handleContextMenu(event, category.id);
            else event.preventDefault();
          }}
          selected={selectedCategoryId == category.id}
        >
          <ListItemIcon>
            {category.id == 1 && <LightModeIcon />}
            {category.id == 2 && <WorkIcon />}
            {category.id > 2 && <ChecklistIcon />}
          </ListItemIcon>
          <ListItemText>
            <div>{category.name}</div>
          </ListItemText>
        </ListItemButton>
      )}
    </ListItem>
  ));

  return (
    <Box className="LeftPane">
      <ListItem
        key={0}
        onMouseUp={() => {
          setCategoryInputId(-1);
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
      {listItems}
      {categoryInputId == -1 && (
        <ListItem sx={{ height: "48px" }}>
          <EditableContent
            value={"Note"}
            onEnter={addCategory}
            unMountComponent={unMountCategoryInput}
            selectText={true}
            shouldValueChange={false}
          >
            <ListItemIcon>
              <ChecklistIcon />
            </ListItemIcon>
          </EditableContent>
        </ListItem>
      )}
      {contextMenu}
    </Box>
  );
}

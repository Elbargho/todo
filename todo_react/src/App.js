import { Container } from "@mui/material";
import ToDoList from "./components/Todo/App";
import { ApplicationMenu, PopUp } from "./components/Common";
import Tracker from "./components/Tracker/App";
import Notes from "./components/Notes/App";
import { useState } from "react";
import ChecklistIcon from "@mui/icons-material/Checklist";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EditNoteIcon from "@mui/icons-material/EditNote";

export default function App() {
  const [selectedApp, setSelectedApp] = useState(<ToDoList />);

  return (
    <Container sx={{ display: "flex", position: "relative", height: "100vh" }} maxWidth={false} disableGutters>
      <PopUp />
      {selectedApp}
      <ApplicationMenu
        appsList={[
          { name: "To Do", component: <ToDoList />, icon: ChecklistIcon },
          { name: "Tracker", component: <Tracker />, icon: CalendarMonthIcon },
          { name: "Notes", component: <Notes />, icon: EditNoteIcon },
        ]}
        setSelectedApp={setSelectedApp}
      />
    </Container>
  );
}

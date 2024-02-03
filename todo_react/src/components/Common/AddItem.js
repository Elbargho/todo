import * as React from "react";
import { Container, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function AddItem({ onClick, title }) {
  return (
    <Container
      maxWidth={false}
      className="TaskContainer"
      sx={{ paddingRight: "0" }}
      onClick={onClick}
      disableGutters
    >
      <div style={{ display: "contents" }}>
        <AddIcon sx={{ padding: "6px", color: "primary.dark" }} />
        <Typography sx={{ paddingLeft: "7px", paddingRight: "10px", color: "var(--highlight-color)" }}>
          {title}
        </Typography>
      </div>
    </Container>
  );
}

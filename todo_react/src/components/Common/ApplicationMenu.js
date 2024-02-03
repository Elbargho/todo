import { Box, Container, Typography } from "@mui/material";
import { useState } from "react";

export default function ApplicationMenu({ appsList, setSelectedApp }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <Container sx={{ display: "flex", position: "absolute", bottom: 0, width: 300 }} maxWidth={false} disableGutters>
      {appsList.map((app, i) => {
        return (
          <Box
            key={i}
            sx={{
              width: "100%",
              height: 30,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              bgcolor: i == selectedIndex ? "var(--highlight-color)" : "var(--text-color)",
              "&:hover": {
                filter: i == selectedIndex ? null : "brightness(75%)",
              },
            }}
            onClick={() => {
              setSelectedIndex(i);
              setSelectedApp(app.component);
            }}
          >
            {<app.icon sx={{ color: i == selectedIndex ? null : "black", paddingRight: "8px", fontSize: "1.2rem" }} />}
            <Typography fontSize={".85rem"} sx={{ color: i == selectedIndex ? null : "black" }}>
              {app.name}
            </Typography>
          </Box>
        );
      })}
    </Container>
  );
}

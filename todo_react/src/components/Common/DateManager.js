import * as React from "react";
import { Container, IconButton, Typography } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const iconStyle = {
  bgcolor: "var(--highlight-color)",
  height: "35px",
  padding: "0px 5px",
};

export default function DateManager({ date, nextOnClick, prevOnClick }) {
  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        marginRight: "23px",
        marginTop: "5px",
        boxShadow: "inset 0 0 0 1px var(--highlight-color)",
        height: "35px",
        width: "fit-content",
        borderRadius: "4px",
      }}
      maxWidth={false}
      disableGutters
    >
      <Typography sx={{ minWidth: "140px", display: "flex", justifyContent: "center" }}>{date}</Typography>
      <IconButton onClick={prevOnClick}>
        <KeyboardArrowLeftIcon sx={iconStyle} />
      </IconButton>
      <IconButton onClick={nextOnClick}>
        <KeyboardArrowRightIcon sx={{ ...iconStyle, borderRadius: "0px 4px 4px 0px" }} />
      </IconButton>
    </Container>
  );
}

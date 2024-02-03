import { Container } from "@mui/material";
import * as React from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

export default function CalendarCell({ date, listsDetails, setSelectedDate }) {
  const cellOnClick = () => {
    setSelectedDate(date);
  };

  return (
    <Container
      maxWidth={false}
      sx={{ width: "100%", height: "100%", cursor: "pointer" }}
      onClick={cellOnClick}
      disableGutters
    >
      <div style={{ textAlign: "right" }}>{date.split("-")[2]}</div>
      <Container
        maxWidth={false}
        sx={{ display: "flex", flexWrap: "wrap", gap: "5px 10px", padding: "5px 10px", overflow: "auto" }}
        disableGutters
      >
        {listsDetails.map((listDetail, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", marginRight: "10px" }}>
            <FiberManualRecordIcon sx={{ fontSize: "0.9rem", marginRight: "10px", color: `${listDetail.color}` }} />
            <div>{listDetail.times_done}</div>
          </div>
        ))}
      </Container>
    </Container>
  );
}

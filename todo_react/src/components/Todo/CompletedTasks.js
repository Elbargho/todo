import { useState, useEffect } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function CompletedTasks({ children }) {
  const [expanded, setExpanded] = useState(children.length > 0);

  const accordionOnChange = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    setExpanded(children.length > 0);
  }, [children]);

  return (
    <div className="CompletedTasks" style={{ position: "relative", marginTop: "25px" }}>
      <Accordion
        sx={{ bgcolor: "#1D1D1D", margin: "0px !important", boxShadow: "none" }}
        disabled={children.length == 0}
        expanded={expanded}
        onChange={accordionOnChange}
        square
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          sx={{ paddingLeft: "13px", paddingRight: "11px", flexDirection: "row-reverse", minHeight: "auto !important" }}
        >
          <Typography sx={{ paddingLeft: "12px" }}>Completed</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: "10px 0px 5px" }}>{children}</AccordionDetails>
      </Accordion>
      <div
        style={{
          width: "CALC(100% - 150px)",
          height: "48px",
          position: "absolute",
          top: "0",
          right: "0",
          backgroundColor: "#161A1F",
        }}
      ></div>
    </div>
  );
}

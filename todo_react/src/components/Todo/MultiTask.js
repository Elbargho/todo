import { Accordion, AccordionDetails, AccordionSummary, Container, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import LoopIcon from "@mui/icons-material/Loop";
import { CheckBox } from ".";
import { useState } from "react";

export default function MultiTask({
  id,
  title,
  is_done,
  repeat,
  times_done,
  sub_tasks,
  updateTaskStatus,
  onContextMenu,
}) {
  const [expanded, setExpanded] = useState(false);

  const subTasksContainers = [];
  let sub_task;

  Object.keys(sub_tasks).forEach((sub_task_id) => {
    sub_task = sub_tasks[sub_task_id];
    subTasksContainers.push(
      <div key={sub_task_id} style={{ display: "flex", alignItems: "center" }}>
        <CheckBox
          is_done={sub_task.is_done}
          task_id={id}
          sub_task_id={sub_task_id}
          updateTaskStatus={updateTaskStatus}
        />
        <Typography
          sx={{
            paddingLeft: "7px",
            paddingRight: "10px",
            textDecorationThickness: "1px !important",
            textDecoration: sub_task.is_done == 1 ? "line-through" : "none",
          }}
        >
          {sub_task.title}
        </Typography>
      </div>
    );
  });

  const onAccordionClick = (e) => {
    onContextMenu(e);
  };

  const onExpandeMoreIconClick = (e) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  return (
    <Accordion
      sx={{ bgcolor: "#1D1D1D", margin: "0px !important", boxShadow: "none", cursor: "pointer" }}
      onContextMenu={onContextMenu}
      onClick={onAccordionClick}
      expanded={expanded}
      square
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon onClick={onExpandeMoreIconClick} />}
        sx={{ minHeight: "60px !important", paddingLeft: "7px" }}
      >
        <CheckBox is_done={is_done} task_id={id} updateTaskStatus={updateTaskStatus} />
        <Container
          sx={{ width: "fit-content", marginLeft: "0px", paddingLeft: "7px", paddingRight: "10px" }}
          disableGutters
        >
          <Typography
            sx={{
              marginBottom: "-5px",
              textDecorationThickness: "1px !important",
              textDecoration: is_done == 1 ? "line-through" : "none",
            }}
          >
            {title}
          </Typography>
          <Typography variant="caption" style={{ display: "inline-flex", alignItems: "center" }}>
            {Object.values(sub_tasks).filter((x) => x.is_done == 1).length} of {Object.values(sub_tasks).length}
            {repeat != "" && (
              <>
                <FiberManualRecordIcon
                  sx={{ color: "#2F2F2F", fontSize: "9px", margin: "0px 10px" }}
                ></FiberManualRecordIcon>
                <LoopIcon
                  sx={{ color: "success.main", fontSize: "14px", margin: "0px 2px 0px -2px" }}
                  fontSize="inherit"
                />
                <Typography variant="caption" sx={{ color: "success.main" }}>
                  {repeat}
                </Typography>
              </>
            )}
          </Typography>
        </Container>
        {times_done != null && (
          <Typography sx={{ marginRight: "15px", color: "success.main" }}>{times_done} Done</Typography>
        )}
      </AccordionSummary>
      <AccordionDetails sx={{ paddingLeft: "38px", paddingRight: "55px" }}>{subTasksContainers}</AccordionDetails>
    </Accordion>
  );
}

import { Container, Typography } from "@mui/material";
import LoopIcon from "@mui/icons-material/Loop";
import { CheckBox } from ".";

export default function OneTask({ id, title, is_done, repeat, times_done, updateTaskStatus, onContextMenu }) {
  return (
    <Container maxWidth={false} className="TaskContainer" onClick={onContextMenu} onContextMenu={onContextMenu} disableGutters>
      <CheckBox is_done={is_done} task_id={id} updateTaskStatus={updateTaskStatus} />
      <Container
        sx={{ width: "fit-content", marginLeft: "0px", paddingLeft: "7px", paddingRight: "10px" }}
        disableGutters
      >
        <Typography
          sx={{
            marginBottom: repeat != "" ? "-2px" : "0px",
            textDecorationThickness: "1px !important",
            textDecoration: is_done == 1 ? "line-through" : "none",
          }}
        >
          {title}
        </Typography>
        {repeat != "" && (
          <Typography variant="caption" style={{ display: "inline-flex", alignItems: "center" }}>
            <LoopIcon sx={{ color: "success.main", fontSize: "14px", margin: "0px 2px 0px -2px" }} fontSize="inherit" />
            <Typography variant="caption" sx={{ color: "success.main" }}>
              {repeat}
            </Typography>
          </Typography>
        )}
      </Container>
      {times_done != null && <Typography sx={{ color: "success.main" }}>{times_done} Done</Typography>}
    </Container>
  );
}

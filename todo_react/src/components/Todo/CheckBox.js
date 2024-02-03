import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function CheckBox({ is_done, task_id, sub_task_id = null, updateTaskStatus }) {
  const checkBoxOnClick = (event) => {
    event.stopPropagation();
    if (task_id != null) updateTaskStatus(task_id, sub_task_id);
  };

  return (
    <div style={{ padding: "8px", cursor: "pointer", display: "flex" }} onClick={checkBoxOnClick}>
      {is_done == 0 && <PanoramaFishEyeIcon fontSize="small" />}
      {is_done == 0.5 && <CheckCircleOutlineIcon fontSize="small" />}
      {is_done == 1 && <CheckCircleIcon fontSize="small" />}
    </div>
  );
}

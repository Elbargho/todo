import { useState } from "react";
import { Menu, MenuItem, ListItemIcon } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const colors = [
  ["red", "green", "orange", "yellow"],
  ["purple", "brown", "pink", "grey"],
].map((lst) => lst.map((color) => `var(--tracker-color-${color})`));

const ColorPicker = ({ selectedColor, setSelectedColor, sx }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleColorSelection = (event, color) => {
    event.stopPropagation();
    setSelectedColor(color);
    setAnchorEl(null);
  };

  return (
    <div style={{ cursor: "pointer", ...sx }}>
      <FiberManualRecordIcon fontSize="small" sx={{ color: selectedColor }} onClick={handleClick} />
      <Menu className="ColorsMenu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onMouseDown={handleClose}>
        {colors.map((rowColors, index) => (
          <MenuItem sx={{ padding: 0 }} key={index} onMouseDown={handleClose}>
            {rowColors.map((color, colorIndex) => (
              <ListItemIcon
                key={colorIndex}
                sx={{ width: "35px", height: "35px", justifyContent: "center", alignItems: "center" }}
                onMouseDown={(event) => handleColorSelection(event, color)}
              >
                <FiberManualRecordIcon sx={{ color: color }} />
              </ListItemIcon>
            ))}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default ColorPicker;

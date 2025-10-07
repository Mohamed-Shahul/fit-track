import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState } from "react";

const ToggleView = () => {
  const [alignment, setAlignment] = useState("left");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      size="small"
      onChange={handleAlignment}
      aria-label="text alignment"
      sx={{
        backgroundColor: "black", // your background
        "& .MuiToggleButton-root": {
          color: "white", // icon/text color
          borderColor: "rgba(255, 255, 255, 0.3)", // light border
          "&.Mui-selected": {
            color: "black",
            backgroundColor: "white", // highlight selected
          },
          "&:hover": {
            // backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
        },
      }}
    >
      <ToggleButton value="left" aria-label="left aligned">
        <AddCircleOutlineIcon fontSize="small" />
      </ToggleButton>
      <ToggleButton value="center" fontSize="small">
        <EditRoundedIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ToggleView;

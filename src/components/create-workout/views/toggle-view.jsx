import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState } from "react";
import { Box, Typography } from "@mui/material";

const ToggleView = (props) => {
  const [mode, setMode] = useState("create");

  const handleToggleOnChange = (event, newMode) => {
    newMode&&setMode(newMode);
  };
  return (
    <Box display="flex" alignItems="center" gap={1}>
      <ToggleButtonGroup
        value={mode}
        exclusive
        size="small"
        onChange={handleToggleOnChange}
        sx={{
          "& .MuiToggleButton-root": {
            color: "#2392eb", // icon/text color
            borderColor: "rgba(255, 255, 255, 0.3)", // light border
            "&.Mui-selected": {
              color: "white",
              backgroundColor: "#2392eb", // highlight selected
            },
            padding: 0.5,
            "&:hover": {
              // backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          },
        }}
      >
        <ToggleButton value="create">
          <AddCircleOutlineIcon fontSize="small" />
        </ToggleButton>
        <ToggleButton value="edit">
          <EditRoundedIcon fontSize="small" />
        </ToggleButton>
      </ToggleButtonGroup>
      <Typography
        fontWeight="bold"
        sx={{
          fontFamily: "Poppins, sans-serif",
          color:'#2392eb'
        }}
        children={`${mode?.slice(0,1)?.toUpperCase()}${mode?.slice(1,mode?.length)}`}
      />
    </Box>
  );
};

export default ToggleView;

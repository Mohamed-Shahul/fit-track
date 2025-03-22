import {
  Autocomplete,
  Box,
  Button,
  Grid2,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
} from "@mui/material";
import React from "react";
import useCreateWorkout from "./useCreateWorkout";
import useCustomHook from "../custom-hook/useCustomHook";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import createBgImg from "../../images/createBg.png";
import gymBg from "../../images/dumbellsBg.jpg";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

const CreateWorkoutPlan = () => {
  const { commonTextFieldStyles } = useCustomHook();
  const viewModel = useCreateWorkout();
  const {
    weekHeaders,
    workouts,
    structure,
    days,
    workoutList,
    handleAddWorkout,
  } = viewModel;

  const tableView = (props) => {
    const selectedDay = props?.Monday;
    const selectedWorkout = selectedDay?.pushups;
    const otherDetails = selectedWorkout?.otherDetails;
    const weightsObj = selectedWorkout?.weights;
    const weightsKeys = weightsObj ? Object.keys(weightsObj) : [];
    const repsObj = selectedWorkout?.reps;
    const repsKeys = repsObj ? Object.keys(repsObj) : [];
    console.log("==day", selectedWorkout, weightsObj);

    return (
      <Box
        sx={{
          background: "#4C4B4B",
          color: "white",
          borderRadius: 2,
          padding: { xs: "20px 20px", md: "30px 50px" },
          display: "flex",
          flexDirection: "column",
          gap: 2,
          minHeight: "350px",
          maxHeight: "350px",
          overflow: "auto",
          overflowX: "hidden",
        }}
      >
        {workoutList?.map((row) => (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <TextField
              variant="outlined"
              sx={{
                bordre: "none",
                borderRadius: 2,
                bgcolor: "#6C6C6C",
                width: "100%",
                "& .MuiInputBase-input::placeholder": {
                  color: "white",
                },
              }}
              placeholder="Enter your workout name..."
            />
            <IconButton
              children={
                <DeleteOutlineRoundedIcon fontSize="large" color="error" />
              }
            />
          </Box>
        ))}
      </Box>
    );
  };
  return (
    <Box
      sx={{
        height: "100vh",
        // backgroundImage: `url(${gymBg})`,
        // backgroundSize: "cover", // Ensures the image covers the whole area
        // backgroundPosition: "center", // Centers the image}}
      }}
    >
      <Grid2 container>
        <Grid2
          size={{ xs: 12 }}
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            padding: "10px 20px 10px 0px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              textAlign: "right",
              display: "flex",
              justifyContent: "right",
              gap: 1,
            }}
          >
            <Button
              color="error"
              variant="outlined"
              sx={{ borderRadius: 2, textTransform: "none" }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#00C853",
                borderRadius: 2,
                textTransform: "none",
              }}
              startIcon={<SaveRoundedIcon />}
            >
              Save
            </Button>
          </Box>
        </Grid2>

        <Grid2 size={{ xs: 12 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 1,
              alignItems: "center",
              padding: { xs: "10px 20px", md: "10px 50px" },
            }}
          >
            <TextField
              required
              variant="outlined"
              type="text"
              label="Split Name"
              sx={{
                width: { xs: "100%", md: "40%" },
                bgcolor: "#D9D9D9",
                borderRadius: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "Black",
                  fontWeight: "bold",
                },
              }}
              size="small"
              InputLabelProps={{ shrink: true }}
            />

            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: { xs: "center", md: "space-between" },
                gap: 1,
              }}
            >
              <Autocomplete
                disablePortal
                options={days}
                sx={{
                  width: { xs: "60%", md: "40%" },
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select a Day"
                    size="small"
                    required
                  />
                )}
                disableClearable
              />
              <Button
                variant="contained"
                sx={{ width: { xs: "40%", md: "20%" }, textTransform: "none" }}
                onClick={() => handleAddWorkout()}
              >
                Add Workout
              </Button>
            </Box>
          </Box>
        </Grid2>

        <Grid2
          size={{ xs: 12 }}
          sx={{
            padding: { xs: "5px 20px", md: "5px 50px" },
          }}
        >
          {tableView(structure)}
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default CreateWorkoutPlan;

import {
  Autocomplete,
  Box,
  Button,
  Grid2,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import useCreateWorkout from "./useCreateWorkout";
import useCustomHook from "../custom-hook/useCustomHook";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import AppBarView from "../app-bar/app-bar-view";

const CreateWorkoutPlan = () => {
  const { entryTextFieldsStyles, cloudBgImg, scrollBarStyle } = useCustomHook();
  const viewModel = useCreateWorkout();
  const {
    structure,
    days,
    workoutList,
    handleAddWorkout,
    handleRemoveWorkout,
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
          background: "#444451",
          color: "white",
          borderRadius: 2,
          padding: { xs: "20px 20px", md: "30px 50px" },
          display: "flex",
          flexDirection: "column",
          gap: 2,
          minHeight: "300px",
          maxHeight: "300px",
          overflow: "auto",
          overflowX: "hidden",
          ...scrollBarStyle,
        }}
      >
        {workoutList?.length ? (
          workoutList?.map((row, i) => (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <TextField
                variant="outlined"
                sx={{
                  border: "none",
                  borderRadius: 2,
                  width: "100%",
                  ...entryTextFieldsStyles,
                  borderColor: "white",
                  "& .MuiInputBase-input": {
                    color: "white",
                    fontFamily: "Poppins, sans-serif",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "white" },
                    "&:hover fieldset": { borderColor: "gray" },
                    "&.Mui-focused fieldset": { borderColor: "gray" },
                  },
                }}
                placeholder="Enter your workout name..."
              />
              <IconButton
                children={
                  <DeleteOutlineRoundedIcon fontSize="large" color="error" />
                }
                onClick={() => handleRemoveWorkout(i)}
              />
            </Box>
          ))
        ) : (
          <Box
            sx={{
              maxWidth: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            {" "}
            "No workouts found!"
          </Box>
        )}
      </Box>
    );
  };
  return (
    <Box
      sx={{
        height: "100vh",
        ...cloudBgImg,
      }}
    >
      <Grid2 container gap={2}>
        <Grid2
          size={{ xs: 12 }}
          height={{ xs: "5%", md: "10%" }}
          padding={{ xs: 0.5, md: 1 }}
          sx={{
            borderBottom: 1,
            borderBottomColor: "gray",
            position: "sticky",
            top: 0,
            ...cloudBgImg,
          }}
        >
          <AppBarView />
        </Grid2>

        <Grid2 size={{ xs: 12 }}>
          <Box
            sx={{
              borderColor: "white",
              maxWidth: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1,
              padding: { xs: "10px 20px", md: "10px 55px" },
            }}
          >
            <Typography
              children="Create Workout plan"
              sx={{
                fontSize: { md: 24 },
                color: "white",
                fontFamily: "Poppins, sans-serif",
                fontWeight: 600,
              }}
            />
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  borderColor: "#1565c0",
                  textTransform: "none",
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#1565c0",
                  borderRadius: 2,
                  textTransform: "none",
                }}
                startIcon={<SaveRoundedIcon />}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Grid2>

        <Grid2 size={{ xs: 12 }}>
          <Box
            sx={{
              maxWidth: "100%",
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
              autoComplete="off"
              placeholder="Split name"
              sx={{
                width: { xs: "100%", md: "40%" },
                color: "white",
                bgcolor: "#444451",
                borderRadius: 1,
                "& .MuiInputBase-input": {
                  color: "white",
                  fontFamily: "Poppins, sans-serif",
                },
                ...entryTextFieldsStyles,
              }}
              size="small"
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
                  color: "white",
                  bgcolor: "#444451",
                  borderRadius: 1,
                  "& .MuiInputBase-input": {
                    color: "white",
                    fontFamily: "Poppins, sans-serif",
                  },
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder="Select a day"
                    size="small"
                    required
                    sx={{ ...entryTextFieldsStyles }}
                  />
                )}
                disableClearable
              />
              <Button
                variant="contained"
                sx={{
                  width: { xs: "40%", md: "20%" },
                  textTransform: "none",
                  fontFamily: "Poppins, sans-serif",
                }}
                onClick={() => handleAddWorkout()}
              >
                Add Workout
              </Button>
            </Box>
          </Box>
        </Grid2>

        <Grid2 size={{ xs: 12 }}>
          <Box
            sx={{
              maxWidth: "100%",
              padding: { xs: "5px 20px", md: "5px 50px" },
            }}
          >
            {tableView(structure)}
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default CreateWorkoutPlan;

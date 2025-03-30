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
  const { entryTextFieldsStyles, scrollBarStyle } = useCustomHook();
  const viewModel = useCreateWorkout();
  const {
    structure,
    days,
    workoutList,
    handleAddWorkout,
    handleRemoveWorkout,
    navigate,
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
          py: 1,
          px: 2,
          color: "white",
          borderRadius: 1,
          display: "flex",
          flexDirection: "column",
          // rowGap:1,
          gap: 1,
          height: "100%",
          maxHeight: "100%",
          // minHeight: "300px",
          // maxHeight: "300px",
          overflow: "auto",
          overflowX: "hidden",
          ...scrollBarStyle,
        }}
      >
        {workoutList?.length ? (
          workoutList?.map((row, i) => (
            <Box
              sx={{
                // border:1,
                // borderColor:'white',
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <TextField
                type="text"
                variant="outlined"
                autoComplete="off"
                size="small"
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
                    "& fieldset": { borderColor: "#444451" },
                    "&:hover fieldset": { borderColor: "gray" },
                    "&.Mui-focused fieldset": { borderColor: "gray" },
                  },
                  background: "#444451",
                }}
                placeholder="Enter your workout name..."
                slotProps={{
                  input: {
                    endAdornment: (
                      <IconButton
                        children={
                          <DeleteOutlineRoundedIcon
                            fontSize="large"
                            color="error"
                            sx={{ color: "red !important" }}
                          />
                        }
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveWorkout(i);
                        }}
                      />
                    ),
                  },
                }}
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
    <Grid2 container height="100vh" overflow="hidden" rowGap={1}>
      <Grid2
        size={{ xs: 12 }}
        height="7%"
        sx={{
          position: "sticky",
          top: 0,
          borderBottom: 1,
          borderBottomColor: "gray",
          px: 2,
        }}
      >
        <AppBarView />
      </Grid2>

      <Grid2
        // border={1} borderColor="white"
        size={{ xs: 12 }}
        height="7%"
        alignContent="center"
      >
        <Box
          sx={{
            borderColor: "white",
            maxWidth: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            // gap: 1,
            // padding: {xs: "10px 20px", md: "10px 55px"},
            px: 4,
            //  py:2
          }}
        >
          <Typography
            children="Create Workout plan"
            sx={{
              fontSize: { xs: 15, md: 24 },
              color: "white",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
            }}
          />
          <Box sx={{ display: "flex", gap: { xs: 1, md: 2 } }}>
            <Button
              variant="outlined"
              size="small"
              sx={{
                borderRadius: 1,
                borderColor: "#1565c0",
                color: "white",
                textTransform: "none",
              }}
              onClick={() => navigate("/home")}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{
                bgcolor: "#1565c0",
                borderRadius: 1,
                
                textTransform: "none",
              }}
              startIcon={<SaveRoundedIcon />}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Grid2>

      <Grid2
        // border={1} borderColor="white"
        size={{ xs: 12 }}
        alignContent="center"
        height={{ xs: "10%", md: "7%" }}
      >
        <Box
          sx={{
            maxWidth: "100%",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 1,
            alignItems: "center",
            // padding: {xs: "10px 20px", md: "10px 50px"},
            px: 4,
            // py:2
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
            value
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

      <Grid2
        size={{ xs: 12 }}
        // border={1} borderColor="white"
        height={{ xs: "76%", md: "79%" }}
      >
        <Box
          sx={{
            maxWidth: "100%",
            maxHeight: "100%",
            // padding: {xs: "5px 20px", md: "5px 50px"},
            overflow: "auto",
            overflowX: "hidden",
            px: 2,
            py: 2,
            ...scrollBarStyle,
          }}
        >
          {tableView(structure)}
        </Box>
      </Grid2>
    </Grid2>
    // </Box>
  );
};

export default CreateWorkoutPlan;

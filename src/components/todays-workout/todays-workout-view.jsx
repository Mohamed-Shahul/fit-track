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
import useCustomHook from "../custom-hook/useCustomHook";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import createBgImg from "../../images/createBg.png";
import gymBg from "../../images/dumbellsBg.jpg";
import useTodaysWokout from "./useTodayWorkout";

const TodaysWorkoutPlan = () => {
  const { commonTextFieldStyles } = useCustomHook();
  const viewModel = useTodaysWokout();
  const { weekHeaders, workouts, structure, days } = viewModel;

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
        }}
      >
        <Box
          sx={{
            width: "100%",
            border: 1,
            borderColor: "white",
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              bgcolor: "#00C853",
              width: "100%",
              borderTopRightRadius: 5,
              borderTopLeftRadius: 5,
            }}
          >
            <Box
              sx={{
                width: "20%",
                textAlign: "center",
                p: 2,
                fontWeight: "bold",
              }}
            >
              Sets
            </Box>
            {Array(4)
              .fill("")
              ?.map((key, i, arr) => (
                <Box
                  sx={{
                    width: "20%",
                    borderLeft: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {i + 1}
                </Box>
              ))}
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              bgcolor: "#4C4B4B",
              width: "100%",
            }}
          >
            <Box
              sx={{
                width: "20%",
                borderBottom: 1,
                textAlign: "center",
                p: 2,
                fontWeight: "bold",
              }}
            >
              Reps
            </Box>
            {repsKeys?.map((key, i) => (
              <Box
                sx={{
                  width: "20%",
                  borderLeft: 1,
                  borderBottom: 1,
                }}
              >
                {/* {repsObj?.[key]} */}
                <TextField
                  type="number"
                  autoComplete="off"
                  variant="outlined"
                  sx={{
                    width: "100%",
                    ...commonTextFieldStyles,
                  }}
                />
              </Box>
            ))}
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              bgcolor: "#4C4B4B",
              width: "100%",
              borderBottomRightRadius: 5,
              borderBottomLeftRadius: 5,
            }}
          >
            <Box
              sx={{
                width: "20%",
                textAlign: "center",
                p: 2,
                fontWeight: "bold",
              }}
            >
              Kg
            </Box>
            {weightsKeys?.map((key, i) => (
              <Box
                sx={{
                  width: "20%",
                  borderLeft: 1,
                }}
              >
                {/* {weightsObj?.[key]} */}
                <TextField
                  autoComplete="off"
                  variant="outlined"
                  type="number"
                  sx={{
                    width: "100%",
                    color: "white",

                    ...commonTextFieldStyles,
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>

        <Box>
          <TextField
            variant="outlined"
            multiline
            minRows={2}
            sx={{
              bordre: "none",
              borderRadius: 2,
              bgcolor: "#6C6C6C",
              width: "100%",
              "& .MuiInputBase-input::placeholder": {
                color: "white",
              },
            }}
            placeholder="Take a notes..."
          />
        </Box>
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
                width: "40%",
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

            <Autocomplete
              disablePortal
              options={days}
              sx={{
                width: "40%",
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
              sx={{ width: "20%", textTransform: "none" }}
            >
              Add Workout
            </Button>
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

export default TodaysWorkoutPlan;

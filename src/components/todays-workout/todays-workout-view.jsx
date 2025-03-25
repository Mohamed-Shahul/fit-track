import {
  Autocomplete,
  Box,
  Button,
  Grid2,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import useCustomHook from "../custom-hook/useCustomHook";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import createBgImg from "../../images/createBg.png";
import gymBg from "../../images/dumbellsBg.jpg";
import useTodaysWokout from "./useTodayWorkout";
import AppBarView from "../app-bar/app-bar-view";
import BackupRoundedIcon from "@mui/icons-material/BackupRounded";

const TodaysWorkoutPlan = () => {
  const {
    commonTextFieldStyles,
    cloudBgImg,
    entryTextFieldsStyles,
    scrollBarStyle,
  } = useCustomHook();
  const viewModel = useTodaysWokout();
  const {weekHeaders, workouts, structure, days, navigate} = viewModel;

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
          color: "white",
          borderRadius: 2,
          // padding: { xs: "20px 20px", md: "30px 50px" },
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box
          sx={{
            maxWidth: "100%",
            // border: 1,
            borderColor: "white",
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              bgcolor: "#1976d2",
              maxWidth: "100%",
              border: 1,
              borderColor: "white",
              borderTopRightRadius: 5,
              borderTopLeftRadius: 5,
            }}
          >
            <Box
              sx={{
                width: "20%",
                textAlign: "center",
                p: 2,
                fontWeight: 600,
                fontFamily: "Poppins, sans-serif",
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
                    fontWeight: 600,
                    fontFamily: "Poppins, sans-serif",
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
              maxWidth: "100%",
              borderLeft: 1,
              borderRight: 1,
              borderBottom: 1,
              borderColor: "white",
            }}
          >
            <Box
              sx={{
                width: "20%",
                textAlign: "center",
                p: 2,
                fontWeight: 600,
                fontFamily: "Poppins, sans-serif",
                bgcolor: "#1976d2",
              }}
            >
              Reps
            </Box>
            {repsKeys?.map((key, i) => (
              <Box
                sx={{
                  width: "20%",
                  borderLeft: 1,
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
                    color: "white",
                    bgcolor: "#444451",
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
              maxWidth: "100%",
              borderLeft: 1,
              borderRight: 1,
              borderBottom: 1,
              borderColor: "white",
              borderBottomRightRadius: 5,
              borderBottomLeftRadius: 5,
            }}
          >
            <Box
              sx={{
                width: "20%",
                textAlign: "center",
                p: 2,
                fontWeight: 600,
                fontFamily: "Poppins, sans-serif",
                bgcolor: "#1976d2",
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
                    ...commonTextFieldStyles,
                    color: "white",
                    bgcolor: "#444451",
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
            minRows={3}
            sx={{
              borderRadius: 2,
              bgcolor: "#444451",
              width: "100%",
              "& .MuiInputBase-input::placeholder": {
                color: "white",
              },
              ...entryTextFieldsStyles,
            }}
            placeholder="Take a notes..."
          />
        </Box>
      </Box>
    );
  };
  return (
    <Grid2 container height="100vh">
      <Grid2
        size={{xs: 12}}
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
        size={{xs: 12}}
        height="7%"
        alignContent="center"
      >
        <Box
          sx={{
            maxWidth: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
            px: 4,
          }}
        >
          <Typography
            children="Todays plan"
            sx={{
              fontSize: {xs: 15, md: 24},
              color: "white",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
            }}
          />
          <Box sx={{display: "flex", gap: {xs: 1, md: 2}}}>
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
              Back
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{
                bgcolor: "#1565c0",
                borderRadius: 1,
                textTransform: "none",
              }}
              startIcon={<BackupRoundedIcon />}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Grid2>

      <Grid2
        size={{xs: 12}}
        height="7%"
        alignContent="center"
      >
        <Box
          sx={{
            maxWidth: "100%",
            display: "flex",
            gap: 1,
            alignItems: "center",
            px: 4,
          }}
        >
          <Autocomplete
            disablePortal
            options={days}
            sx={{
              width: {xs: "50%", md: "30%"},
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
                placeholder="Select a split"
                size="small"
                required
                sx={{...entryTextFieldsStyles}}
              />
            )}
            disableClearable
          />
          <Autocomplete
            disablePortal
            options={days}
            sx={{
              width: {xs: "50%", md: "30%"},
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
                sx={{...entryTextFieldsStyles}}
              />
            )}
            disableClearable
          />
        </Box>
      </Grid2>

      <Grid2
        size={{xs: 12}}
        height="79%"
        sx={{
          overflow: "auto",
          overflowX: "hidden",
          px: 4,
          ...scrollBarStyle,
        }}
      >
        {tableView(structure)}
      </Grid2>
    </Grid2>
  );
};

export default TodaysWorkoutPlan;

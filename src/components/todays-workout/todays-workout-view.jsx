import {
  Autocomplete,
  Box,
  Button,
  Grid2,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import useCustomHook from "../custom-hook/useCustomHook";
import useTodaysWokout from "./useTodayWorkout";
import AppBarView from "../app-bar/app-bar-view";
import BackupRoundedIcon from "@mui/icons-material/BackupRounded";
import StopwatchView from "./stopwatch-view";

const TodaysWorkoutPlan = () => {
  const {commonTextFieldStyles, entryTextFieldsStyles, scrollBarStyle} =
    useCustomHook();
  const viewModel = useTodaysWokout();
  const {
    structure,
    navigate,
    splitList,
    workoutList,
    daysList,
    setWorkoutList,
    workoutDetails,
    selectedSplit,
    selectedWorkout,
    setWorkoutDetails,
    setSelectedSplit,
    setSelectedWorkout,
    selectedDay,
    setSelectedDay,
    dbCollections,
    loggedInUserEmail,
    handleUpdate,
    repsOnChange,
    weightsOnChange,
  } = viewModel;

  const tableView = (props) => {
    const selectedWorkoutList =
      workoutDetails?.[selectedSplit]?.[selectedDay]?.workoutList;
    const selectedWorkoutWeightsObj = selectedWorkoutList?.filter(
      (row) => row?.name === selectedWorkout
    )?.[0]?.weights;
    const weightsKeys = selectedWorkoutWeightsObj
      ? Object.keys(selectedWorkoutWeightsObj)
      : Array(4).fill("");
    const selectedWorkoutRepsObj = selectedWorkoutList?.filter(
      (row) => row?.name === selectedWorkout
    )?.[0]?.reps;
    const repsKeys = selectedWorkoutRepsObj
      ? Object.keys(selectedWorkoutRepsObj)
      : Array(4).fill("");

    const notesValue = selectedWorkoutList?.filter(
      (row) => row?.name === selectedWorkout
    )?.[0]?.notes;

    return (
      <>
        {selectedWorkoutList?.length ? (
          <Box
            sx={{
              color: "white",
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Box
              sx={{
                maxWidth: "100%",
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
                      value={selectedWorkoutRepsObj?.[`set${i + 1}Reps`]}
                      onChange={(e) => {
                        repsOnChange({
                          e,
                          selectedWorkoutRepsObj,
                          selectedWorkoutList,
                          i,
                        });
                      }}
                      onBlur={() => handleUpdate()}
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
                      value={selectedWorkoutWeightsObj?.[`set${i + 1}Weights`]}
                      onChange={(e) => {
                        weightsOnChange({
                          e,
                          selectedWorkoutWeightsObj,
                          selectedWorkoutList,
                          i,
                        });
                      }}
                      onBlur={() => handleUpdate()}
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
                value={notesValue || ""}
                onChange={(e) => {
                  const tempWrktList = selectedWorkoutList?.map((row) => {
                    if (row?.name === selectedWorkout) {
                      return {
                        ...row,
                        notes: e?.target?.value,
                      };
                    } else {
                      return {...row};
                    }
                  });
                  setWorkoutDetails((prev) => ({
                    ...prev,
                    [selectedSplit]: {
                      ...prev?.[selectedSplit],
                      [selectedDay]: {
                        workoutList: [...(tempWrktList || [])],
                      },
                    },
                  }));
                }}
                onBlur={() => handleUpdate()}
              />
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              maxWidth: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontFamily: "Poppins, sans-serif",
              color: "white",
            }}
          >
            {" "}
            "No workouts found!"
          </Box>
        )}
      </>
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
        <StopwatchView />
      </Grid2>

      <Grid2 size={{xs: 12}} height="7%" alignContent="center">
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
                fontFamily: "Poppins, sans-serif",
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
                fontFamily: "Poppins, sans-serif",
              }}
              startIcon={<BackupRoundedIcon />}
              // onClick={handleUpdate}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Grid2>

      <Grid2
        size={{xs: 12}}
        height={{xs: "12%", md: "7%"}}
        alignContent="center"
      >
        <Box
          sx={{
            maxWidth: "100%",
            display: "flex",
            flexDirection: {xs: "column", md: "row"},
            gap: 1,
            alignItems: "center",
            px: 4,
          }}
        >
          <Box width={{xs: "100%", md: "50%"}} display="flex" gap={1}>
            <Autocomplete
              disablePortal
              options={splitList}
              sx={{
                width: {xs: "50%", md: "50%"},
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
              value={selectedSplit}
              onChange={(e, newValue) => {
                setSelectedSplit(newValue);
                const loggedInuserDetails = dbCollections?.filter(
                  (row) => row?.EMAIL === loggedInUserEmail
                );

                const selectedWorkoutSplit =
                  loggedInuserDetails?.[0]?.DETAILS?.[newValue];
                setWorkoutDetails((prev) => ({
                  ...prev,
                  [newValue]: selectedWorkoutSplit,
                }));
                const todaysWorkoutList = selectedWorkoutSplit?.[
                  selectedDay
                ]?.workoutList?.map((row) => row?.name);
                setWorkoutList(todaysWorkoutList);
                setSelectedWorkout(todaysWorkoutList?.[0]);
              }}
            />
            <Autocomplete
              disablePortal
              options={daysList}
              sx={{
                width: {xs: "50%", md: "50%"},
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
              value={selectedDay || ""}
              onChange={(e, newValue) => {
                setSelectedDay(newValue);
                const todaysWorkoutList = workoutDetails?.[selectedSplit]?.[
                  newValue
                ]?.workoutList?.map((row) => row?.name);
                setWorkoutList(todaysWorkoutList || []);
                setSelectedWorkout(todaysWorkoutList?.[0]);
              }}
            />
          </Box>
          <Autocomplete
            disablePortal
            options={workoutList}
            sx={{
              width: {xs: "100%", md: "30%"},
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
                placeholder="Select a Workout"
                size="small"
                required
                sx={{...entryTextFieldsStyles}}
              />
            )}
            disableClearable
            value={selectedWorkout}
            onChange={(e, newValue) => {
              setSelectedWorkout(newValue);
            }}
          />
        </Box>
      </Grid2>

      <Grid2
        size={{xs: 12}}
        height={{xs: "74%", md: "79%"}}
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

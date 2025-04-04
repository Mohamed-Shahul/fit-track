import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  Grid2,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import useCreateWorkout from "./useCreateWorkout";
import useCustomHook from "../custom-hook/useCustomHook";
import BackupRoundedIcon from "@mui/icons-material/BackupRounded";

import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import AppBarView from "../app-bar/app-bar-view";
import DeleteDialog from "./delete-dialog";

const CreateWorkoutPlan = () => {
  const { entryTextFieldsStyles, scrollBarStyle } = useCustomHook();
  const viewModel = useCreateWorkout();
  const {
    isDelete,
    setIsDelete,
    days,
    handleAddWorkout,
    handleRemoveWorkout,
    navigate,
    workoutDetails,
    setWorkoutDetails,
    handleWorkoutOnChange,
    handleSaveWorkout,
    radioButtonValue,
    selectedDay,
    setSelectedDay,
    splitList,
    selectedSplit,
    setSelectedSplit,
    handleEditRadioFetch,
    handleSplitSelectionFetch,
    defaultWorkoutDetailsState,
    handleDeleteSplit,
    isLoading,
    isLoadingDelete,
  } = viewModel;

  const tableView = () => {
    return (
      <Box
        sx={{
          py: 1,
          px: 2,
          color: "white",
          borderRadius: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          height: "100%",
          maxHeight: "100%",
          overflow: "auto",
          overflowX: "hidden",
          ...scrollBarStyle,
        }}
      >
        {workoutDetails?.[selectedSplit]?.[selectedDay]?.workoutList?.length ? (
          workoutDetails?.[selectedSplit]?.[selectedDay]?.workoutList?.map(
            (row, i) => (
              <Box
                sx={{
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
                            setIsDelete((prev) => ({
                              ...prev,
                              state: true,
                              index: i,
                              title: row?.name,
                            }));
                          }}
                        />
                      ),
                    },
                  }}
                  value={row?.name}
                  onChange={(e) => handleWorkoutOnChange(e, i)}
                />
              </Box>
            )
          )
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
        // border={1}
        // borderColor="white"
        size={{ xs: 12 }}
        height={{ xs: "12%", md: "7%" }}
        alignContent="center"
      >
        <Box
          sx={{
            borderColor: "white",
            maxWidth: "100%",
            maxHeight: "100%",
            display: "flex",
            flexDirection: { xs: "column-reverse", md: "row" },
            rowGap: 2,
            alignItems: "center",
            px: 4,
          }}
        >
          <Box width={{ xs: "100%", md: "50%" }}>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="create"
              name="radio-buttons-group"
              sx={{
                display: "flex",
                flexDirection: "row",
                fontFamily: "Poppins, sans-serif",
              }}
              value={radioButtonValue}
              onChange={(e) => {
                handleEditRadioFetch(e?.target?.value);
              }}
            >
              <FormControlLabel
                value="create"
                control={
                  <Radio
                    sx={{
                      color: "#1565c0",
                      "&.Mui-checked": { color: "#1565c0" },
                    }}
                  />
                }
                label="Create split"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    color: "white",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 500,
                  },
                }}
              />
              <FormControlLabel
                value="edit"
                control={
                  <Radio
                    sx={{
                      color: "#1565c0",
                      "&.Mui-checked": { color: "#1565c0" },
                    }}
                  />
                }
                label="Edit split"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    color: "white",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 500,
                  },
                }}
              />
            </RadioGroup>
          </Box>
          <Box
            width={{ xs: "100%", md: "50%" }}
            // border={1}
            // borderColor="white"
            sx={{
              display: "flex",
              justifyContent: "right",
              gap: { xs: 1, md: 2 },
            }}
          >
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
              Cancel
            </Button>
            <Button
              variant="contained"
              size="small"
              sx={{
                bgcolor: "#1565c0",
                borderRadius: 1,
                textTransform: "none",
                fontFamily: "Poppins, sans-serif",
                display: "flex",
                alignItems: "center",
              }}
              startIcon={
                <>
                  {isLoading ? (
                    <CircularProgress size={20} sx={{ color: "white" }} />
                  ) : (
                    <BackupRoundedIcon />
                  )}
                </>
              }
              onClick={handleSaveWorkout}
            >
              {isLoading
                ? ""
                : radioButtonValue === "create"
                ? "Save"
                : "Update"}
            </Button>
            <Button
              variant="contained"
              color="error"
              size="small"
              disableTouchRipple={!selectedSplit?.length}
              sx={{
                borderRadius: 1,
                borderColor: "#1565c0",
                textTransform: "none",
                fontFamily: "Poppins, sans-serif",
                display: radioButtonValue === "create" ? "none" : "",
                ...(!selectedSplit?.length && {
                  backgroundColor: "#b0bec5",
                  color: "#37474f",
                  cursor: "default",
                }),
              }}
              onClick={() => {
                if (radioButtonValue !== "create") {
                  setIsDelete((prev) => ({
                    ...prev,
                    state: true,
                    title: selectedSplit,
                    index: 0,
                  }));
                }
              }}
            >
              {isLoadingDelete ? (
                <CircularProgress size={20} sx={{ color: "white" }} />
              ) : (
                "Delete this split"
              )}
            </Button>
          </Box>
        </Box>
      </Grid2>

      <Grid2
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
          {radioButtonValue === "create" ? (
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
              value={selectedSplit}
              onChange={(e) => {
                setSelectedSplit(e?.target?.value);
              }}
              onBlur={(e) => {
                setWorkoutDetails((prev) => ({
                  ...prev,
                  [e?.target?.value]: {
                    ...defaultWorkoutDetailsState,
                    splitName: e?.target?.value,
                  },
                }));
                setSelectedSplit(e?.target?.value);
              }}
            />
          ) : (
            <Autocomplete
              disablePortal
              // options={splitList}
              options={splitList}
              sx={{
                width: { xs: "100%", md: "40%" },
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
                  sx={{ ...entryTextFieldsStyles }}
                />
              )}
              disableClearable
              value={selectedSplit}
              onChange={(e, newValue) => {
                handleSplitSelectionFetch(newValue);
              }}
            />
          )}

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
              value={selectedDay}
              onChange={(e, newValue) => {
                // setWorkoutDetails((prev) => ({
                //   ...prev,
                //   selectedDay: newValue,
                // }));
                setSelectedDay(newValue);
              }}
            />
            <Button
              variant="contained"
              sx={{
                width: { xs: "40%", md: "20%" },
                textTransform: "none",
                fontFamily: "Poppins, sans-serif",
                bgcolor: !selectedSplit?.length
                  ? "silver !important"
                  : "#1976d2",
              }}
              disabled={!selectedSplit?.length}
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
            overflow: "auto",
            overflowX: "hidden",
            px: 2,
            py: 2,
            ...scrollBarStyle,
          }}
        >
          {tableView()}
        </Box>
      </Grid2>

      <DeleteDialog
        open={isDelete?.state}
        setOpen={setIsDelete}
        title={isDelete?.title}
        handleConfirm={() => {
          if (isDelete?.index) {
            handleRemoveWorkout(isDelete?.index);
          } else {
            handleDeleteSplit();
          }
        }}
      />
    </Grid2>

    // </Box>
  );
};

export default CreateWorkoutPlan;

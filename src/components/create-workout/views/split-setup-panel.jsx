import { Autocomplete, Box, Button, TextField } from "@mui/material";
import useUiComponentStyles from "../../custom-hook/useUiComponentStyles";

const SplitSetupPanel = (props) => {
  const { entryTextFieldsStyles } = useUiComponentStyles();
  const { viewModel } = props;
  const {
    days,
    handleAddWorkout,
    workoutDetails,
    setWorkoutDetails,
    radioButtonValue,
    selectedDay,
    setSelectedDay,
    splitList,
    selectedSplit,
    setSelectedSplit,
    handleSplitSelectionFetch,
    defaultWorkoutDetailsState,
  } = viewModel;
  return (
    <Box
      sx={{
        maxWidth: "100%",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 1,
        alignItems: "center",
        px: 4,
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
              [selectedSplit]: {
                ...defaultWorkoutDetailsState,
                splitName: e?.target?.value,
                ...workoutDetails?.[selectedSplit],
              },
            }));
            setSelectedSplit(e?.target?.value);
          }}
        />
      ) : (
        <Autocomplete
          disablePortal
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
          slotProps={{
            paper: {
              sx: {
                bgcolor: "#E6E6E6",
                color: "black",
                fontFamily: "Poppins, sans-serif",
                fontWeight: 600,
              },
            },
          }}
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
          slotProps={{
            paper: {
              sx: {
                bgcolor: "#E6E6E6",
                color: "black",
                fontFamily: "Poppins, sans-serif",
                fontWeight: 600,
              },
            },
          }}
          disableClearable
          value={selectedDay}
          onChange={(e, newValue) => {
            setSelectedDay(newValue);
          }}
        />
        <Button
          variant="contained"
          sx={{
            width: { xs: "40%", md: "20%" },
            textTransform: "none",
            fontFamily: "Poppins, sans-serif",
            bgcolor: !selectedSplit?.length ? "silver !important" : "#1976d2",
          }}
          disabled={!selectedSplit?.length}
          onClick={() => handleAddWorkout()}
        >
          Add Workout
        </Button>
      </Box>
    </Box>
  );
};

export default SplitSetupPanel;

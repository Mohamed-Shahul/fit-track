import { Box } from "@mui/material";
import ScrollableButtons from "../../custom-components/scrollable-buttons/scrollable-buttons";

const SelectionsView = (props) => {
  const { viewModel } = props;
  const {
    splitList,
    workoutList,
    daysList,
    selectedSplit,
    selectedWorkout,
    setSelectedWorkout,
    selectedDay,
    handleSelectSplitAutoCompleteOnChange,
  } = viewModel;
  return (
    <>
      <Box maxWidth="100%" mb={1}>
        <ScrollableButtons
          title="Day"
          defaultValue={selectedDay}
          data={daysList}
          handleClick={(rowValue) => {
            viewModel.handleDayOnChange(rowValue);
          }}
        />
      </Box>
      <Box maxWidth="100%" mb={1}>
        <ScrollableButtons
          title="Split"
          defaultValue={selectedSplit}
          data={splitList}
          handleClick={(rowValue) => {
            handleSelectSplitAutoCompleteOnChange(rowValue);
          }}
        />
      </Box>
      <Box maxWidth="100%">
        <ScrollableButtons
          title="Workout"
          defaultValue={selectedWorkout}
          data={workoutList}
          handleClick={(rowValue) => {
            setSelectedWorkout(rowValue);
          }}
        />
      </Box>
      {/* -------------------------- */}
      {/* <Box
          sx={{
            maxWidth: "100%",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 1,
            alignItems: "center",
            px: 4,
          }}
        >
          <Box width={{ xs: "100%", md: "50%" }} display="flex" gap={1}>
            <Autocomplete
              disablePortal
              options={splitList}
              noOptionsText="Splits not found"
              sx={{
                width: { xs: "50%", md: "50%" },
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
                handleSelectSplitAutoCompleteOnChange(newValue);
              }}
            />
            <Autocomplete
              disablePortal
              options={daysList}
              sx={{
                width: { xs: "50%", md: "50%" },
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
            noOptionsText="Workouts not found"
            sx={{
              width: { xs: "100%", md: "30%" },
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
            value={selectedWorkout}
            onChange={(e, newValue) => {
              setSelectedWorkout(newValue);
            }}
          />
        </Box> */}
    </>
  );
};

export default SelectionsView;

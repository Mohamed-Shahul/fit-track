import { Box, TextField } from "@mui/material";
import useCustomHook from "../../custom-hook/useCustomHook";

const TableView = (props) => {
  const { commonTextFieldStyles, entryTextFieldsStyles } = useCustomHook();
  const { viewModel } = props;
  const {
    workoutDetails,
    selectedSplit,
    selectedWorkout,
    setWorkoutDetails,
    selectedDay,
    handleUpdate,
    repsOnChange,
    weightsOnChange,
  } = viewModel;

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
        <>
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
                // borderColor: "white",
                borderRadius: 2,
              }}
            >
              <Box
                // sx={{
                //   display: "flex",
                //   justifyContent: "space-between",
                //   // bgcolor: "#1976d2",
                //   bgcolor: "#282C35", // todo
                //   maxWidth: "100%",
                //   // border: 1,
                //   // borderColor: "white",
                //   // borderColor: "silver",
                //   borderTopRightRadius: 5,
                //   borderTopLeftRadius: 5,
                // }}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  // bgcolor: "#282C35",
                  maxWidth: "100%",
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
                    bgcolor: "#282C35",
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
                        // borderLeft: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontWeight: 600,
                        fontFamily: "Poppins, sans-serif",
                        bgcolor: "#282C35",
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
                  // bgcolor: "#4C4B4B",
                  // bgcolor: "#282C35",

                  maxWidth: "100%",
                  // borderLeft: 1,
                  // borderRight: 1,
                  // borderBottom: 1,
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
                    // bgcolor: "#1976d2",
                    bgcolor: "#282C35",
                  }}
                >
                  Reps
                </Box>
                {repsKeys?.map((key, i) => (
                  <Box
                    sx={{
                      width: "20%",
                      // borderLeft: 1,
                      bgcolor: "#282C35",
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
                        // bgcolor: "#444451",
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
                  // bgcolor: "#4C4B4B",
                  // bgcolor: "#282C35",

                  maxWidth: "100%",
                  // borderLeft: 1,
                  // borderRight: 1,
                  // borderBottom: 1,
                  // borderColor: "white",
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
                    bgcolor: "#282C35",
                  }}
                >
                  Kg
                </Box>
                {weightsKeys?.map((key, i) => (
                  <Box
                    sx={{
                      width: "20%",
                      // borderLeft: 1,
                      bgcolor: "#282C35",
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
                        // bgcolor: "#444451",
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
                  // bgcolor: "#444451",
                  bgcolor: "#282C35",

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
                      return { ...row };
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
        </>
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
      {/* <Grid2
        size={{ xs: 12 }}
        height={{ xs: "12%", md: "7%" }}
        alignContent="center"
      >
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
        </Box>
      </Grid2> */}
    </>
  );
};

export default TableView;

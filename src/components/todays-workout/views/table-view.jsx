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
              color: "#D3D3D3",
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Box
              sx={{
                maxWidth: "100%",
                borderRadius: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
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
                    borderTopLeftRadius: 5,
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
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontWeight: 600,
                        fontFamily: "Poppins, sans-serif",
                        bgcolor: "#282C35",
                        ...(i === 3 && {
                          borderTopRightRadius: 5,
                        }),
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
                  maxWidth: "100%",
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
                    bgcolor: "#282C35",
                  }}
                >
                  Reps
                </Box>
                {repsKeys?.map((key, i) => (
                  <Box
                    sx={{
                      width: "20%",
                      bgcolor: "#282C35",
                      border: "1px solid grey",
                      ...(i === 0 && { borderTopLeftRadius: 5 }),
                      ...(i === 3 && { borderTopRightRadius: 5 }),
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
                  maxWidth: "100%",
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
                    borderBottomLeftRadius: 5,
                  }}
                >
                  Kg
                </Box>
                {weightsKeys?.map((key, i) => (
                  <Box
                    sx={{
                      width: "20%",
                      bgcolor: "#282C35",
                      border: "1px solid grey",
                      ...(i === 0 && { borderBottomLeftRadius: 5 }),
                      ...(i === 3 && { borderBottomRightRadius: 5 }),
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
    </>
  );
};

export default TableView;

import { Box, IconButton, TextField } from "@mui/material";
import useCustomHook from "../../custom-hook/useCustomHook";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

const WorkoutListView = (props) => {
  const { entryTextFieldsStyles, scrollBarStyle } = useCustomHook();
  const { viewModel } = props;
  const {
    setIsDelete,
    workoutDetails,
    handleWorkoutOnChange,
    selectedDay,
    selectedSplit,
    handleDragStart,
    handleDragOver,
    handleDrop,
  } = viewModel;

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
                draggable
                onDragStart={() => handleDragStart(i)}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(i)}
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

export default WorkoutListView;

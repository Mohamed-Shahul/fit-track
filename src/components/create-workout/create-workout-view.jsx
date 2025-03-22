import {
  Box,
  Button,
  Grid2,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import React from "react";
import useCreateWorkout from "./useCreateWorkout";
import useCustomHook from "../custom-hook/useCustomHook";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";

const CreateWorkoutPlan = () => {
  const {commonTextFieldStyles} = useCustomHook();
  const viewModel = useCreateWorkout();
  const {weekHeaders, workouts, structure} = viewModel;
  const skewXelement = (props) => {
    const {day, title} = props;
    return (
      <Box
        sx={{
          bgcolor: "rgba(76, 75, 75, 1)",
          color: "white",
          fontWeight: 500,
          borderRadius: 0.5,
          // width: {md: "100px"},
          textAlign: "center",
          transform: "skewX(-20deg) ",
          textDecoration: "none",
          mr: 0.5,
          p: 0.5,
        }}
      >
        {day || title}
      </Box>
    );
  };

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
          padding: {xs: "20px 20px", md: "30px 50px"},
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box
          sx={{width: "100%", border: 1, borderColor: "white", borderRadius: 2}}
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
    <Grid2 container>
      <Grid2 size={{xs: 12}} sx={{width: "100%", display: "flex", p: 2}}>
        <Box sx={{width: "50%", textAlign: "left"}}>
          <TextField
            required
            type="text"
            placeholder="Split name..."
            sx={{bgcolor: "silver"}}
          />
        </Box>
        <Box sx={{width: "50%", textAlign: "right"}}>
          <Button variant="contained">Save</Button>
        </Box>
      </Grid2>
      <Grid2
        size={{xs: 12}}
        sx={{width: "100%", display: "flex", justifyContent: "center", p: 2}}
      >
        {/* {weekHeaders.map((row) => skewXelement(row))} */}
      </Grid2>
      <Grid2
        size={{xs: 12}}
        sx={{
          padding: {xs: "0px 20px", md: "0px 50px"},
        }}
      >
        <Box
          sx={{
            display: "flex",
            // gap: 1,
          }}
        >
          <Box
            sx={{
              width: {xs: "15%", md: "3%"},
            }}
          >
            <IconButton
              children={
                <Tooltip
                  title="Add Workout"
                  children={<AddBoxRoundedIcon fontSize="large" />}
                />
              }
            />
          </Box>

          <Box
            sx={{
              width: {xs: "85%", md: "97%"},
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              overflow: "auto",
              overflowY: "hidden",
              pl: 1,
            }}
          >
            {workouts.map((row) => skewXelement(row))}
          </Box>
        </Box>
      </Grid2>

      <Grid2
        size={{xs: 12}}
        sx={{
          padding: {xs: "5px 20px", md: "5px 50px"},
        }}
      >
        {tableView(structure)}
      </Grid2>
    </Grid2>
  );
};

export default CreateWorkoutPlan;

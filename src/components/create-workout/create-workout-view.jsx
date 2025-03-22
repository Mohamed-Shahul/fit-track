import {Box, Button, Grid2, TextField} from "@mui/material";
import React from "react";
import useCreateWorkout from "./useCreateWorkout";

const CreateWorkoutPlan = () => {
  const viewModel = useCreateWorkout();
  const {weekHeaders, workouts, structure} = viewModel;
  const skewXelement = (props) => {
    const {day, title} = props;
    return (
      <Box
        sx={{
          bgcolor: "rgba(76, 75, 75, 1)",
          color: "white",
          fontWeight: 700,
          borderRadius: 0.5,
          width: "100px",
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
          padding: "30px 50px",
        }}
      >
        <Box sx={{border: 1, borderColor: "white", borderRadius: 2}}>
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
                width: "100%",
                textAlign: "center",
                p:2
              }}
            >
              Sets
            </Box>
            {Array(4)
              .fill("")
              ?.map((key, i, arr) => (
                <Box
                  sx={{
                    width: "100%",
                    borderLeft: 1,
                    textAlign: "center",
                p:2

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
                width: "100%",
                borderBottom: 1,
                textAlign: "center",
                p:2

              }}
            >
              Reps
            </Box>
            {repsKeys?.map((key, i) => (
              <Box
                sx={{
                  width: "100%",
                  borderLeft: 1,
                  borderBottom: 1,
                  textAlign: "center",
                p:2

                }}
              >
                {repsObj?.[key]}
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
                width: "100%",
                textAlign: "center",
                p:2

              }}
            >
              Weights
            </Box>
            {weightsKeys?.map((key, i) => (
              <Box
                sx={{
                  width: "100%",
                  borderLeft: 1,
                  textAlign: "center",
                p:2

                }}
              >
                {weightsObj?.[key]}
              </Box>
            ))}
          </Box>
        </Box>

        <Box>Notes</Box>
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
        {weekHeaders.map((row) => skewXelement(row))}
      </Grid2>
      <Grid2
        size={{xs: 12}}
        sx={{width: "100%", display: "flex", justifyContent: "center", p: 1}}
      >
        {workouts.map((row) => skewXelement(row))}
      </Grid2>
      <Grid2
        size={{xs: 12}}
        sx={{
          padding: "5px 50px",
        }}
      >
        {tableView(structure)}
      </Grid2>
    </Grid2>
  );
};

export default CreateWorkoutPlan;

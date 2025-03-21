import { Box, Button, Grid2, TextField } from "@mui/material";
import React from "react";
import useCreateWorkout from "./useCreateWorkout";

const CreateWorkoutPlan = () => {
  const viewModel = useCreateWorkout();
  const { weekHeaders,workouts } = viewModel;
  const skewXelement = (props) => {
    const { day ,title} = props;
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
        {day||title}
      </Box>
    );
  };
  return (
    <Grid2 container>
      <Grid2 size={{ xs: 12 }} sx={{ width: "100%", display: "flex", p: 2 }}>
        <Box sx={{ width: "50%", textAlign: "left" }}>
          <TextField
            required
            type="text"
            placeholder="Split name..."
            sx={{ bgcolor: "silver" }}
          />
        </Box>
        <Box sx={{ width: "50%", textAlign: "right" }}>
          <Button variant="contained">Save</Button>
        </Box>
      </Grid2>
      <Grid2
        size={{ xs: 12 }}
        sx={{ width: "100%", display: "flex", justifyContent: "center", p: 2 }}
      >
        {weekHeaders.map((row) => skewXelement(row))}
      </Grid2>
      <Grid2
        size={{ xs: 12 }}
        sx={{ width: "100%", display: "flex", justifyContent: "center", p: 1 }}
      >
        {workouts.map((row) => skewXelement(row))}
      </Grid2>
    </Grid2>
  );
};

export default CreateWorkoutPlan;

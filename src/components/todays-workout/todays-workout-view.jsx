import { Grid2 } from "@mui/material";
import useUiComponentStyles from "../custom-hook/useUiComponentStyles";
import useTodaysWokout from "./useTodayWorkout";
import StopwatchView from "./views/stopwatch-view";
import TableView from "./views/table-view";
import SelectionsView from "./views/selections-view";

const TodaysWorkoutPlan = () => {
  const { scrollBarStyle } = useUiComponentStyles();
  const viewModel = useTodaysWokout();

  return (
    <Grid2 container gap={2}>
      <Grid2
        size={{ xs: 12 }}
        sx={{
          position: "sticky",
          top: 0,
          borderBottom: 1,
          borderBottomColor: "gray"
        }}
      >
        <StopwatchView />
      </Grid2>

      <Grid2 size={{ xs: 12 }} alignContent="center" px={3}>
        <SelectionsView viewModel={viewModel} />
      </Grid2>

      <Grid2
        size={{ xs: 12 }}
        height={{ xs: "74%", md: "79%" }}
        sx={{
          overflow: "auto",
          overflowX: "hidden",
          px: 4,
          ...scrollBarStyle,
        }}
      >
        <TableView viewModel={viewModel} />
      </Grid2>
    </Grid2>
  );
};

export default TodaysWorkoutPlan;

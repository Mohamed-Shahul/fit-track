import { Box, Grid2 } from "@mui/material";
import useCreateWorkout from "./useCreateWorkout";
import useUiComponentStyles from "../custom-hook/useUiComponentStyles";
import DeleteDialog from "./delete-dialog";
import WorkoutListView from "./views/workout-list-view";
import SplitSetupPanel from "./views/split-setup-panel";
import TopBar from "./views/top-bar/top-bar-view";

const CreateWorkoutPlan = () => {
  const { scrollBarStyle } = useUiComponentStyles();
  const viewModel = useCreateWorkout();
  const { isDelete, setIsDelete, handleRemoveWorkout, handleDeleteSplit } =
    viewModel;

  return (
    <Grid2
      container
      height="100vh"
      overflow="hidden"
      rowGap={1}
      position="relative"
      alignContent="flex-start"
    >
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
        <TopBar viewModel={viewModel}  />
      </Grid2>

      <Grid2
        size={{ xs: 12 }}
        alignContent="center"
        height={{ xs: "10%", md: "7%" }}
      >
        <SplitSetupPanel viewModel={viewModel} />
      </Grid2>

      <Grid2 size={{ xs: 12 }} height={{ xs: "70%", md: "60%" }}>
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
          <WorkoutListView viewModel={viewModel} />
        </Box>
      </Grid2>

      {isDelete?.state ? (
        <DeleteDialog
          open={isDelete?.state}
          setOpen={setIsDelete}
          title={isDelete?.title}
          handleConfirm={() => {
            if (isDelete?.path === "split") {
              handleDeleteSplit();
            } else {
              handleRemoveWorkout(isDelete?.index);
            }
          }}
        />
      ) : (
        <></>
      )}
    </Grid2>
  );
};

export default CreateWorkoutPlan;

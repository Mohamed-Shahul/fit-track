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
    </>
  );
};

export default SelectionsView;

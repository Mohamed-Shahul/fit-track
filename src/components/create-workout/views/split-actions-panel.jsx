import {
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import BackupRoundedIcon from "@mui/icons-material/BackupRounded";

const SplitActionsPanel = (props) => {
  const { viewModel } = props;
  const {
    setIsDelete,
    navigate,
    handleSaveWorkout,
    radioButtonValue,
    selectedSplit,
    handleEditRadioFetch,
    isLoading,
    isLoadingDelete,
  } = viewModel;
  return (
    <Box
      sx={{
        borderColor: "white",
        maxWidth: "100%",
        maxHeight: "100%",
        display: "flex",
        flexDirection: { xs: "column-reverse", md: "row" },
        rowGap: 2,
        alignItems: "center",
        px: 4,
      }}
    >
      <Box width={{ xs: "100%", md: "50%" }}>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="create"
          name="radio-buttons-group"
          sx={{
            display: "flex",
            flexDirection: "row",
            fontFamily: "Poppins, sans-serif",
          }}
          value={radioButtonValue}
          onChange={(e) => {
            handleEditRadioFetch(e?.target?.value);
          }}
        >
          <FormControlLabel
            value="create"
            control={
              <Radio
                sx={{
                  color: "#1565c0",
                  "&.Mui-checked": { color: "#1565c0" },
                }}
              />
            }
            label="Create split"
            sx={{
              "& .MuiFormControlLabel-label": {
                color: "white",
                fontFamily: "Poppins, sans-serif",
                fontWeight: 500,
              },
            }}
          />
          <FormControlLabel
            value="edit"
            control={
              <Radio
                sx={{
                  color: "#1565c0",
                  "&.Mui-checked": { color: "#1565c0" },
                }}
              />
            }
            label="Edit split"
            sx={{
              "& .MuiFormControlLabel-label": {
                color: "white",
                fontFamily: "Poppins, sans-serif",
                fontWeight: 500,
              },
            }}
          />
        </RadioGroup>
      </Box>
      <Box
        width={{ xs: "100%", md: "50%" }}
        sx={{
          display: "flex",
          justifyContent: "right",
          gap: { xs: 1, md: 2 },
        }}
      >
        <Button
          variant="outlined"
          size="small"
          sx={{
            borderRadius: 1,
            borderColor: "#1565c0",
            color: "white",
            textTransform: "none",
            fontFamily: "Poppins, sans-serif",
          }}
          onClick={() => navigate("/home")}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          size="small"
          sx={{
            borderRadius: 1,
            textTransform: "none",
            fontFamily: "Poppins, sans-serif",
            display: "flex",
            alignItems: "center",
            bgcolor: !selectedSplit?.length ? "silver !important" : "#1565c0",
          }}
          disabled={!selectedSplit?.length}
          startIcon={
            <>
              {isLoading ? (
                <CircularProgress size={20} sx={{ color: "white" }} />
              ) : (
                <BackupRoundedIcon />
              )}
            </>
          }
          onClick={() => {
            !isLoading && handleSaveWorkout();
          }}
        >
          {isLoading ? "" : radioButtonValue === "create" ? "Save" : "Update"}
        </Button>
        <Button
          variant="contained"
          color="error"
          size="small"
          disableTouchRipple={!selectedSplit?.length || isLoadingDelete}
          sx={{
            borderRadius: 1,
            borderColor: "#1565c0",
            textTransform: "none",
            fontFamily: "Poppins, sans-serif",
            display: radioButtonValue === "create" ? "none" : "",
            ...((!selectedSplit?.length || isLoadingDelete) && {
              backgroundColor: "silver !important",
              cursor: "default",
            }),
          }}
          disabled={!selectedSplit?.length || isLoadingDelete}
          onClick={() => {
            if (
              radioButtonValue !== "create" &&
              !isLoadingDelete &&
              selectedSplit?.length
            ) {
              setIsDelete((prev) => ({
                ...prev,
                state: true,
                title: selectedSplit,
                index: 0,
                path: "split",
              }));
            }
          }}
        >
          {isLoadingDelete ? (
            <CircularProgress size={20} sx={{ color: "white" }} />
          ) : (
            "Delete this split"
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default SplitActionsPanel;

import { Box, Button, CircularProgress, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import BackupRoundedIcon from "@mui/icons-material/BackupRounded";

const SplitActionsPanel = (props) => {
  const { viewModel } = props;
  const {
    setIsDelete,
    navigate,
    handleSaveWorkout,
    radioButtonValue,
    selectedSplit,
    isLoading,
    isLoadingDelete,
  } = viewModel;
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box>
        <IconButton sx={{
          transform:`rotate(-180deg)`
        }} onClick={() => navigate("/home")}>
          <LogoutIcon color="error" fontSize="medium" />
        </IconButton>
      </Box>
      <Box
        width="100%"
        sx={{
          display: "flex",
          justifyContent: "right",
          gap: { xs: 1, md: 2 },
        }}
      >
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
      </Box>
    </Box>
  );
};

export default SplitActionsPanel;

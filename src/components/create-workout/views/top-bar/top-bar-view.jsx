import { Box, Button, CircularProgress, IconButton } from "@mui/material";
import ModeAutocomplete from "./mode-autocomplete";
import LogoutIcon from "@mui/icons-material/Logout";
import BackupRoundedIcon from "@mui/icons-material/BackupRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";

const TopBarView = (props) => {
  const { viewModel } = props;
  const {
    navigate,
    isLoading,
    handleSaveWorkout,
    selectedSplit,
    radioButtonValue,
    setIsDelete,
    isLoadingDelete,
  } = viewModel;

  return (
    <Box
      sx={{
        maxWidth: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 1,
        color: "white",
      }}
    >
      <Box
        sx={{
          width: "30%",
          display: "flex",
          alignItems: "center",
          gap: 1,
          cursor: "pointer",
        }}
        onClick={() => navigate("/home")}
      >
        <IconButton
          sx={{
            transform: `rotate(-180deg)`,
          }}
          onClick={() => navigate("/home")}
        >
          <LogoutIcon color="error" fontSize="medium" />
        </IconButton>
      </Box>

      <Box
        sx={{
          width: "70%",
          display: "flex",
          justifyContent: "right",
          gap: 1,
        }}
      >
        <ModeAutocomplete viewModel={viewModel} />
        <Button
          variant="contained"
          size="small"
          sx={{
            borderRadius: 1,
            textTransform: "none",
            fontFamily: "Poppins, sans-serif",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: !selectedSplit?.length ? "silver !important" : "#1565c0",
          }}
          disabled={!selectedSplit?.length}
          onClick={() => {
            !isLoading && handleSaveWorkout();
          }}
        >
          {isLoading ? (
            <CircularProgress size={20} sx={{ color: "white" }} />
          ) : (
            <BackupRoundedIcon />
          )}
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
            <DeleteOutlineRoundedIcon />
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default TopBarView;

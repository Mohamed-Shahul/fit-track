import React, { useState } from "react";
import {
  Box,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import useUiComponentStyles from "../../custom-hook/useUiComponentStyles";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import LinkIcon from "@mui/icons-material/Link";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const WorkoutListView = (props) => {
  const { entryTextFieldsStyles, scrollBarStyle } = useUiComponentStyles();
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
    radioButtonValue,
    handleRemoveWorkout,
    setWorkoutDetails,
  } = viewModel;

  const [openDialogIndex, setOpenDialogIndex] = useState(null);
  const [linksByIndex, setLinksByIndex] = useState({});

  const persistLinksForRow = (rowIdx, links) => {
    const prevList = [
      ...(workoutDetails?.[selectedSplit]?.[selectedDay]?.workoutList || []),
    ];
    const newList = prevList.map((item, idx) => {
      if (idx !== rowIdx) return item;
      return {
        ...item,
        links: links,
      };
    });
    setWorkoutDetails((prev) => ({
      ...prev,
      [selectedSplit]: {
        ...prev?.[selectedSplit],
        [selectedDay]: {
          workoutList: newList,
        },
      },
    }));
  };

  const handleOpenDialogForRow = (rowIdx) => {
    const existingLinks =
      workoutDetails?.[selectedSplit]?.[selectedDay]?.workoutList?.[rowIdx]
        ?.links || [];
    setLinksByIndex((prev) => ({
      ...prev,
      [rowIdx]: existingLinks.length ? existingLinks : [{ url: "" }],
    }));
    setOpenDialogIndex(rowIdx);
  };

  const handleAddLinkRow = (rowIdx) =>
    setLinksByIndex((prev) => {
      const updated = {
        ...prev,
        [rowIdx]: [...(prev[rowIdx] || [{ url: "" }]), { url: "" }],
      };
      persistLinksForRow(rowIdx, updated[rowIdx]);
      return updated;
    });

  const handleRemoveLinkRow = (linkIdx, rowIdx) =>
    setLinksByIndex((prev) => {
      const updated = {
        ...prev,
        [rowIdx]: (prev[rowIdx] || []).filter((_, i) => i !== linkIdx),
      };
      persistLinksForRow(rowIdx, updated[rowIdx]);
      return updated;
    });

  const handleLinkChange = (e, linkIdx, rowIdx) =>
    setLinksByIndex((prev) => {
      const updated = {
        ...prev,
        [rowIdx]: (prev[rowIdx] || []).map((r, i) =>
          i === linkIdx ? { ...r, url: e.target.value } : r,
        ),
      };
      persistLinksForRow(rowIdx, updated[rowIdx]);
      return updated;
    });

  const handleOpenLink = (url) => {
    if (!url) return;
    try {
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (err) {
      console.error("open link error", err);
    }
  };

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
      {/* per-row add link icon will appear per row */}

      {workoutDetails?.[selectedSplit]?.[selectedDay]?.workoutList?.length ? (
        workoutDetails?.[selectedSplit]?.[selectedDay]?.workoutList?.map(
          (row, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
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
                      <>
                        <IconButton
                          sx={{ ml: 1, color: "white" }}
                          onClick={() => handleOpenDialogForRow(i)}
                          aria-label={`add-link-${i}`}
                        >
                          <AddCircleOutlineIcon />
                        </IconButton>
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
                            if (radioButtonValue === "create") {
                              handleRemoveWorkout(i);
                            } else {
                              setIsDelete((prev) => ({
                                ...prev,
                                state: true,
                                index: i,
                                title: row?.name,
                              }));
                            }
                          }}
                        />
                      </>
                    ),
                  },
                }}
                value={row?.name}
                onChange={(e) => handleWorkoutOnChange(e, i)}
              />
            </Box>
          ),
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

      <Dialog
        open={openDialogIndex !== null}
        onClose={() => setOpenDialogIndex(null)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography>Tutorials links</Typography>
            <IconButton
              onClick={() => handleAddLinkRow(openDialogIndex)}
              aria-label="add-link"
            >
              <AddCircleOutlineIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {(linksByIndex[openDialogIndex] || [{ url: "" }]).map((r, idx) => (
              <Box
                key={idx}
                sx={{ display: "flex", gap: 1, alignItems: "center" }}
              >
                <IconButton
                  onClick={() => handleOpenLink(r.url)}
                  aria-label={`open-${idx}`}
                  size="large"
                >
                  <OpenInNewIcon />
                </IconButton>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Paste video URL or website link"
                  value={r.url}
                  onChange={(e) => handleLinkChange(e, idx, openDialogIndex)}
                  fullWidth
                />
                <IconButton
                  onClick={() => handleRemoveLinkRow(idx, openDialogIndex)}
                  aria-label={`remove-${idx}`}
                >
                  <RemoveCircleOutlineIcon color="error" />
                </IconButton>
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialogIndex(null)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default WorkoutListView;

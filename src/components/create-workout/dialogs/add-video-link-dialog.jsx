import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import React from "react";
import cloudBg from "../../../images/cloudBg.jpg";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import useCustomHook from "../../custom-hook/useCustomHook";
import SlideshowRoundedIcon from "@mui/icons-material/SlideshowRounded";

const AddVideoLinkDialog = (props) => {
  const { entryTextFieldsStyles, scrollBarStyle } = useCustomHook();

  const { open, setOpen, title, handleConfirm, viewModel } = props;

  const selectedVideoLinkDemoList =
    viewModel.workoutDetails?.[viewModel.selectedSplit]?.[
      viewModel?.selectedDay
    ]?.workoutList?.[viewModel?.openAddVideoDialog?.index]?.demoLinks || [];
  // Array(20).fill({});

  console.log(
    "==check",
    viewModel.workoutDetails?.[viewModel.selectedSplit]?.[
      viewModel?.selectedDay
    ]?.workoutList?.[viewModel?.openAddVideoDialog?.index]?.demoLinks
  );

  const handleClose = () => {
    setOpen?.((prev) => {
      return {
        ...prev,
        state: false,
      };
    });
  };

  const tableView = (data) => {
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
          overflow: "hidden",
        }}
      >
        {data?.length ? (
          data?.map((val, i) => (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <TextField
                draggable
                // onDragStart={() => handleDragStart(i)}
                // onDragOver={handleDragOver}
                // onDrop={() => handleDrop(i)}
                type="text"
                variant="outlined"
                autoComplete="off"
                size="small"
                sx={{
                  border: "none",
                  borderRadius: 2,
                  width: "100%",
                  //   ...entryTextFieldsStyles,
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
                placeholder="Paste link here"
                slotProps={{
                  input: {
                    endAdornment: (
                      <>
                        <IconButton
                          children={
                            <SlideshowRoundedIcon
                              fontSize="large"
                              color="info"
                            />
                          }
                          onClick={(e) => {
                            e.stopPropagation();
                            // viewModel.handleRemoveRowVideoDemoLink(i);
                            // setIsDelete((prev) => ({
                            //   ...prev,
                            //   state: true,
                            //   index: i,
                            //   title: row?.name,
                            // }));
                          }}
                        />
                        <IconButton
                          children={
                            <>
                              <DeleteOutlineRoundedIcon
                                fontSize="large"
                                color="error"
                                sx={{ color: "red !important" }}
                              />
                            </>
                          }
                          onClick={(e) => {
                            e.stopPropagation();
                            viewModel.handleRemoveRowVideoDemoLink(i);
                          }}
                        />
                      </>
                    ),
                  },
                }}
                value={val}
                onChange={(e) => viewModel.handleDemoLinkOnChange(e, i,)}
              />
            </Box>
          ))
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
            "Add demo links here"
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      slotProps={{
        paper: {
          sx: {
            p: 1,
            border: 1,
            borderColor: "silver",
            borderRadius: 2,
            backgroundImage: `
      linear-gradient(to right, rgba(0, 0, 0, 0.7) 30%, rgba(0, 0, 0, 0.3) 70%, transparent 100%),
      url(${cloudBg})
    `,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "100vw",
            height: "80vh",
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          color: "silver",
          fontFamily: "Poppins, sans-serif",
          fontWeight: 400,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        Add Demo links
        <Box>
          <Button
            variant="contained"
            onClick={viewModel.handleAddRowVideoDemoLink}
            size="small"
            children="Add Link"
          />
          <Button
            variant="contained"
            onClick={handleClose}
            size="small"
            children="Close"
            color="inherit"
            sx={{ color: "black", ml: 1 }}
          />
        </Box>
      </DialogTitle>
      <Box
        //   border="1px solid white"
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
        {tableView(selectedVideoLinkDemoList)}
      </Box>
    </Dialog>
  );
};

export default AddVideoLinkDialog;

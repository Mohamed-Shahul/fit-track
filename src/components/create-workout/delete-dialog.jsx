import {  Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import React from "react";
import cloudBg from "../../images/cloudBg.jpg";

const DeleteDialog = (props) => {
  const { open, setOpen, title, handleConfirm, modeTitle } = props;

  const handleClose = () => {
    setOpen?.((prev) => {
      return {
        ...prev,
        state: false,
      };
    });
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
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          color: "silver",
          fontFamily: "Poppins, sans-serif",
          fontWeight: 400,
        }}
      >
        Do you want to {modeTitle || "delete"} {title}
      </DialogTitle>

      <DialogActions>
        <Button
          variant="outlined"
          onClick={handleClose}
          sx={{
            color: "white",
            textTransform: "none",
            fontFamily: "Poppins, sans-serif",
          }}
          size="small"
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleConfirm}
          autoFocus
          sx={{
            textTransform: "none",
            fontFamily: "Poppins, sans-serif",
          }}
          size="small"
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;

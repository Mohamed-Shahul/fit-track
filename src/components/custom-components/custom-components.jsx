import {Alert, Snackbar} from "@mui/material";

export const snackBarComponent = (props) => {
  const {open, setOpen, msg, severity} = props;
  return (
    <Snackbar
      anchorOrigin={{vertical: "bottom", horizontal: "center"}}
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      message={msg}
      children={
        <Alert
          sx={{background: "silver", color: "black"}}
          onClose={() => setOpen(false)}
          severity={severity}
        >
          {msg}
        </Alert>
      }
    />
  );
};

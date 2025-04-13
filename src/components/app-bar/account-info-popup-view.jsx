import {
  Button,
  ClickAwayListener,
  Fade,
  Paper,
  Popper,
  Typography,
} from "@mui/material";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { logout } from "../../utilis/auth";
import DeleteDialog from "../create-workout/delete-dialog";
import img from "../../images/cloudBg.jpg";
import { useState } from "react";

const AccountInfoPopupView = (props) => {
  const loggedInUseName = localStorage.getItem("USER_NAME");
  const loggedInUserEmail = localStorage.getItem("USER_EMAIL");
  const { viewModel } = props;
  const { openAccountInfoPopup, setOpenAccountInfoPopup } = viewModel;
  const [isLogOut, setIsLogOut] = useState({ state: false });

  return (
    <>
      <ClickAwayListener
        onClickAway={() =>
          setOpenAccountInfoPopup({ state: false, anchorEl: null })
        }
      >
        <Popper
          open={openAccountInfoPopup.state}
          anchorEl={openAccountInfoPopup.anchorEl}
          placement="bottom-end"
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper
                sx={{
                  width: "250px",
                  height: "120px",
                  borderRadius: 1,
                  p: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "left",
                  alignItems: "left",
                  gap: 2,
                  backgroundImage: `url(${img})`,
                  // backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0.3)), url("images/newBg.jpg")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  // bgcolor:'black'
                }}
              >
                <Typography
                  children={loggedInUseName || ""}
                  sx={{ color: "#2392eb" }}
                />
                <Typography
                  children={loggedInUserEmail || ""}
                  sx={{ color: "#2392eb" }}
                />
                <Button
                  variant="outlined"
                  children="Log out"
                  fullWidth
                  sx={{
                    borderRadius: 1,
                    textTransform: "none",
                    fontFamily: "Poppins, sans-serif",
                  }}
                  startIcon={<LogoutRoundedIcon />}
                  onClick={() => {
                    setIsLogOut({ state: true });
                  }}
                />
              </Paper>
            </Fade>
          )}
        </Popper>
      </ClickAwayListener>

      <DeleteDialog
        open={isLogOut?.state}
        setOpen={setIsLogOut}
        modeTitle="Log out"
        handleConfirm={() => {
          logout();
        }}
      />
    </>
  );
};

export default AccountInfoPopupView;

import { Box, Button, Fade, Paper, Popper, Typography } from "@mui/material";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { logout } from "../../utilis/auth";

const AccountInfoPopupView = (props) => {
  const loggedInUseName = localStorage.getItem("USER_NAME");
  const loggedInUserEmail = localStorage.getItem("USER_EMAIL");
  const { viewModel, cloudBgImg } = props;
  const { navigate, openAccountInfoPopup, setOpenAccountInfoPopup } = viewModel;

  return (
    <Popper
      // sx={{ zIndex: 1200 }}
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
              ...cloudBgImg,
              display: "flex",
              flexDirection: "column",
              justifyContent: "left",
              alignItems: "left",
              gap: 2,
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
                logout();
              }}
            />
          </Paper>
        </Fade>
      )}
    </Popper>
  );
};

export default AccountInfoPopupView;

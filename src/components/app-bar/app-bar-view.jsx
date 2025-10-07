import { Box, IconButton, Typography } from "@mui/material";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import useAppBar from "./useAppBar";
import FitnessCenterRoundedIcon from "@mui/icons-material/FitnessCenterRounded";
import AccountInfoPopupView from "./views/account-info-popup-view";
import useCustomHook from "../custom-hook/useCustomHook";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

const AppBarView = () => {
  const { cloudBgImg } = useCustomHook();
  const viewModel = useAppBar();
  const { navigate, setOpenAccountInfoPopup, openAccountInfoPopup } = viewModel;

  return (
    <Box
      sx={{
        maxWidth: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        color: "white",
      }}
    >
      <Box
        sx={{
          width: "50%",
          display: "flex",
          alignItems: "center",
          gap: 1,
          cursor: "pointer",
        }}
        onClick={() => navigate("/home")}
      >
        <FitnessCenterRoundedIcon fontSize="medium" sx={{ color: "#2392eb" }} />

        <Typography
          sx={{
            color: "white",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 500,
          }}
          fontSize={22}
          fontWeight="bold"
        >
          Fit track
        </Typography>
      </Box>
      <Box
        sx={{
          width: "50%",
          textAlign: "right",
        }}
      >
        <IconButton children={<MenuRoundedIcon  sx={{ color: "#2392eb" }}/>} />

        <IconButton
          children={<AccountCircleSharpIcon sx={{ color: "#2392eb" }} />}
          onClick={(e) =>
            setOpenAccountInfoPopup((prev) => ({
              state: !prev.state,
              anchorEl: e.currentTarget,
            }))
          }
        />
      </Box>
      {openAccountInfoPopup.state ? (
        <AccountInfoPopupView viewModel={viewModel} cloudBgImg={cloudBgImg} />
      ) : (
        <></>
      )}
    </Box>
  );
};

export default AppBarView;

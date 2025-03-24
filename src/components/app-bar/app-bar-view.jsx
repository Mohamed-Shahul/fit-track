import { Box, Grid2, IconButton, Typography } from "@mui/material";
import React from "react";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import useAppBar from "./useAppBar";
import FitnessCenterRoundedIcon from "@mui/icons-material/FitnessCenterRounded";
import AccountInfoPopupView from "./account-info-popup-view";
import useCustomHook from "../custom-hook/useCustomHook";

const AppBarView = () => {
  const { cloudBgImg } = useCustomHook();
  const viewModel = useAppBar();
  const { navigate, setOpenAccountInfoPopup, openAccountInfoPopup } = viewModel;
  return (
    <Box
      sx={{
        maxWidth: "100%",
        display: "flex",
        alignItems: "center",
        color: "white",
      }}
    >
      <Box
        sx={{
          width: "50%",
          pl: 4,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
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
      <Box sx={{ width: "50%", textAlign: "right", pr: 4 }}>
        <IconButton
          children={
            <HomeRoundedIcon fontSize="medium" sx={{ color: "#2392eb" }} />
          }
          onClick={() => navigate("/home")}
        />
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

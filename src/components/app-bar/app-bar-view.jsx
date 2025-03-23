import { Box, Grid2, IconButton, Typography } from "@mui/material";
import React from "react";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import useAppBar from "./useAppBar";
import FitnessCenterRoundedIcon from "@mui/icons-material/FitnessCenterRounded";
import cloudBg from "../../images/cloudBg.jpg";

const AppBarView = () => {
  const viewModel = useAppBar();
  const { navigate } = viewModel;
  return (
    // <Grid2
    //   container
    //   bgcolor="black"
    //   sx={{
    //     borderBottom: 1,
    //     borderBottomColor: "gray",
    //     position: "sticky",
    //     top: 0,
    //     backgroundImage: `
    //               linear-gradient(to right, black 50%, transparent 100%),
    //               url(${cloudBg})
    //             `,
    //     backgroundSize: "cover",
    //     backgroundPosition: "center",
    //   }}
    // >
    // <Grid2
    //   size={{ xs: 12 }}
    //   p={1}
    //   border={1}
    //   sx={{
    //     borderBottom: 1,
    //     borderBottomColor: "gray",
    //     position: "sticky",
    //     top: 0,
    //   }}
    // >
      <Box
        sx={{
          width: "100%",
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
          <FitnessCenterRoundedIcon
            fontSize="medium"
            sx={{ color: "#2392eb" }}
          />

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
            onClick={() => navigate("/")}
          />
          <IconButton
            children={<AccountCircleSharpIcon sx={{ color: "white" }} />}
          />
        </Box>
      </Box>
    //  </Grid2> 
    // </Grid2>
  );
};

export default AppBarView;

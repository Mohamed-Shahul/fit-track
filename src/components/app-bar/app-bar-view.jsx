import {Box, Grid2, IconButton, Typography} from "@mui/material";
import React from "react";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import useAppBar from "./useAppBar";

const AppBarView = () => {
  const viewModel = useAppBar();
  const {navigate} = viewModel;
  return (
    <Grid2
      container
      bgcolor="black"
      sx={{borderBottom: 1, borderBottomColor: "silver"}}
    >
      <Grid2 size={{xs: 12}} p={1} border={1}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            color: "white",
          }}
        >
          <Box sx={{width: "50%", pl: 4}}>
            <Typography sx={{color: "#64DD17"}} fontSize={24} fontWeight="bold">
              FitTrack
            </Typography>
          </Box>
          <Box sx={{width: "50%", textAlign: "right", pr: 4}}>
            <IconButton
              children={<HomeSharpIcon sx={{color: "#64DD17"}} />}
              onClick={() => navigate("/")}
            />
            <IconButton
              children={<AccountCircleSharpIcon sx={{color: "white"}} />}
            />
          </Box>
        </Box>
      </Grid2>
    </Grid2>
  );
};

export default AppBarView;

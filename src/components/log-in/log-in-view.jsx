import {
  Box,
  Button,
  Grid2,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import useCustomHook from "../custom-hook/useCustomHook";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import FitnessCenterRoundedIcon from "@mui/icons-material/FitnessCenterRounded";
import useLogIn from "./useLogIn";

const LogInView = () => {
  const { cloudBgImg, logInTextFieldsStyles } = useCustomHook();
  const { navigate } = useLogIn();
  return (
    <Grid2
      container
      height="100vh"
      justifyContent="center"
      alignItems="center"
      sx={{
        ...cloudBgImg,
      }}
    >
      <Grid2
        size={{ xs: 12 }}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={1}
        p={1}
      >
        <Box mt={-10} mb={5}>
          <Typography
            sx={{
              width: "100%",
              color: "silver",
              fontFamily: "Poppins, sans-serif",
              textAlign: "center",
              fontSize: { xs: 20, md: 30 },
              fontWeight: 600,
            }}
            children={
              <>
                Log In To Track Your Fitness Progress
                <FitnessCenterRoundedIcon
                  sx={{
                    pl: 1,
                    fontSize: { xs: 18, md: 30 },
                  }}
                />
              </>
            }
          />
        </Box>

        <Typography
          sx={{
            width: { xs: "75%", md: "25%" },
            color: "silver",
            fontFamily: "Poppins, sans-serif",
            textAlign: "right",
            fontSize: 12,
          }}
          children={
            <>
              dont have an account?{" "}
              <span
                style={{ color: "white", cursor: "pointer" }}
                onClick={() => navigate("/sign-up")}
              >
                Sign up
              </span>
            </>
          }
        />
        <Box
          //   border={1}
          borderColor="white"
          width={{ xs: "100%", md: "50%" }}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap={2}
        >
          <TextField
            required
            variant="outlined"
            type="text"
            autoComplete="off"
            placeholder="User email"
            sx={{
              width: { xs: "75%", md: "50%" },
              bgcolor: "black",
              opacity: 0.8,
              borderRadius: 1,
              "& .MuiInputBase-input": {
                color: "silver",
                fontFamily: "Poppins, sans-serif",
              },
              ...logInTextFieldsStyles,
            }}
            size="small"
            slotProps={{
              input: {
                startAdornment: (
                  <IconButton
                    children={
                      <PersonRoundedIcon
                        fontSize="small"
                        sx={{ color: "silver" }}
                      />
                    }
                  />
                ),
              },
            }}
          />
          <TextField
            required
            variant="outlined"
            type="password"
            autoComplete="off"
            placeholder="Password"
            sx={{
              width: { xs: "75%", md: "50%" },
              bgcolor: "black",
              opacity: 0.8,
              borderRadius: 1,
              "& .MuiInputBase-input": {
                color: "silver",
                fontFamily: "Poppins, sans-serif",
              },
              ...logInTextFieldsStyles,
            }}
            size="small"
            slotProps={{
              input: {
                startAdornment: (
                  <IconButton
                    children={
                      <VisibilityRoundedIcon
                        fontSize="small"
                        sx={{ color: "silver" }}
                      />
                    }
                  />
                ),
              },
            }}
          />
          <Button
            variant="contained"
            children="Log in"
            sx={{
              width: { xs: "75%", md: "50%" },
              bgcolor: "silver",
              borderRadius: 1,
              textTransform: "none",
              fontFamily: "Poppins, sans-serif",
              color: "black",
            }}
            startIcon={<LoginRoundedIcon />}
            onClick={() => navigate("/home")}
          />
        </Box>
        <Typography
          sx={{
            width: { xs: "75%", md: "25%" },
            color: "silver",
            fontFamily: "Poppins, sans-serif",
            textAlign: "right",
            fontSize: 12,
          }}
          children="forgot password?"
        />
      </Grid2>
    </Grid2>
  );
};

export default LogInView;

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
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import FitnessCenterRoundedIcon from "@mui/icons-material/FitnessCenterRounded";
import AlternateEmailRoundedIcon from "@mui/icons-material/AlternateEmailRounded";
import DomainVerificationRoundedIcon from "@mui/icons-material/DomainVerificationRounded";
import useSignUp from "./useSignUp";

const SignUpView = () => {
  const { cloudBgImg, logInTextFieldsStyles } = useCustomHook();
  const { navigate } = useSignUp();
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
        <Box mt={-10} mb={3} p={2}>
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
                Sign In To Fitness Track Web App
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

        <Box
          width={{ xs: "100%", md: "50%" }}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap={2}
        >
          <Typography
            sx={{
              //   border: 1,
              //   borderColor: "white",
              width: { xs: "75%", md: "50%" },
              color: "silver",
              fontFamily: "Poppins, sans-serif",
              textAlign: "right",
              fontSize: 12,
            }}
            children={
              <>
                already have an account?{" "}
                <span
                  style={{ color: "white", cursor: "pointer" }}
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Log In
                </span>
              </>
            }
          />
          <TextField
            required
            variant="outlined"
            type="text"
            autoComplete="off"
            placeholder="User name"
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
            type="number"
            autoComplete="off"
            placeholder="mobile no"
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
                      <PhoneRoundedIcon
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
                      <AlternateEmailRoundedIcon
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
            children="Sign Up"
            sx={{
              width: { xs: "75%", md: "50%" },
              bgcolor: "silver",
              borderRadius: 1,
              textTransform: "none",
              fontFamily: "Poppins, sans-serif",
              color: "black",
            }}
            startIcon={<DomainVerificationRoundedIcon />}
            onClick={() => navigate("/")}
          />
        </Box>
      </Grid2>
    </Grid2>
  );
};

export default SignUpView;

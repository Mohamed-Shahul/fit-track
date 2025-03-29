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
import { snackBarComponent } from "../custom-components/custom-components";

const SignUpView = () => {
  const { cloudBgImg, logInTextFieldsStyles } = useCustomHook();
  const {
    navigate,
    userDetails,
    handleOnChange,
    setUserDetails,
    setOpenSnackBar,
    handleEmailOnBlur,
    openSnackBar,
    handlePasswordOnBlur,
    isUserDetailsIsInValid,
    handleMobileNoOnBlur,
    handleNameOnBlur,
    handleSignUp,
  } = useSignUp();

  const PasswordIcon = userDetails?.isPasswordVisibility ? (
    <VisibilityOffRoundedIcon fontSize="small" sx={{ color: "silver" }} />
  ) : (
    <VisibilityRoundedIcon fontSize="small" sx={{ color: "silver" }} />
  );
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
              fontWeight: 500,
            }}
            children={
              <>
                Sign In To Fitness Track Web App
                <FitnessCenterRoundedIcon
                  sx={{
                    pl: 1,
                    fontSize: { xs: 18, md: 30 },
                    color: "#1976d2",
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
                endAdornment: (
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
            value={userDetails.name}
            onChange={(e) => handleOnChange(e, "name")}
            onBlur={(e) => handleNameOnBlur()}
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
                endAdornment: (
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
            value={userDetails.mobileNo}
            onChange={(e) => handleOnChange(e, "mobileNo")}
            onBlur={(e) => handleMobileNoOnBlur()}
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
                endAdornment: (
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
            value={userDetails.email}
            onChange={(e) => handleOnChange(e, "email")}
            onBlur={() => handleEmailOnBlur()}
          />
          <TextField
            required
            variant="outlined"
            type={userDetails?.isPasswordVisibility ? "text" : "password"}
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
                endAdornment: (
                  <IconButton
                    children={PasswordIcon}
                    onClick={() =>
                      setUserDetails((prev) => ({
                        ...prev,
                        isPasswordVisibility: !prev?.isPasswordVisibility,
                      }))
                    }
                  />
                ),
              },
            }}
            value={userDetails.password}
            onChange={(e) => handleOnChange(e, "password")}
            onBlur={(e) => handlePasswordOnBlur()}
          />
          <Button
            variant="contained"
            children="Sign Up"
            sx={{
              width: { xs: "75%", md: "50%" },
              // bgcolor: "silver",
              borderRadius: 1,
              textTransform: "none",
              fontFamily: "Poppins, sans-serif",
              color: "silver",
              bgcolor: isUserDetailsIsInValid()
                ? "silver !important"
                : "#1976d2",
            }}
            disabled={isUserDetailsIsInValid()}
            endIcon={<DomainVerificationRoundedIcon />}
            onClick={() => handleSignUp()}
          />
        </Box>
      </Grid2>
      {openSnackBar &&
        snackBarComponent({
          msg: userDetails?.errorMsg,
          open: openSnackBar,
          setOpen: setOpenSnackBar,
          severity: "error",
        })}
    </Grid2>
  );
};

export default SignUpView;

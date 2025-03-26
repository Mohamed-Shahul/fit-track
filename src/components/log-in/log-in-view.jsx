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
import {login} from "../../utilis/auth";

const LogInView = () => {
  const {cloudBgImg, logInTextFieldsStyles} = useCustomHook();
  const {
    handleLogin,
    userDetails,
    handleOnChange,
    setUserDetails,
    navigate,
    isUserDetailsIsValid,
  } = useLogIn();

  const PasswordIcon = userDetails?.isPasswordVisibility ? (
    <VisibilityOffRoundedIcon fontSize="small" sx={{color: "silver"}} />
  ) : (
    <VisibilityRoundedIcon fontSize="small" sx={{color: "silver"}} />
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
        size={{xs: 12}}
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
              fontSize: {xs: 20, md: 30},
              fontWeight: 500,
            }}
            children={
              <>
                Log In To Track Your Fitness Progress
                <FitnessCenterRoundedIcon
                  sx={{
                    pl: 1,
                    fontSize: {xs: 18, md: 30},
                    color: "#1976d2",
                  }}
                />
              </>
            }
          />
        </Box>

        <Typography
          sx={{
            width: {xs: "75%", md: "25%"},
            color: "silver",
            fontFamily: "Poppins, sans-serif",
            textAlign: "right",
            fontSize: 12,
          }}
          children={
            <>
              dont have an account?{" "}
              <span
                style={{color: "white", cursor: "pointer"}}
                onClick={() => navigate("/sign-up")}
              >
                Sign up
              </span>
            </>
          }
        />
        <Box
          width={{xs: "100%", md: "50%"}}
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
              width: {xs: "75%", md: "50%"},
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
                        sx={{color: "silver"}}
                      />
                    }
                  />
                ),
              },
            }}
            value={userDetails.email}
            onChange={(e) => handleOnChange(e, "email")}
          />
          <TextField
            required
            variant="outlined"
            type={userDetails?.isPasswordVisibility ? "text" : "password"}
            autoComplete="off"
            placeholder="Password"
            sx={{
              width: {xs: "75%", md: "50%"},
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
          />
          <Button
            variant="contained"
            children="Log in"
            sx={{
              width: {xs: "75%", md: "50%"},
              borderRadius: 1,
              textTransform: "none",
              fontFamily: "Poppins, sans-serif",
              color: !isUserDetailsIsValid ? "black" : "silver",
              bgcolor: !isUserDetailsIsValid ? "red" : "#1976d2",
            }}
            endIcon={<LoginRoundedIcon />}
            onClick={handleLogin}
            disabled={!isUserDetailsIsValid}
          />
        </Box>
        <Typography
          sx={{
            width: {xs: "75%", md: "25%"},
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

import { Box, IconButton, Typography } from "@mui/material";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import PauseCircleFilledRoundedIcon from "@mui/icons-material/PauseCircleFilledRounded";
import { useContext } from "react";
import MyContext from "../../context/my-context";
import { useNavigate } from "react-router-dom";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import ReplayCircleFilledRoundedIcon from "@mui/icons-material/ReplayCircleFilledRounded";

const StopwatchView = () => {
  const { handlePlayPause, handleReset, stopwatchState, isPlay } =
    useContext(MyContext);
  const navigate = useNavigate();

  const formatTime = (time) =>
    `${time?.toString()?.length > 1 ? time : `0${time || "0"}`}`;

  const hr = formatTime(stopwatchState?.hour);
  const min = formatTime(stopwatchState?.min);
  const sec = formatTime(stopwatchState?.sec);

  return (
    <Box
      sx={{
        maxWidth:'100%',
        display: "flex",
        alignItems: "center",
        gap: 2,
        px: 2,
        height: "50px",
        bgcolor: "#111",
      }}
    >
      {/* Play / Pause */}
      <IconButton
        onClick={() => handlePlayPause(isPlay ? "pause" : "play")}
        sx={{
          color: "#42a5f5",
          transition: "all 0.2s ease",
          "&:hover": { transform: "scale(1.05)", color: "#64b5f6" },
          animation: isPlay ? "iconGlow 1.5s infinite ease-in-out" : "none",
        }}
      >
        {isPlay ? <PauseCircleFilledRoundedIcon fontSize="small" /> : <PlayCircleRoundedIcon fontSize="small" />}
      </IconButton>

      {/* Timer */}
      <Typography
        variant="h6"
        sx={{
          color: "white",
          fontWeight: "bold",
          fontFamily: "Poppins, sans-serif",
          minWidth: "90px",
          textAlign: "center",
        }}
      >
        {hr}:{min}:{sec}
      </Typography>

      {/* Reset */}
      <IconButton
        onClick={handleReset}
        sx={{
          color: "#42a5f5",
          transition: "all 0.2s ease",
          "&:hover": { transform: "scale(1.05)", color: "#64b5f6" },
          animation: isPlay ? "iconGlow 1.5s infinite ease-in-out" : "none",
          visibility: isPlay ? "visible" : "hidden",
        }}
      >
        <ReplayCircleFilledRoundedIcon fontSize="small"/>
      </IconButton>

      <Box sx={{ flexGrow: 1 }} />

      {/* Cancel / Close button */}
      <IconButton
        onClick={() => navigate("/home")}
        sx={{
          color: "white",
          transition: "all 0.2s ease",
          "&:hover": { transform: "scale(1.05)", color: "#f44336" },
          animation: "cancelGlow 2s infinite ease-in-out", // subtle glow
        }}
      >
        <CancelRoundedIcon fontSize="small" />
      </IconButton>

      {/* Keyframes */}
      <style>
        {`
          @keyframes iconGlow {
            0% { box-shadow: 0 0 4px #42a5f5; }
            50% { box-shadow: 0 0 12px #42a5f5; }
            100% { box-shadow: 0 0 4px #42a5f5; }
          }
          @keyframes cancelGlow {
            0% { box-shadow: 0 0 2px #f44336; }
            50% { box-shadow: 0 0 8px #f44336; }
            100% { box-shadow: 0 0 2px #f44336; }
          }
        `}
      </style>
    </Box>
  );
};

export default StopwatchView;

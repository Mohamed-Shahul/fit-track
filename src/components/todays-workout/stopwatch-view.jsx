import { Box, IconButton, Typography } from "@mui/material";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import PauseCircleFilledRoundedIcon from "@mui/icons-material/PauseCircleFilledRounded";
import { useContext } from "react";
import MyContext from "../context/my-context";
import { useNavigate } from "react-router-dom";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import ReplayCircleFilledRoundedIcon from "@mui/icons-material/ReplayCircleFilledRounded";

const StopwatchView = () => {
  const { handlePlayPause, handleReset, stopwatchState, isPlay } =
    useContext(MyContext);
  const navigate = useNavigate();

  const timerHandler = (time, colon) => {
    return `${time?.toString()?.length > 1 ? time : `0${time || "0"}`}`;
  };
  const hr = timerHandler(stopwatchState?.hour);
  const min = timerHandler(stopwatchState?.min);
  const sec = timerHandler(stopwatchState?.sec);

  return (
    <>
      {/* Timer Bar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          borderRadius: 2,
          fontFamily: "Poppins, sans-serif",
        }}
      >
        <IconButton
          children={
            <>
              {isPlay ? (
                <>
                  <PauseCircleFilledRoundedIcon
                    sx={{ color: "white" }}
                    onClick={() => {
                      handlePlayPause("pause");
                    }}
                  />
                </>
              ) : (
                <PlayCircleRoundedIcon
                  sx={{ color: "white" }}
                  onClick={() => {
                    handlePlayPause("play");
                  }}
                />
              )}
            </>
          }
        />
        <Typography variant="h5" color="white">
          {hr}:{min}:{sec}
        </Typography>
        {isPlay ? (
          <IconButton
            children={<ReplayCircleFilledRoundedIcon sx={{ color: "white" }} />}
            onClick={handleReset}
          />
        ) : (
          <></>
        )}
        <Box display="flex" justifyContent="right" width="100%">
          <IconButton
            children={<CancelRoundedIcon sx={{ color: "white" }} />}
            onClick={() => navigate("/home")}
          />
        </Box>
      </Box>
    </>
  );
};

export default StopwatchView;

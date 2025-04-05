import { Box, IconButton, Typography } from "@mui/material";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import PauseCircleFilledRoundedIcon from "@mui/icons-material/PauseCircleFilledRounded";
import { useEffect, useRef, useState } from "react";

const StopwatchView = () => {
  const intervalRef = useRef(null);
  const timeRef = useRef({ milliSec: 0, sec: 0, min: 0 });
  const [isPlay, setIsPlay] = useState(false);
  const [stopwatchState, setStopwatchState] = useState({
    milliSec: 0,
    sec: 0,
    min: 0,
  });
  console.log("==stopwatch", stopwatchState);

  const handlePlayPause = (mode) => {
    setIsPlay((prev) => !prev);

    if (mode === "play") {
      if (!intervalRef.current) {
        intervalRef.current = setInterval(() => {
          timeRef.current.milliSec += 1;

          if (timeRef.current.milliSec === 100) {
            timeRef.current.milliSec = 0;
            timeRef.current.sec += 1;
          }

          if (timeRef.current.sec === 60) {
            timeRef.current.sec = 0;
            timeRef.current.min += 1;
          }

          // Update UI state
          setStopwatchState({ ...timeRef.current });
        }, 1);
      }
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  };
  const handleReset = () => {
    isPlay && setIsPlay(false);
  };

  const fontStyles = {
    color: "white",
    fontSize: { xs: 30, md: 20 },
    fontWeight: 500,
    fontFamily: "Poppins, sans-serif",
  };
  return (
    <Box
      width="100%"
      maxHeight="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box width="30%">
        <IconButton
          children={
            <>
              {isPlay ? (
                <PauseCircleFilledRoundedIcon
                  sx={{ color: "white", fontSize: { xs: 40, md: 30 } }}
                  onClick={() => {
                    handlePlayPause("pause");
                  }}
                />
              ) : (
                <PlayCircleRoundedIcon
                  sx={{ color: "white", fontSize: { xs: 40, md: 30 } }}
                  onClick={() => {
                    handlePlayPause("play");
                  }}
                />
              )}
            </>
          }
        />
      </Box>
      <Box
        width="40%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        alignContent="center"
        columnGap={0.5}
      >
        <Typography sx={{ ...fontStyles }}>
          {stopwatchState?.min?.toString()?.length > 1
            ? stopwatchState?.min
            : `0${stopwatchState?.min}`}
        </Typography>
        <Typography sx={{ ...fontStyles }}>:</Typography>
        <Typography sx={{ ...fontStyles }}>
          {stopwatchState?.sec?.toString()?.length > 1
            ? stopwatchState?.sec
            : `0${stopwatchState?.sec}`}
          .
          {stopwatchState?.milliSec?.toString()?.length > 1
            ? stopwatchState?.milliSec
            : `0${stopwatchState?.milliSec}`}
        </Typography>
      </Box>
      <Box width="30%" display="flex" justifyContent="right">
        <IconButton
          children={
            <RestartAltRoundedIcon
              sx={{ color: "white", fontSize: { xs: 40, md: 30 } }}
            />
          }
          onClick={handleReset}
        />
      </Box>
    </Box>
  );
};

export default StopwatchView;

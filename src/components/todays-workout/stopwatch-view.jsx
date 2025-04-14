import {Box, IconButton, Typography} from "@mui/material";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import PauseCircleFilledRoundedIcon from "@mui/icons-material/PauseCircleFilledRounded";
import {useContext, useEffect, useRef, useState} from "react";
import MyContext from "../context/my-context";

const StopwatchView = () => {
  const {handlePlayPause, handleReset, stopwatchState, isPlay} =
    useContext(MyContext);

  const timerHandler = (time, colon) => {
    return `${time?.toString()?.length > 1 ? time : `0${time || "0"}`}`;
  };

  const fontStyles = {
    color: "white",
    fontSize: {xs: 30, md: 20},
    fontWeight: 500,
    fontFamily: "Poppins, sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  };
  return (
    <Box
      width="100%"
      height='100%'
      maxHeight="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box width={{xs: "20%", md: "30%"}}>
        <IconButton
          children={
            <>
              {isPlay ? (
                <PauseCircleFilledRoundedIcon
                  sx={{color: "white", fontSize: {xs: 40, md: 30}}}
                  onClick={() => {
                    handlePlayPause("pause");
                  }}
                />
              ) : (
                <PlayCircleRoundedIcon
                  sx={{color: "white", fontSize: {xs: 40, md: 30}}}
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
        width={{xs: "60%", md: "40%"}}
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        alignContent="center"
        columnGap={0.5}
      >
        <Box
          width={{xs: "70%", md: "22%"}}
          height="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          alignContent="center"
        >
          <Box
            width="30%"
            sx={{...fontStyles}}
            children={`${timerHandler(stopwatchState?.hour)}`}
          />
          <Box width="5%" sx={{...fontStyles}} children=":" />
          <Box
            width="30%"
            sx={{...fontStyles}}
            children={`${timerHandler(stopwatchState?.min)}`}
          />
          <Box width="5%" sx={{...fontStyles}} children=":" />
          <Box
            width="30%"
            sx={{...fontStyles}}
            children={timerHandler(stopwatchState?.sec)}
          />
        </Box>
      </Box>
      <Box width={{xs: "20%", md: "30%"}} display="flex" justifyContent="right">
        <IconButton
          children={
            <RestartAltRoundedIcon
              sx={{color: "white", fontSize: {xs: 40, md: 30}}}
            />
          }
          onClick={handleReset}
        />
      </Box>
    </Box>
  );
};

export default StopwatchView;

import { Box, IconButton } from "@mui/material";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import PauseCircleFilledRoundedIcon from "@mui/icons-material/PauseCircleFilledRounded";
import { useContext } from "react";
import MyContext from "../context/my-context";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";

const StopwatchView = () => {
  const { handlePlayPause, handleReset, stopwatchState, isPlay } =
    useContext(MyContext);
  const navigate = useNavigate();

  const timerHandler = (time, colon) => {
    return `${time?.toString()?.length > 1 ? time : `0${time || "0"}`}`;
  };

  const fontStyles = {
    color: "white",
    fontSize: { xs: 25, md: 20 },
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
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <IconButton
        children={
          <>
            {isPlay ? (
              <PauseCircleFilledRoundedIcon
                fontSize="large"
                sx={{ color: "white" }}
                onClick={() => {
                  handlePlayPause("pause");
                }}
              />
            ) : (
              <PlayCircleRoundedIcon
                fontSize="large"
                sx={{ color: "white" }}
                onClick={() => {
                  handlePlayPause("play");
                }}
              />
            )}
          </>
        }
      />

      <IconButton
        children={
          <RestartAltRoundedIcon fontSize="large" sx={{ color: "white" }} />
        }
        onClick={handleReset}
      />
      <Box
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        alignContent="center"
        columnGap={0.5}
      >
        <Box
          height="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={1}
        >
          <Box
            sx={{ ...fontStyles }}
            children={`${timerHandler(stopwatchState?.hour)}`}
          />
          <Box sx={{ ...fontStyles }} children=":" />
          <Box
            sx={{ ...fontStyles }}
            children={`${timerHandler(stopwatchState?.min)}`}
          />
          <Box sx={{ ...fontStyles }} children=":" />
          <Box
            sx={{ ...fontStyles }}
            children={timerHandler(stopwatchState?.sec)}
          />
        </Box>
      </Box>
      <IconButton
        children={<ExitToAppIcon fontSize="large" sx={{ color: "#1976d2" }} />}
        onClick={() => navigate("/home")}
      />
    </Box>
  );
};

export default StopwatchView;

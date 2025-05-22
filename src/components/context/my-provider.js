// MyProvider.js
import React, {useRef, useState} from "react";
import MyContext from "./my-context";

const MyProvider = ({children}) => {
  const intervalRef = useRef(null);
  const timeRef = useRef({milliSec: 0, sec: 0, min: 0});
  const [isPlay, setIsPlay] = useState(false);
  const [stopwatchState, setStopwatchState] = useState({
    milliSec: 0,
    sec: 0,
    min: 0,
    hour: 0,
  });
  console.log("==stopwatch", stopwatchState);

  const handlePlayPause = (mode) => {
    setIsPlay((prev) => !prev);

    if (mode === "play") {
      if (!intervalRef.current) {
        intervalRef.current = setInterval(() => {
          timeRef.current.sec += 1;
          if (timeRef.current.sec === 60) {
            timeRef.current.sec = 0;
            timeRef.current.min += 1;
          }
          if (timeRef.current.min === 60) {
            timeRef.current.min = 0;
            timeRef.current.hour = (timeRef.current.hour ?? 0) + 1;
          }

          // Update UI state
          setStopwatchState({...timeRef.current});
        }, 1000);
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
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    timeRef.current.sec = 0;
    timeRef.current.min = 0;
    timeRef.current.hour = 0;

    setStopwatchState({sec: 0, min: 0, hour: 0});
  };

  return (
    <MyContext.Provider
      value={{handlePlayPause, handleReset, stopwatchState, isPlay}}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;

import React, { useState } from "react";

const useCreateWorkout = () => {
  const [weekHeaders, setWeekHeaders] = useState([
    { day: "Sunday", workouts: [{ title: "chest" }] },
    { day: "Monday" },
    { day: "Tuesday" },
    { day: "Wednesday" },
    { day: "Thursday" },
    { day: "Friday" },
    { day: "Saturday" },
  ]);
  const [workouts, setWorkouts] = useState([
    { title: "push" },
    { title: "pull" },
    { title: "leg" },
    { title: "push" },
    { title: "pull" },
    { title: "leg" },
    { title: "rest" },
  ]);

  return { weekHeaders ,workouts};
};

export default useCreateWorkout;

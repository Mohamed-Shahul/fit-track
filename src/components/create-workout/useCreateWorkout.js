import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const useCreateWorkout = () => {
  const navigate = useNavigate();
  const [weekHeaders, setWeekHeaders] = useState([
    { day: "Sunday", workouts: [{ title: "chest" }] },
    { day: "Monday" },
    { day: "Tuesday" },
    { day: "Wednesday" },
    { day: "Thursday" },
    { day: "Friday" },
    { day: "Saturday" },
  ]);
  const days = [
    "Monday",
    "Sunday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [workouts, setWorkouts] = useState([
    { title: "push" },
    { title: "pull" },
    { title: "leg" },
    { title: "push" },
    { title: "pull" },
    { title: "pull" },
    { title: "pull" },
    { title: "pull" },
    { title: "leg" },
  ]);

  const structure = {
    Monday: {
      pushups: {
        otherDetails: {
          title: "",
          notes: "",
        },
        reps: {
          set1reps: 1,
          set2reps: 1,
          set3reps: 1,
          set4reps: 1,
        },
        weights: {
          set1weights: 10,
          set2weights: 10,
          set3weights: 10,
          set4weights: 10,
        },
      },
      dumbelfly: {},
    },
    Tuesday: { pullups: {}, dumbellCurl: {} },
    Wednesday: { squad: {}, legpress: {} },
    Thursday: {},
    Friday: {},
    Saturday: {},
    Sunday: {},
  };

  const weekDays = Array.from({ length: 7 }, (_, i) => ({
    [dayjs().day(i).format("dddd")]: {},
  }));

  console.log("==che",weekDays);

  // MARK: States
  const [workoutDetails, setWorkoutDetails] = useState({
    splitName: "",
  });

  // MARK: Handle Workout list
  const defaultWorkoutRow = { title: "" };
  const [workoutList, setWorkoutList] = useState([]);
  const handleAddWorkout = () => {
    setWorkoutList((prev) => [...prev, defaultWorkoutRow]);
  };

  const handleRemoveWorkout = (i) => {
    const filteredList = workoutList?.filter((row, rowIndex) => rowIndex !== i);
    setWorkoutList(filteredList);
  };

  return {
    weekHeaders,
    workouts,
    structure,
    days,
    workoutList,
    handleAddWorkout,
    handleRemoveWorkout,
    navigate,
  };
};

export default useCreateWorkout;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
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
          set1reps: 0,
          set2reps: 0,
          set3reps: 0,
          set4reps: 0,
        },
        weights: {
          set1weights: 0,
          set2weights: 0,
          set3weights: 0,
          set4weights: 0,
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

  // MARK: States
  const [workoutDetails, setWorkoutDetails] = useState({
    splitName: "",
    selectedDay: dayjs().format("dddd"),
    Monday: {},
    Tuesday: {},
    Wednesday: {},
    Thursday: {},
    Friday: {},
    Saturday: {},
    Sunday: {},
  });

  useEffect(() => {
    const repsObj = {
      set1reps:
        workoutDetails?.[workoutDetails?.selectedDay]?.reps?.set1reps || 0,
      set2reps:
        workoutDetails?.[workoutDetails?.selectedDay]?.reps?.set2reps || 0,
      set3reps:
        workoutDetails?.[workoutDetails?.selectedDay]?.reps?.set3reps || 0,
      set4reps:
        workoutDetails?.[workoutDetails?.selectedDay]?.reps?.set4reps || 0,
    };
    const weightsObj = {
      set1weights:
        workoutDetails?.[workoutDetails?.selectedDay]?.weights?.set1weights ||
        0,
      set2weights:
        workoutDetails?.[workoutDetails?.selectedDay]?.weights?.set2weights ||
        0,
      set3weights:
        workoutDetails?.[workoutDetails?.selectedDay]?.weights?.set3weights ||
        0,
      set4weights:
        workoutDetails?.[workoutDetails?.selectedDay]?.weights?.set4weights ||
        0,
    };
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    weekdays?.forEach((day) => {
      setWorkoutDetails((prev) => ({
        ...prev,
        [day]: { ...prev?.[day], reps: repsObj, weights: weightsObj },
      }));
    });
  }, []);
  console.log("==details", workoutDetails);

  // MARK: Handle Workout list
  const handleAddWorkout = () => {
    const prevList = [
      ...(workoutDetails?.[workoutDetails?.selectedDay]?.workoutList || []),
    ];
    setWorkoutDetails((prev) => ({
      ...prev,
      [workoutDetails?.selectedDay]: {
        ...workoutDetails?.[workoutDetails?.selectedDay],
        workoutList: [...prevList, { name: "" }],
      },
    }));
  };

  const handleRemoveWorkout = (i) => {
    const filteredList = workoutDetails?.[
      workoutDetails?.selectedDay
    ]?.workoutList?.filter((row, rowIndex) => rowIndex !== i);
    setWorkoutDetails((prev) => ({
      ...prev,
      [workoutDetails?.selectedDay]: {
        workoutList: filteredList,
      },
    }));
  };

  const handleWorkoutOnChange = (e, i) => {
    const value = e?.target?.value;
    const tempList = [
      ...workoutDetails?.[workoutDetails?.selectedDay]?.workoutList,
    ];
    tempList[i].name = value;
    setWorkoutDetails((prev) => ({
      ...prev,
      [workoutDetails?.selectedDay]: {
        ...prev?.[workoutDetails?.selectedDay],
        workoutList: tempList,
      },
    }));
  };

  return {
    weekHeaders,
    workouts,
    structure,
    days,
    handleAddWorkout,
    handleRemoveWorkout,
    navigate,
    workoutDetails,
    handleWorkoutOnChange,
    setWorkoutDetails,
  };
};

export default useCreateWorkout;

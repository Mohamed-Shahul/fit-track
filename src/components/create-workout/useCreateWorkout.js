/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { getAuth } from "firebase/auth";

const useCreateWorkout = () => {
  const loggedInUseName = localStorage.getItem("USER_NAME");
  const loggedInUserEmail = localStorage.getItem("USER_EMAIL");
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

  // MARK: Firebase database fetch
  const [dbCollections, setDbCollections] = useState([]);
  useEffect(() => {
    const collectionRef = collection(db, "fit-track");
    getDocs(collectionRef)
      .then((snapshot) => {
        let result = [];
        snapshot.docs.forEach((doc) => {
          result.push({ ...doc.data(), id: doc.id });
        });
        setDbCollections(result);
      })
      .catch((err) => console.log("==err", err));
  }, []);
  console.log("==db", dbCollections);

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
      workoutDetails?.[workoutDetails?.selectedDay]?.weights?.set1weights || 0,
    set2weights:
      workoutDetails?.[workoutDetails?.selectedDay]?.weights?.set2weights || 0,
    set3weights:
      workoutDetails?.[workoutDetails?.selectedDay]?.weights?.set3weights || 0,
    set4weights:
      workoutDetails?.[workoutDetails?.selectedDay]?.weights?.set4weights || 0,
  };
  const auth = getAuth();
  const user = auth.currentUser;
  console.log("==user", user);

  useEffect(() => {
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    // weekdays?.forEach((day) => {
    //   setWorkoutDetails((prev) => ({
    //     ...prev,
    //     [day]: { ...prev?.[day], reps: repsObj, weights: weightsObj },
    //   }));
    // });
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
        workoutList: [
          ...prevList,
          {
            name: "",
            reps: { set1Reps: 0, set2Reps: 0, set3Reps: 0, set4Reps: 0 },
            weights: {
              set1Weights: 0,
              set2Weights: 0,
              set3Weights: 0,
              set4Weights: 0,
            },
          },
        ],
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

  const handleSaveWorkout = async () => {
    const userId = dbCollections?.filter(
      (row) => row?.EMAIL === loggedInUserEmail
    )?.[0]?.id;
    try {
      const userRef = doc(db, "fit-track", userId);
      await updateDoc(userRef, {
        DETAILS: workoutDetails,
      });
      navigate("/home");
    } catch (error) {
      console.error("Error updating user:", error);
    }
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
    handleSaveWorkout,
  };
};

export default useCreateWorkout;

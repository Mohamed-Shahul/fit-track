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

  const days = [
    "Monday",
    "Sunday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

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

  const [radioButtonValue, setRadioButtonValue] = useState("create");
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
    const userDetails = dbCollections?.filter(
      (row) => row?.EMAIL === loggedInUserEmail
    );
    try {
      const userRef = doc(db, "fit-track", userDetails?.[0]?.id);
      await updateDoc(userRef, {
        DETAILS: {
          ...userDetails?.[0]?.DETAILS,
          [workoutDetails?.splitName]: workoutDetails,
        },
      });
      navigate("/home");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return {
    days,
    handleAddWorkout,
    handleRemoveWorkout,
    navigate,
    workoutDetails,
    handleWorkoutOnChange,
    setWorkoutDetails,
    handleSaveWorkout,
    radioButtonValue,
    setRadioButtonValue,
  };
};

export default useCreateWorkout;

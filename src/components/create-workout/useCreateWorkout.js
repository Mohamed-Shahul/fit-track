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
  const [isDelete, setIsDelete] = useState({ state: false, index: 0 });
  const [splitList, setSplitList] = useState([]);
  const [selectedDay, setSelectedDay] = useState(dayjs().format("dddd"));
  const [selectedSplit, setSelectedSplit] = useState("");

  const defaultWorkoutDetailsState = {
    splitName: "",
    Monday: {},
    Tuesday: {},
    Wednesday: {},
    Thursday: {},
    Friday: {},
    Saturday: {},
    Sunday: {},
  };
  const [workoutDetails, setWorkoutDetails] = useState({});
  //   {
  //   splitName: "",
  //   Monday: {},
  //   Tuesday: {},
  //   Wednesday: {},
  //   Thursday: {},
  //   Friday: {},
  //   Saturday: {},
  //   Sunday: {},
  // }

  const [radioButtonValue, setRadioButtonValue] = useState("create");
  console.log("==details", workoutDetails);

  // MARK: Handle Workout list
  const handleAddWorkout = () => {
    const prevList = [
      ...(workoutDetails?.[selectedSplit]?.[selectedDay]?.workoutList || []),
    ];
    setWorkoutDetails((prev) => ({
      ...prev,
      [selectedSplit]: {
        ...prev?.[selectedSplit],
        [selectedDay]: {
          workoutList: [
            ...prevList,
            {
              name: "",
              notes: "",
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
      },
    }));
  };

  const handleRemoveWorkout = (i) => {
    const filteredList = workoutDetails?.[selectedSplit]?.[
      selectedDay
    ]?.workoutList?.filter((row, rowIndex) => rowIndex !== i);
    setWorkoutDetails((prev) => ({
      ...prev,
      [selectedSplit]: {
        ...prev?.[selectedSplit],
        [selectedDay]: {
          workoutList: filteredList,
        },
      },
    }));
    setIsDelete((prev) => ({
      ...prev,
      state: false,
    }));
  };

  const handleWorkoutOnChange = (e, i) => {
    const value = e?.target?.value;
    const tempList = [
      ...workoutDetails?.[selectedSplit]?.[selectedDay]?.workoutList,
    ];
    tempList[i].name = value;
    setWorkoutDetails((prev) => ({
      ...prev,
      [selectedSplit]: {
        ...prev?.[selectedSplit],
        [selectedDay]: {
          workoutList: tempList,
        },
      },
    }));
  };

  // MARK: Handle edit radio fetch details
  const handleEditRadioFetch = (value) => {
    setRadioButtonValue(value);
    setSelectedSplit("");
    setWorkoutDetails({});
    if (value === "edit") {
      const userDetails = dbCollections?.filter(
        (row) => row?.EMAIL === loggedInUserEmail
      );
      const splitDetailsList = Object.keys(userDetails?.[0]?.DETAILS);
      setSplitList(splitDetailsList);
    }
  };

  const handleSplitSelectionFetch = (value) => {
    setSelectedSplit(value);
    const loggedInuserDetails = dbCollections?.filter(
      (row) => row?.EMAIL === loggedInUserEmail
    );
    const selectedWorkoutSplit = loggedInuserDetails?.[0]?.DETAILS?.[value];
    setWorkoutDetails((prev) => ({
      ...prev,
      [value]: selectedWorkoutSplit,
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
          // [workoutDetails?.splitName]: workoutDetails,
          ...workoutDetails,
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
    selectedDay,
    setSelectedDay,
    splitList,
    setSplitList,
    selectedSplit,
    setSelectedSplit,
    handleEditRadioFetch,
    handleSplitSelectionFetch,
    defaultWorkoutDetailsState,
    isDelete,
    setIsDelete,
  };
};

export default useCreateWorkout;

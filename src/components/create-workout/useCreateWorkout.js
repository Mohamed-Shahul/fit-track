/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { findAllByDisplayValue } from "@testing-library/dom";

const useCreateWorkout = () => {
  const loggedInUserEmail = localStorage.getItem("USER_EMAIL");
  const navigate = useNavigate();

  // MARK: States
  const [isDelete, setIsDelete] = useState({ state: false, index: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [radioButtonValue, setRadioButtonValue] = useState("create");
  const [splitList, setSplitList] = useState([]);
  const [selectedDay, setSelectedDay] = useState(dayjs().format("dddd"));
  const [selectedSplit, setSelectedSplit] = useState("");
  const [workoutDetails, setWorkoutDetails] = useState({});
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
  const days = [
    "Monday",
    "Sunday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  console.log("==details", workoutDetails);

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

  const handleDeleteSplit = async () => {
    setIsDelete((prev) => ({
      ...prev,
      state: false,
    }));
    setIsLoadingDelete(true);
    const userDetails = dbCollections?.filter(
      (row) => row?.EMAIL === loggedInUserEmail
    );
    try {
      const userRef = doc(db, "fit-track", userDetails?.[0]?.id);
      const { [selectedSplit]: removed, ...restDetails } =
        userDetails[0].DETAILS;
      await updateDoc(userRef, {
        DETAILS: {
          ...restDetails,
        },
      });
      setIsLoadingDelete(false);
      navigate("/home");
    } catch (error) {
      setIsLoading(false);
      console.error("Error deleting user:", error);
    }
  };

  // MARK: Handle save
  const handleSaveWorkout = async () => {
    setIsLoading(true);
    const userDetails = dbCollections?.filter(
      (row) => row?.EMAIL === loggedInUserEmail
    );
    try {
      const userRef = doc(db, "fit-track", userDetails?.[0]?.id);
      await updateDoc(userRef, {
        DETAILS: {
          ...userDetails?.[0]?.DETAILS,
          ...workoutDetails,
        },
      });
      setIsLoading(false);
      navigate("/home");
    } catch (error) {
      setIsLoading(false);
      console.error("Error updating user:", error);
    }
  };

  return {
    handleDeleteSplit,
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
    isLoading,
    isLoadingDelete,
  };
};

export default useCreateWorkout;

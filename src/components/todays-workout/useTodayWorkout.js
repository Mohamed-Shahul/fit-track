/* eslint-disable react-hooks/exhaustive-deps */
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../../firebase/config";
import dayjs from "dayjs";

const useTodaysWokout = () => {
  const loggedInUserEmail = localStorage.getItem("USER_EMAIL");
  const navigate = useNavigate();
  const location = useLocation();

  // MARK: States
  const todaysTitleFormat = dayjs().format("dddd");
  const [splitList, setSplitList] = useState([]);
  const [workoutList, setWorkoutList] = useState([]);
  const daysList = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const [selectedDay, setSelectedDay] = useState(todaysTitleFormat);
  const [selectedSplit, setSelectedSplit] = useState("");
  const [selectedWorkout, setSelectedWorkout] = useState("");
  const [workoutDetails, setWorkoutDetails] = useState({});

  console.log("==details", workoutDetails);

  // MARK: Firebase database fetch
  const [dbCollections, setDbCollections] = useState([]);
  console.log("==db", dbCollections);

  useEffect(() => {
    const collectionRef = collection(db, "fit-track");
    getDocs(collectionRef)
      .then((snapshot) => {
        let result = [];
        snapshot.docs.forEach((doc) => {
          result.push({ ...doc.data(), id: doc.id });
        });
        setDbCollections(result);
        handleInitialFetch(result);
      })
      .catch((err) => console.log("==err", err));
  }, []);

  const handleInitialFetch = (result) => {
    const loggedInuserDetails = result?.filter(
      (row) => row?.EMAIL === loggedInUserEmail
    );
    // const selectedWorkoutSplit =
    //   loggedInuserDetails?.[0]?.DETAILS?.["Push pull leg"];
    // // setWorkoutDetails({[selectedWorkoutSplit]: selectedWorkoutSplit });
    // setWorkoutDetails({ "Push pull leg": selectedWorkoutSplit });
    const userSplitLists = Object.keys(loggedInuserDetails?.[0]?.DETAILS);
    setSplitList(userSplitLists);
    // setSelectedSplit(selectedWorkoutSplit?.splitName); // new key selectedWorkoutSplit currently hardcoded
    // const todaysWorkoutList = selectedWorkoutSplit?.[
    //   todaysTitleFormat
    // ]?.workoutList?.map((row) => row?.name);
    // setWorkoutList(todaysWorkoutList);
    // setSelectedWorkout(todaysWorkoutList?.[0]);
  };

  // MARK: Onchange
  const repsOnChange = (props) => {
    const { e, selectedWorkoutRepsObj, selectedWorkoutList, i } = props;
    const typedValue = e?.target?.value?.toString() || "0";
    const value =
      typedValue === "0"
        ? typedValue
        : typedValue?.toString()?.replace(/^0+/, "");
    selectedWorkoutRepsObj[`set${i + 1}Reps`] = value;
    setWorkoutDetails((prev) => ({
      ...prev,
      [selectedSplit]: {
        ...prev?.[selectedSplit],
        [selectedDay]: {
          workoutList: selectedWorkoutList?.map((row) => {
            if (row?.name === selectedWorkout) {
              return {
                ...row,
                reps: selectedWorkoutRepsObj,
              };
            } else {
              return { ...row };
            }
          }),
        },
      },
    }));
  };

  const weightsOnChange = (props) => {
    const { e, selectedWorkoutWeightsObj, selectedWorkoutList, i } = props;
    const typedValue = e?.target?.value?.toString() || "0";
    const value =
      typedValue === "0"
        ? typedValue
        : typedValue?.toString()?.replace(/^0+/, "");
    selectedWorkoutWeightsObj[`set${i + 1}Weights`] = value;
    setWorkoutDetails((prev) => ({
      ...prev,
      [selectedSplit]: {
        ...prev?.[selectedSplit],
        [selectedDay]: {
          workoutList: selectedWorkoutList?.map((row) => {
            if (row?.name === selectedWorkout) {
              return {
                ...row,
                weights: selectedWorkoutWeightsObj,
              };
            } else {
              return { ...row };
            }
          }),
        },
      },
    }));
  };

  const handleSelectSplitAutoCompleteOnChange = (newValue) => {
    setSelectedSplit(newValue);
    const loggedInuserDetails = dbCollections?.filter(
      (row) => row?.EMAIL === loggedInUserEmail
    );
    const selectedWorkoutSplit = loggedInuserDetails?.[0]?.DETAILS?.[newValue];
    setWorkoutDetails((prev) => ({
      ...prev,
      [newValue]: selectedWorkoutSplit,
    }));
    const todaysWorkoutList = selectedWorkoutSplit?.[
      selectedDay
    ]?.workoutList?.map((row) => row?.name);
    setWorkoutList(todaysWorkoutList || []);
    setSelectedWorkout(todaysWorkoutList?.[0]);
  };

  // useEffect(() => {
  //   const handleBeforeUnload = (e) => {
  //     e.preventDefault();
  //     e.returnValue = ""; // Required for most browsers
  //     console.log('==test');

  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, [location]);

  // MARK: Handle update
  const handleUpdate = async () => {
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
      // navigate("/home");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return {
    dbCollections,
    setWorkoutList,
    selectedDay,
    handleUpdate,
    setSelectedDay,
    navigate,
    splitList,
    workoutList,
    daysList,
    workoutDetails,
    selectedSplit,
    selectedWorkout,
    setWorkoutDetails,
    setSelectedSplit,
    setSelectedWorkout,
    loggedInUserEmail,
    repsOnChange,
    weightsOnChange,
    handleSelectSplitAutoCompleteOnChange,
  };
};

export default useTodaysWokout;

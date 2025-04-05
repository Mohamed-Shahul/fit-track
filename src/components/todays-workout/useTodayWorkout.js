/* eslint-disable react-hooks/exhaustive-deps */
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import  { useEffect, useState } from "react";
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
    "Sunday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
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
    const selectedWorkoutSplit =
      loggedInuserDetails?.[0]?.DETAILS?.["Push pull leg"];
    // setWorkoutDetails({[selectedWorkoutSplit]: selectedWorkoutSplit });
    setWorkoutDetails({ "Push pull leg": selectedWorkoutSplit });

    const userSplitLists = Object.keys(loggedInuserDetails?.[0]?.DETAILS);
    setSplitList(userSplitLists);
    setSelectedSplit(selectedWorkoutSplit?.splitName); // new key selectedWorkoutSplit currently hardcoded

    const todaysWorkoutList = selectedWorkoutSplit?.[
      todaysTitleFormat
    ]?.workoutList?.map((row) => row?.name);
    setWorkoutList(todaysWorkoutList);

    setSelectedWorkout(todaysWorkoutList?.[0]);
    result?.forEach((row, i) => {});
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
  };
};

export default useTodaysWokout;

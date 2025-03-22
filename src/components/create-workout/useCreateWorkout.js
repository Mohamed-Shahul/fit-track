import React, {useState} from "react";

const useCreateWorkout = () => {
  const [weekHeaders, setWeekHeaders] = useState([
    {day: "Sunday", workouts: [{title: "chest"}]},
    {day: "Monday"},
    {day: "Tuesday"},
    {day: "Wednesday"},
    {day: "Thursday"},
    {day: "Friday"},
    {day: "Saturday"},
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
    {title: "push"},
    {title: "pull"},
    {title: "leg"},
    {title: "push"},
    {title: "pull"},
    {title: "pull"},
    {title: "pull"},
    {title: "pull"},
    {title: "leg"},
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
    Tuesday: {pullups: {}, dumbellCurl: {}},
    Wednesday: {squad: {}, legpress: {}},
    Thursday: {},
    Friday: {},
    Saturday: {},
    Sunday: {},
  };

  return {weekHeaders, workouts, structure,days};
};

export default useCreateWorkout;

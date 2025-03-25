import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

const useChooseWorkout = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([
    {
      title: "split1",
      url: "/todays-workout",
      // icon: TodaySharpIcon,
    },
    {
      title: `split2`,
      url: "/create-workout",
      // icon: AddCircleOutlineSharpIcon,
    },
    {
      title: "split3",
      url: "/choose-workout",
      // icon: FactCheckSharpIcon,
    },
  ]);

  return {navigate, items};
};

export default useChooseWorkout;

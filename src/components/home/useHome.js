import { useState } from "react";
import AddCircleOutlineSharpIcon from "@mui/icons-material/AddCircleOutlineSharp";
import FactCheckSharpIcon from "@mui/icons-material/FactCheckSharp";
import TodaySharpIcon from "@mui/icons-material/TodaySharp";

const useHome = () => {
  const [items, setItems] = useState([
    {
      title: "Choose workout plan",
      url: "/choose-workout",
      icon: FactCheckSharpIcon,
    },
    {
      title: "Create new workout plan",
      url: "/create-workout",
      icon: AddCircleOutlineSharpIcon,
    },
    {
      title: "Today's Workout plan",
      url: "/todays-workout",
      icon: TodaySharpIcon,
    },
  ]);
  return {
    items,
    setItems,
  };
};

export default useHome;

import { useState } from "react";
import AddCircleOutlineSharpIcon from "@mui/icons-material/AddCircleOutlineSharp";
import FactCheckSharpIcon from "@mui/icons-material/FactCheckSharp";
import TodaySharpIcon from "@mui/icons-material/TodaySharp";
import { useNavigate } from "react-router-dom";

const useHome = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([
    {
      title: `Make workout plan`,
      url: "/create-workout",
      icon: AddCircleOutlineSharpIcon,
    },
    {
      title: "Today's workout plan",
      url: "/todays-workout",
      icon: TodaySharpIcon,
    },

    // {
    //   title: "Choose workout plan",
    //   url: "/choose-workout",
    //   icon: FactCheckSharpIcon,
    // },
  ]);
  return {
    items,
    setItems,
    navigate,
  };
};

export default useHome;

import { useState } from "react";
import AddCircleOutlineSharpIcon from "@mui/icons-material/AddCircleOutlineSharp";
import { useNavigate } from "react-router-dom";
import FitnessCenterRoundedIcon from "@mui/icons-material/FitnessCenterRounded";

const useHome = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([
    {
      title: `Create workouts`,
      url: "/create-workout",
      icon: AddCircleOutlineSharpIcon,
    },
    {
      title: "Today workouts",
      url: "/todays-workout",
      icon: FitnessCenterRoundedIcon,
    },
  ]);
  return {
    items,
    setItems,
    navigate,
  };
};

export default useHome;

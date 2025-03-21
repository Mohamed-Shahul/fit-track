import  {useState} from "react";
import { useNavigate } from "react-router-dom";

const useAppBar = () => {
    const navigate=useNavigate()
  const [menuList, setMenuList] = useState([{title: "Home", url: "/"}]);

  return {
    menuList,
    setMenuList,
    navigate
  };
};

export default useAppBar;

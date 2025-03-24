import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useAppBar = () => {
  const navigate = useNavigate();
  const [openAccountInfoPopup, setOpenAccountInfoPopup] = useState({
    state: false,
    anchorEl: "",
  });

  return {
    navigate,
    openAccountInfoPopup,
    setOpenAccountInfoPopup,
  };
};

export default useAppBar;

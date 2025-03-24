import React from "react";
import { useNavigate } from "react-router-dom";

const useLogIn = () => {
  const navigate = useNavigate();
  return {
    navigate,
  };
};

export default useLogIn;

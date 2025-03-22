import React from "react";

const useCustomHook = () => {
  const commonTextFieldStyles = {
    "& .MuiOutlinedInput-input": {
      textAlign: "center",
      color: "white",
    },
    "& .MuiOutlinedInput-root": {
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
  };

  return {
    commonTextFieldStyles,
  };
};

export default useCustomHook;

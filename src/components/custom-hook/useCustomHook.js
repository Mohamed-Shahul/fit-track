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
    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    "& input[type=number]": {
      "-moz-appearance": "textfield",
    },
  };

  return {
    commonTextFieldStyles,
  };
};

export default useCustomHook;

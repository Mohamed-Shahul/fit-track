import cloudBg from "../../images/cloudBg.jpg";

const useCustomHook = () => {
  const commonTextFieldStyles = {
    "& .MuiOutlinedInput-input": {
      textAlign: "center",
      color: "white",
    },
    "& .MuiInputBase-input": {
      color: "white",
      fontFamily: "Poppins, sans-serif",
      fontWeight: 500,
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

  const entryTextFieldsStyles = {
    "& .MuiInputLabel-root": {
      color: "white",
      fontWeight: 500,
      fontFamily: "Poppins, sans-serif",
    },
    "& .MuiInputBase-input": {
      color: "white",
      fontFamily: "Poppins, sans-serif",
      fontWeight: 500,
    },
    "& .MuiInputBase-input::placeholder": {
      color: "white",
      fontWeight: 500,
      fontFamily: "Poppins, sans-serif",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "white",
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: 1,
      "&:hover fieldset": {
        borderColor: "white", // Border color on hover
      },
      "&.Mui-focused fieldset": {
        borderColor: "white", // Border color when focused
      },
    },
    "& .MuiFilledInput-underline": {
      "&:before": {borderBottom: "2px solid #1565c0"}, // Default underline
      "&:hover:before": {borderBottom: "2px solid #1565c0"}, // Hover effect
      "&:after": {borderBottom: "2px solid #1565c0"}, // Focused state
    },
    "& .MuiSvgIcon-root": {
      color: "white", // Change to desired color
    },
    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    "& input[type=number]": {
      "-moz-appearance": "textfield",
    },
  };
  const logInTextFieldsStyles = {
    "& .MuiInputLabel-root": {
      color: "silver",
      fontWeight: 500,
      fontFamily: "Poppins, sans-serif",
    },
    "& .MuiInputBase-input": {
      color: "silver",
      fontFamily: "Poppins, sans-serif",
      fontWeight: 500,
    },
    "& .MuiInputBase-input::placeholder": {
      color: "silver",
      fontWeight: 400,
      fontFamily: "Poppins, sans-serif",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "silver",
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: 1,
      "&:hover fieldset": {
        borderColor: "silver", // Border color on hover
      },
      "&.Mui-focused fieldset": {
        borderColor: "silver", // Border color when focused
      },
    },
    "& .MuiFilledInput-underline": {
      "&:before": {borderBottom: "2px solid #1565c0"}, // Default underline
      "&:hover:before": {borderBottom: "2px solid #1565c0"}, // Hover effect
      "&:after": {borderBottom: "2px solid #1565c0"}, // Focused state
    },
    "& .MuiSvgIcon-root": {
      color: "silver", // Change to desired color
    },
    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    "& input[type=number]": {
      "-moz-appearance": "textfield",
    },
  };

  const cloudBgImg = {
    // backgroundImage: `
    //           linear-gradient(to right, black 50%, transparent 100%),
    //           url(${cloudBg})
    //         `,
    //     backgroundImage: `
    //   linear-gradient(to right, rgba(0, 0, 0, 0.7) 30%, rgba(0, 0, 0, 0.3) 70%, transparent 100%),
    //   url(${cloudBg})
    // `,
    //     backgroundSize: "cover",
    //     backgroundPosition: "center",
    //     backgroundRepeat: "no-repeat",
  };

  const scrollBarStyle = {
    /* Scrollbar Styles */
    "&::-webkit-scrollbar": {
      width: "5px", // Width of the scrollbar
    },
    "&::-webkit-scrollbar-track": {
      background: "#2c2c2c", // Dark background for contrast
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "linear-gradient(120deg, #C0C0C0, #E0E0E0, #F5F5F5)", // Silver gradient
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "linear-gradient(120deg, #B0B0B0, #D0D0D0, #FFFFFF)", // Brighter silver on hover
    },
  };

  return {
    commonTextFieldStyles,
    entryTextFieldsStyles,
    cloudBgImg,
    scrollBarStyle,
    logInTextFieldsStyles,
  };
};

export default useCustomHook;

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

  // const skewXelementForWeekDay = (props) => {
  //     const {day, title} = props;
  //     return (
  //       <Box
  //         sx={{
  //           bgcolor: "rgba(76, 75, 75, 1)",
  //           color: "white",
  //           fontWeight: 500,
  //           borderRadius: 0.5,
  //           // borderRadius: 2,
  //           // minWidth: "40px",
  //           // maxWidth: "100px",
  //           textAlign: "center",
  //           transform: "skewX(-30deg) ",
  //           textDecoration: "none",
  //           mr: 0.5,
  //           p: 0.5,
  //         }}
  //       >
  //         <span style={{display: "inline-block", transform: "skewX(30deg)"}}>
  //           {day || title}
  //         </span>
  //       </Box>
  //     );
  //   };
  // const skewXelement = (props) => {
  //   const {day, title} = props;
  //   return (
  //     <Box
  //       sx={{
  //         bgcolor: "rgba(76, 75, 75, 1)",
  //         color: "white",
  //         fontWeight: 500,
  //         borderRadius: 0.5,
  //         // borderRadius: 2,
  //         minWidth: "40px",
  //         // maxWidth: "100px",
  //         textAlign: "center",
  //         transform: "skewX(-30deg) ",
  //         textDecoration: "none",
  //         mr: 0.5,
  //         p: 0.5,
  //       }}
  //     >
  //       <span style={{display: "inline-block", transform: "skewX(30deg)"}}>
  //         {day || title}
  //       </span>
  //     </Box>
  //   );
  // };

  return {
    commonTextFieldStyles,
  };
};

export default useCustomHook;

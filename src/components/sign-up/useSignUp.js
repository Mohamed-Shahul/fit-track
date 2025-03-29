/* eslint-disable no-unused-expressions */
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/config";

const useSignUp = () => {
  const navigate = useNavigate();

  // MARK: States
  const [userDetails, setUserDetails] = useState({
    name: "",
    mobileNo: "",
    email: "",
    password: "",
    isPasswordVisibility: false,
    isUserDetailIsInvalid: false,
    errorMsg: "",
  });
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  console.log("==userDetails", userDetails);

  // MARK: Validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const validateUserName = () => userDetails?.name?.length > 0;
  const validateEmail = () => emailRegex.test(userDetails?.email);
  const validatePassword = () => userDetails?.password?.length >= 8;
  const validateMobileNo = () => userDetails?.mobileNo?.length >= 10;
  const isUserDetailsIsInValid = () => {
    return (
      !validateMobileNo() ||
      !validateEmail() ||
      !validatePassword() ||
      !userDetails?.name?.length
    );
  };
  console.log("==valid", isUserDetailsIsInValid());

  // MARK: On change
  const handleOnChange = (e, field) => {
    const value = e?.target?.value || "";
    setUserDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // MARK: On blur
  const handleNameOnBlur = () => {
    const isInvalidName = !validateUserName();
    setOpenSnackBar(isInvalidName);
    setUserDetails((prev) => ({
      ...prev,
      errorMsg: isInvalidName ? "User name is required" : "",
    }));
  };
  const handleMobileNoOnBlur = () => {
    const isInvalidMobileNo = !validateMobileNo();
    setOpenSnackBar(isInvalidMobileNo);
    setUserDetails((prev) => ({
      ...prev,
      errorMsg: isInvalidMobileNo
        ? "Phone number must be at least 10 characters long"
        : "",
    }));
  };
  const handleEmailOnBlur = () => {
    const isInvalidEmail = !validateEmail();
    setOpenSnackBar(isInvalidEmail);
    setUserDetails((prev) => ({
      ...prev,
      errorMsg: isInvalidEmail ? "Invalid email" : "",
    }));
  };

  const handlePasswordOnBlur = () => {
    const isPasswordLengthIsLessThanTo8 = !validatePassword();
    setOpenSnackBar(isPasswordLengthIsLessThanTo8);
    setUserDetails((prev) => ({
      ...prev,
      errorMsg: isPasswordLengthIsLessThanTo8
        ? "Password should be greater than or equal to 8 characters"
        : "",
    }));
  };

  // MARK: Handle signup
  const handleSignUp = async () => {
    setIsLoading(true);

    const userData = {
      USER_NAME: userDetails?.name,
      EMAIL: userDetails?.email,
      PASSWORD: userDetails?.password,
      MOBILE_NO: userDetails?.mobileNo,
      CREATED_AT: new Date(),
      DETAILS: {},
    };
    try {
      await addDoc(collection(db, "fit-track"), userData);
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      Promise.reject(error);
      setOpenSnackBar(true);
      setUserDetails((prev) => ({
        ...prev,
        errorMsg: "Invalid Credentials",
      }));
      setIsLoading(false);
    }
  };
  return {
    navigate,
    userDetails,
    setUserDetails,
    handleOnChange,
    openSnackBar,
    setOpenSnackBar,
    handleSignUp,
    validateEmail,
    handleEmailOnBlur,
    validatePassword,
    handlePasswordOnBlur,
    isUserDetailsIsInValid,
    handleMobileNoOnBlur,
    handleNameOnBlur,
    isLoading,
  };
};

export default useSignUp;

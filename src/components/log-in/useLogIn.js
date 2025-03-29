import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/config";
import { login } from "../../utilis/auth";

const useLogIn = () => {
  const navigate = useNavigate();

  // MARK: States
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    isPasswordVisibility: false,
    isUserDetailIsInvalid: false,
    errorMsg: "",
  });
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // MARK: Validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const validateEmail = () => emailRegex.test(userDetails?.email);
  const isUserDetailsIsValid =
    validateEmail() && userDetails?.password?.length >= 8;

  // MARK: Firebase database fetch
  const [dbCollections, setDbCollections] = useState([]);
  useEffect(() => {
    const collectionRef = collection(db, "fit-track");
    getDocs(collectionRef)
      .then((snapshot) => {
        let result = [];
        snapshot.docs.forEach((doc) => {
          result.push({ ...doc.data(), id: doc.id });
        });
        setDbCollections(result);
      })
      .catch((err) => console.log("==err", err));
  }, []);

  // MARK: On change
  const handleOnChange = (e, field) => {
    const value = e?.target?.value || "";
    setUserDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // MARK: Handle login
  const handleLogin = () => {
    setIsLoading(true);
    const isExistedUser = dbCollections?.filter(
      (row) => row?.EMAIL === userDetails?.email
    );
    const existedPassword = isExistedUser?.[0]?.PASSWORD;
    const loggedInUserName = isExistedUser?.[0]?.USER_NAME;
    const loggedInUserEmail = isExistedUser?.[0]?.EMAIL;

    if (isExistedUser?.length) {
      if (existedPassword === userDetails?.password) {
        localStorage.setItem("USER_NAME", loggedInUserName);
        localStorage.setItem("USER_EMAIL", loggedInUserEmail);
        login();
      } else {
        setUserDetails((prev) => ({
          ...prev,
          errorMsg: "Invalid password",
        }));
        setOpenSnackBar(true);
        setIsLoading(false);
      }
    } else {
      setUserDetails((prev) => ({
        ...prev,
        errorMsg: "Invalid credentials",
      }));
      setOpenSnackBar(true);
      setIsLoading(false);
    }
  };

  return {
    navigate,
    handleLogin,
    userDetails,
    handleOnChange,
    setUserDetails,
    isUserDetailsIsValid,
    setOpenSnackBar,
    openSnackBar,
    isLoading,
  };
};

export default useLogIn;

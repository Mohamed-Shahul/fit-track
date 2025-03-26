import {addDoc, collection, getDocs} from "firebase/firestore";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {db} from "../../firebase/config";
import {login} from "../../utilis/auth";
import {Alert} from "@mui/material";

const useLogIn = () => {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    isPasswordVisibility: false,
  });

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const validateEmail = () => emailRegex.test(userDetails?.email);
  const isUserDetailsIsValid =
    validateEmail() && userDetails?.password?.length === 8;

  console.log("==valid", userDetails);

  // MARK: Firebase database fetch
  const [dbCollections, setDbCollections] = useState([]);
  useEffect(() => {
    const collectionRef = collection(db, "fit-track");
    getDocs(collectionRef)
      .then((snapshot) => {
        let result = [];
        snapshot.docs.forEach((doc) => {
          result.push({...doc.data(), id: doc.id});
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
    const isExistedUser = dbCollections?.filter(
      (row) => row?.EMAIL === userDetails?.email
    );
    const existedPassword = isExistedUser?.[0]?.PASSWORD;

    if (isExistedUser) {
      // if existed user
      // check password and login
      if (existedPassword === userDetails?.password) {
        console.log("==worksLogin");
        login();
      } else {
        console.log("==worksErrro");
      }
    } else {
      console.log("==worksNewUser");
      // if new user
      // go to signup
      // log in
      // create data function call*
      // createData();
    }
  };
  const createData = async () => {
    const userData = {
      EMAIL: userDetails?.email,
      PASSWORD: userDetails?.password,
      CREATED_AT: new Date(),
      details: {},
    };
    try {
      await addDoc(collection(db, "fit-track"), userData);
    } catch (error) {
      Promise.reject(error);
    }
  };

  return {
    navigate,
    handleLogin,
    userDetails,
    handleOnChange,
    setUserDetails,
    isUserDetailsIsValid,
  };
};

export default useLogIn;

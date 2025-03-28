import {addDoc, collection} from "firebase/firestore";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {db} from "../../firebase/config";

const useSignUp = () => {
  const navigate = useNavigate();

  // MARK: States
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    isPasswordVisibility: false,
    isUserDetailIsInvalid: false,
    errorMsg: "",
  });

  // MARK: Handle signup
  const handleSignUp = async () => {
    const userData = {
      USER_NAME: userDetails?.email,
      EMAIL: userDetails?.email,
      PASSWORD: userDetails?.password,
      MOBILE_NO: userDetails?.password,
      CREATED_AT: new Date(),
      DETAILS: {},
    };
    try {
      await addDoc(collection(db, "fit-track"), userData);
    } catch (error) {
      Promise.reject(error);
    }
  };
  return {
    navigate,
  };
};

export default useSignUp;

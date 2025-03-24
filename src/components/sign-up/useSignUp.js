import { useNavigate } from "react-router-dom";

const useSignUp = () => {
  const navigate = useNavigate();
  return {
    navigate,
  };
};

export default useSignUp;

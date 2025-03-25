import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/config";

const useLogIn = () => {
  const navigate = useNavigate();

  const [data, setData] = useState();
  useEffect(() => {
    const collectionRef = collection(db, "fit-track");
    getDocs(collectionRef)
      .then((snapshot) => {
        let result = [];
        snapshot.docs.forEach((doc) => {
          result.push({ ...doc.data(), id: doc.id });
        });
        setData(result);
      })
      .catch((err) => console.log("==err", err));
  }, []);

  console.log('==data',data);
  
  return {
    navigate,
  };
};

export default useLogIn;

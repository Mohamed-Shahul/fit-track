import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCn3Lq1QJ9j2QSWC_e72kjIAlX8cQCHvhw",
  authDomain: "fit-track-16260.firebaseapp.com",
  projectId: "fit-track-16260",
  storageBucket: "fit-track-16260.firebasestorage.app",
  messagingSenderId: "1421775062",
  appId: "1:1421775062:web:61bcb16df32f3a3ca03977",
};
initializeApp(firebaseConfig);

const db = getFirestore();

export {db};

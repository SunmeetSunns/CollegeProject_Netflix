import { initializeApp } from "firebase/app";
import{getAuth} from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyCKuRo_NYAjyxVfd4Plr3ndm5hi9W5XbdE",
    authDomain: "react-netflix-clone-c65b0.firebaseapp.com",
    projectId: "react-netflix-clone-c65b0",
    storageBucket: "react-netflix-clone-c65b0.appspot.com",
    messagingSenderId: "531460076875",
    appId: "1:531460076875:web:c35cc52733369d568fe4ce",
    measurementId: "G-HDLETEWEF3"
  };


const app = initializeApp(firebaseConfig);
export const firebaseAuth=getAuth(app);
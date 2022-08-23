import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyAtNxc-JAuIbOvmGTPCWz3mJcXEND8czLc",
    authDomain: "netflix-clone-1c62c.firebaseapp.com",
    projectId: "netflix-clone-1c62c",
    storageBucket: "netflix-clone-1c62c.appspot.com",
    messagingSenderId: "415781088862",
    appId: "1:415781088862:web:e0b37c2ce75373bffccecf",
    measurementId: "G-XTBBC8GRVJ"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
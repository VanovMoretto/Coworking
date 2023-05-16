import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBLUyWD3Krz7Ti_nLmwEYwmJulKQ3THC7g",
  authDomain: "dutra-coworking.firebaseapp.com",
  projectId: "dutra-coworking",
  storageBucket: "dutra-coworking.appspot.com",
  messagingSenderId: "969417310723",
  appId: "1:969417310723:web:b04717e558ff5f68304436",
  measurementId: "G-1HSXBJM0S3"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app)

export { auth, db };
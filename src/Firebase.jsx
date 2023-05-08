import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBLUyWD3Krz7Ti_nLmwEYwmJulKQ3THC7g",
  authDomain: "dutra-coworking.firebaseapp.com",
  projectId: "dutra-coworking",
  storageBucket: "dutra-coworking.appspot.com",
  messagingSenderId: "969417310723",
  appId: "1:969417310723:web:b04717e558ff5f68304436",
  measurementId: "G-1HSXBJM0S3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export default db;
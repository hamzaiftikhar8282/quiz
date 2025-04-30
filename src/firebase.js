// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCIkcmQtuFJfejfy_xEl5gp3wPQyNiUDF8",
  authDomain: "cenimabooking-9efc2.firebaseapp.com",
  projectId: "cenimabooking-9efc2",
  storageBucket: "cenimabooking-9efc2.appspot.com", // Fix: use appspot.com not firebasestorage.app
  messagingSenderId: "856290511341",
  appId: "1:856290511341:web:d387189784b4d32a9cbfe4",
  measurementId: "G-FSEHQJRZQZ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

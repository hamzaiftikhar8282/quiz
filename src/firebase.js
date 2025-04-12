// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyC2fFKJOynFHfiYNSJ5D534qiLr9R30t2Y",
  authDomain: "booksupload-3bf66.firebaseapp.com",
  projectId: "booksupload-3bf66",
  storageBucket: "booksupload-3bf66.appspot.com",
  messagingSenderId: "989442545193",
  appId: "1:989442545193:web:bcb1f7f9b863c882db6e38",
  measurementId: "G-GN9W1GP2MY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// Initialize Firestore
const db = getFirestore(app);
const currentUserId = auth.currentUser?.uid;

export { auth, db }; // Export Firestore instance

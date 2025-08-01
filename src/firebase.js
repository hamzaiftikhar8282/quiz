// Import the functions you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDwvAuTLKD7csp8ceAbTXSiTJNS3JpIZ4M",
  authDomain: "quiz-87a80.firebaseapp.com",
  projectId: "quiz-87a80",
  storageBucket: "quiz-87a80.appspot.com",
  messagingSenderId: "409501561061",
  appId: "1:409501561061:web:3cf8137356db607e59240c",
  measurementId: "G-5Q20LZ07B3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app);

// ✅ Export the Firestore instance
export { db };

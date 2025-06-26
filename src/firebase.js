// firebase.js

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDAg09Wr07J2IU9_6klRcRCYikxQWU-hBk",
  authDomain: "cake-6c44d.firebaseapp.com",
  projectId: "cake-6c44d",
  storageBucket: "cake-6c44d.firebasestorage.app",
  messagingSenderId: "74272393983",
  appId: "1:74272393983:web:71c86ea16b035d59a71aca",
  measurementId: "G-BNZHK733GJ"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Export needed instances
export { auth, db, analytics };

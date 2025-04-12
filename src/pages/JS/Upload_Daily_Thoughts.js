import React, { useState } from "react";
import "../CSS/UploadDailyThoughts.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
// import Navbar from "./components/navbar";
// import TopContent from "./components/TopContent";
import Footer from "./components/Footer";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase";
import AdminNavbar from "./components/Admin_navbar";

const UploadDailyThoughts = () => {
  const [subject, setSubject] = useState("");
  const [thought, setThought] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleUpload = async () => {
    if (subject.trim() === "" || thought.trim() === "") {
      setErrorMessage("Please enter both subject and thought.");
      setSuccessMessage("");
      return;
    }

    try {
      await addDoc(collection(db, "daily_thoughts"), {
        subject: subject.trim(),
        thought: thought.trim(),
        createdAt: Timestamp.now()
      });

      setSuccessMessage("Daily Thought uploaded successfully!");
      setErrorMessage("");
      setSubject("");
      setThought("");
    } catch (error) {
      console.error("Error uploading thought:", error);
      setErrorMessage("Failed to upload. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <AdminNavbar />
      </nav>

      <div className="background">
        <div className="top-content">
          <div className="text-section">
            <h2>Upload Daily Thought</h2>
            <p>
              Share a moment of reflection, motivation, or peace with the world. Whether it's a powerful quote,
              a personal insight, or a thoughtful message, your daily thought can inspire someone’s day.
              Take a few minutes to write what’s on your heart and spread positivity.
            </p>
            <br />
            <button type="submit" className="content-button">View Thoughts</button>
          </div>
        </div>
      </div>

      <div className="thought-upload-container">
        <div className="upload-card">
          <h2>Upload Daily Thought</h2>
          <input
            type="text"
            placeholder="Subject"
            className="thought-input"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <textarea
            placeholder="Write your daily thought here..."
            className="thought-textarea"
            rows={6}
            value={thought}
            onChange={(e) => setThought(e.target.value)}
          ></textarea>
          <button className="upload-button" onClick={handleUpload}>
            Upload
          </button>
          {successMessage && <p className="success-msg">{successMessage}</p>}
          {errorMessage && <p className="error-msg">{errorMessage}</p>}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UploadDailyThoughts;

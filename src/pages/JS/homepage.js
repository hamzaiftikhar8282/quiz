import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import logo from "../../images/logosch.png";
import "../css/home.css";

const HomePage = ({ setName, setUserId }) => {
  const [inputName, setInputName] = useState("");
  const navigate = useNavigate();

  const handleStart = async () => {
    const name = inputName.trim();
    if (!name) return;

    try {
      const docRef = await addDoc(collection(db, "quiz-users"), {
        name,
        startedAt: serverTimestamp(),
      });

      setName(name);
      setUserId(docRef.id);

      navigate("/quiz");
    } catch (error) {
      console.error("Error saving user: ", error);
      alert("Failed to start quiz. Try again.");
    }
  };

  return (
    <div className="homepage">
      <div className="card">
        <img src={logo} alt="SchoolMentor Logo" className="logo" />
        <h1 className="title">Welcome to SchoolMentor Training Quiz</h1>
        <h2 className="subtitle">
          Topic: Art of Teaching and Its Impact on Students
        </h2>

        <div className="rules">
          <h3>Quiz Guidelines</h3>
          <ul>
            <li>Answer all questions honestly.</li>
            <li>Each question has one correct answer.</li>
            <li>Your name will be printed on the certificate.</li>
          </ul>
        </div>

        <input
          type="text"
          className="name-input"
          placeholder="Enter your full name"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
        />

        <button
          className="start-btn"
          onClick={handleStart}
          disabled={!inputName.trim()}
        >
          Proceed to Quiz
        </button>
      </div>
    </div>
  );
};

export default HomePage;

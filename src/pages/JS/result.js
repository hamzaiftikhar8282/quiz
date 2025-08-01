import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import jsPDF from "jspdf";
import logo from "../../images/logosch.png";
import "../css/result.css";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const { userId } = location.state || {};

  useEffect(() => {
    const fetchResult = async () => {
      if (userId) {
        const resultRef = doc(db, "quiz-results", userId);
        const resultSnap = await getDoc(resultRef);
        if (resultSnap.exists()) {
          setResult(resultSnap.data());
        }
      }
    };
    fetchResult();
  }, [userId]);

  const handleDownload = () => {
    if (!result) return;
    const pdf = new jsPDF();
    pdf.setFontSize(18);
    pdf.text("🏅 SchoolMentor Quiz Certificate", 20, 30);
    pdf.setFontSize(12);
    pdf.text(`This certifies that ${result.name} has completed the quiz.`, 20, 50);
    pdf.text(`Score: ${result.score} out of ${result.total}`, 20, 60);
    pdf.text("~ SchoolMentor Team", 20, 80);
    pdf.save("SchoolMentor_Certificate.pdf");
  };

  if (!result)
    return (
      <div className="quizpage">
        <div className="quiz-container">Loading result...</div>
      </div>
    );

  return (
    <div className="quizpage">
      <div className="quiz-container">
        <div className="instructions">
          <img src={logo} alt="SchoolMentor Logo" className="logo" />
          <h3>Congratulations, {result.name}!</h3>
          <p>You completed the quiz. Here's your result and certificate.</p>
        </div>

        <h2 className="question-title">Your Score: {result.score} / {result.total}</h2>

        <button className="option-btn" onClick={handleDownload}>
           Download Certificate (PDF)
        </button>
   
      </div>
    </div>
  );
};

export default Result;

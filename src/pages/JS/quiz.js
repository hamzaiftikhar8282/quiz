import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import logo from "../../images/logosch.png";
import "../css/quiz.css";

const Quiz = ({ userId, name }) => {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      const snapshot = await getDocs(collection(db, "training-quiz"));
      const data = snapshot.docs.map((doc) => doc.data());
      setQuestions(data);
    };
    fetchQuestions();
  }, []);

  const handleOptionClick = (option) => setSelectedOption(option);

  const handleNext = async () => {
    if (selectedOption === questions[current].answer) {
      setCorrect((prev) => prev + 1);
    }

    const next = current + 1;
    if (next < questions.length) {
      setCurrent(next);
      setSelectedOption(null);
    } else {
      const finalScore =
        selectedOption === questions[current].answer ? correct + 1 : correct;

      await setDoc(doc(db, "quiz-results", userId), {
        userId,
        name,
        score: finalScore,
        total: questions.length,
        answers: questions,
        submittedAt: serverTimestamp(),
      });

      navigate("/result", {
        state: { userId },
      });
    }
  };

  const handlePrevious = () => {
    if (current > 0) {
      setCurrent(current - 1);
      setSelectedOption(null);
    }
  };

  if (questions.length === 0)
    return (
      <div className="quizpage">
        <div className="quiz-container">Loading questions...</div>
      </div>
    );

  return (
    <div className="quizpage">
      <div className="quiz-container">
        <div className="instructions">
          <img src={logo} alt="SchoolMentor Logo" className="logo" />
          <h3> Instructions</h3>
          <p>
            Please read each question carefully and select the most appropriate
            answer. This quiz is designed to evaluate your understanding of how
            teachers impact students.
          </p>
        </div>

        <h2 className="question-title">{questions[current].question}</h2>
        <div className="options">
          {questions[current].options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleOptionClick(opt)}
              className={`option-btn ${
                selectedOption === opt ? "selected" : ""
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        <div className="navigation-buttons">
          <button onClick={handlePrevious} disabled={current === 0} className="option-btn">
            Back
          </button>
          <button onClick={handleNext} disabled={!selectedOption} className="option-btn">
            {current < questions.length - 1 ? "Next" : "Submit Quiz"}
          </button>
        </div>

        <p className="progress">
          Question {current + 1} of {questions.length}
        </p>
      </div>
    </div>
  );
};

export default Quiz;

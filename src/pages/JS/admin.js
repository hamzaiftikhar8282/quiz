import React, { useState } from "react";
import { db } from "../../firebase"; // adjust path to your firebase config
import { collection, addDoc } from "firebase/firestore";
import "../css/admin.css";

const AdminMCQEntry = () => {
  const [totalQuestions, setTotalQuestions] = useState(1);
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], answer: "" },
  ]);

  const handleChange = (index, field, value) => {
    const newQuestions = [...questions];
    if (field === "question") {
      newQuestions[index].question = value;
    } else if (field === "answer") {
      newQuestions[index].answer = value;
    }
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[optIndex] = value;
    setQuestions(newQuestions);
  };

  const handleTotalChange = (e) => {
    const count = parseInt(e.target.value);
    setTotalQuestions(count);
    setQuestions(
      Array.from({ length: count }, () => ({
        question: "",
        options: ["", "", "", ""],
        answer: "",
      }))
    );
  };

  const handleSubmit = async () => {
    try {
      const quizRef = collection(db, "training-quiz");
      for (const q of questions) {
        await addDoc(quizRef, q);
      }
      alert("Questions saved successfully!");
    } catch (error) {
      alert("Error saving questions: " + error.message);
    }
  };

  return (
    <div className="adminpage">
      <div className="admin-container">
        <h2 className="admin-title">MCQ Entry - SchoolMentor</h2>

        <div className="admin-form">
          <label>Total MCQs:</label>
          <input
            type="number"
            min="1"
            value={totalQuestions}
            onChange={handleTotalChange}
            className="admin-input"
          />

          {questions.map((q, i) => (
            <div key={i} className="admin-question-block">
              <h4>Question {i + 1}</h4>
              <input
                type="text"
                placeholder="Enter question"
                value={q.question}
                onChange={(e) => handleChange(i, "question", e.target.value)}
                className="admin-input"
              />
              {q.options.map((opt, j) => (
                <input
                  key={j}
                  type="text"
                  placeholder={`Option ${j + 1}`}
                  value={opt}
                  onChange={(e) => handleOptionChange(i, j, e.target.value)}
                  className="admin-input"
                />
              ))}
              <input
                type="text"
                placeholder="Correct answer"
                value={q.answer}
                onChange={(e) => handleChange(i, "answer", e.target.value)}
                className="admin-input"
              />
            </div>
          ))}

          <button onClick={handleSubmit} className="admin-submit-btn">
            Submit All Questions
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminMCQEntry;

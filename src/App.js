import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

import HomePage from './pages/js/HomePage';
import Quiz from './pages/js/quiz';
import AdminMCQEntry from './pages/js/admin';
import Login from './pages/js/login';
import Result from './pages/js/result';
function App() {
  const [name, setName] = useState('');
  const [score, setScore] = useState(null);
const [userId, setUserId] = useState(""); // ← New

  return (
    <div className="App">
      <Router>
        <Routes>

 <Route path="/" element={<HomePage setName={setName} setUserId={setUserId} />} />
<Route path="/quiz" element={<Quiz setScore={setScore} userId={userId} name={name} />} />



                    <Route path="/login" element={<Login />} />

          <Route path="/admin" element={<AdminMCQEntry />} />
                    <Route path="/result" element={<Result />} />


                    <Route path="/login" element={<Login />} />


        </Routes>
      </Router>
    </div>
  );
}

export default App;

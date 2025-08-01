import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "../css/authentication.css";
import signupImage from "../../images/logosch.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Redirect only if it's the correct admin user
      if (user.email === "admin@gmail.com") {
        navigate("/Admin");
      } else {
        setError("You are not authorized to access the admin panel.");
      }
    } catch (error) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <img src={signupImage} alt="Sign Up" className="signup-image" />

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="auth-button">Login</button>
        </form>

        <p className="auth-text">
          <Link to="/forget_password" className="auth-link">Forgot Password?</Link>
        </p>
        <p className="auth-text">
          Don’t have an account? <Link to="/SignUp" className="auth-link">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

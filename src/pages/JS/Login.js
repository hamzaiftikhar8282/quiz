import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ Added this
import "../css/authentication.css";
import signupImage from "../../images/petlogo.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Dummy credentials (replace with backend logic if needed)
    const adminEmail = "admin@bloodbridge.com";
    const adminPassword = "admin123";

    const userEmail = "user@bloodbridge.com";
    const userPassword = "user123";

    if (email === adminEmail && password === adminPassword) {
      navigate("/Admin");
    } else if (email === userEmail && password === userPassword) {
      navigate("/Home");
    } else {
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
          Don't have an account? <Link to="/SignUp" className="auth-link">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

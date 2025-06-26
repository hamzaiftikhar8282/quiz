import React from "react";
import "../css/birthdaycake.css";

// ✅ Import local images

import  chocolateCake  from '../../images/coffee.jpeg'; // adjust path based on location

import confettiCake from '../../images/chocolate.jpeg'; // adjust path based on location

import coffeeCake from '../../images/confetti.jpeg';


const BirthdayCakes = () => {
  return (
    <div className="birthday-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">🎂 Cake Delight</div>
        <div className="nav-links">
          <a href="/" className="nav-link">Home</a>
          <a href="/birthday" className="nav-link">Birthday Cakes</a>
          <a href="/contact" className="nav-link">Contact Us</a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero">
        <h1>Birthday Cakes</h1>
        <p>Celebrate with joy and sweetness!</p>
      </div>

      {/* Cakes Section */}
      <div className="cakes-section">
        <div className="cake-card">
          <img src={chocolateCake} alt="Chocolate Sprinkle" />
          <h3>Chocolate Sprinkle</h3>
        </div>

        <div className="cake-card">
          <img src={confettiCake} alt="Confetti Cake" />
          <h3>Confetti Cake</h3>
        </div>

        <div className="cake-card">
          <img src={coffeeCake} alt="Coffee Cake" />
          <h3>Coffee Cake</h3>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Cake Delight. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default BirthdayCakes;

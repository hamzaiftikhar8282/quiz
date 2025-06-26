// src/components/Navbar.js
import React, { useState } from 'react';
import '../css/navbar.css';
import logo from "../../images/petlogo.jpg"; // Adjust path as per your project

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
          <img src={logo} alt="Pet Logo" />
          PetPal
        </a>

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
          <a href="/adopt">Adopt</a>
          <a href="/donate">Donate</a>
          <a href="/about">About</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

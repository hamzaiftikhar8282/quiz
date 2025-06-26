import React from "react";
import '../css/homepage.css';
import cakeImg from "../../images/cake.jpeg"; // Adjust path as per your project

const HomePage = () => {
  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">🎂 Sweet Cakes</div>
        <div className="nav-links">
          <a href="/" className="nav-link">Home</a>
          <a href="/birthdaycake" className="nav-link">BirthdayCake</a>
          <a href="/register" className="nav-link">Register</a>
              <a href="/contact" className="nav-link">Contact Us</a>
              <a href="/contact" className="nav-link">Contact Us</a>
              <a href="/contact" className="nav-link">Contact Us</a>
              <a href="/contact" className="nav-link">Contact Us</a>

        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>Delicious Cakes for Every Occasion</h1>
          <p>Freshly baked, beautifully crafted, and delivered to your door.</p>
          <a href="/menu" className="hero-btn">Explore Menu</a>
        </div>
        <div className="hero-image">
          <img src={cakeImg} alt="Cake" />
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <h2>Why Choose Sweet Cakes?</h2>
        <div className="about-content">
          <div className="about-card">
            <h3>Fresh Ingredients</h3>
            <p>Our cakes are made with the finest and freshest ingredients.</p>
          </div>
          <div className="about-card">
            <h3>Custom Designs</h3>
            <p>Get cakes tailored to your events—weddings, birthdays, and more.</p>
          </div>
          <div className="about-card">
            <h3>Fast Delivery</h3>
            <p>Delivered right to your doorstep on time, every time.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Sweet Cakes | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default HomePage;

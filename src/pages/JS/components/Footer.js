import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Footer.css"; 
import logo from "../../../images/clogo.png"; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">

        {/* Logo Section */}
        <div className="footer-section logo">
          <img src={logo} alt="CineBooking Logo" className="footer-logo" />
        </div>

        {/* About Section */}
        <div className="footer-section about">
          <h3>About DanishBooking</h3>
          <p>
            Welcome to DanishBooking, founded by Amara — your ultimate destination for movie ticket bookings, showtimes, and an unforgettable cinema experience. 
            Dive into the world of movies with ease and convenience!
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/login">Login</a></li>
            <li><a href="/signup">Sign Up</a></li>
            <li><a href="/browse">Browse Movies</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>Email: support@cinebooking.com</p>
          <p>Phone: +92 300 xyzeefg</p>
          <p>Location: Islamabad, Pakistan</p>
        </div>

        {/* Social Media Section */}
        <div className="footer-section social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Danish booking by Amara. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Footer.css"; // Import CSS
import logo from "../../../images/logo.png"; // Import your logo

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">

        {/* Logo Section */}
        <div className="footer-section logo">
          <img src={logo} alt="World of EmanNasir Logo" className="footer-logo" />
        </div>

        <div className="footer-section about">
          <h3>About Us</h3>
          <p>Welcome to Eman Nasir’s book corner a place where stories come to life! Eman is a passionate content writer who is now sharing her written works with the world through this website.</p>
        </div>

        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/login">Login</a></li>
            <li><a href="/signup">Sign Up</a></li>
            {/* <li><a href="#">Browse Books</a></li> */}
            <li><a href="/Contact_Us">Contact Us</a></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h3>Contact Us</h3>
          <p>Email: support@bookupload.com</p>
          <p>Phone: +92 300 1234567</p>
        </div>

        <div className="footer-section social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            {/* <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a> */}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Book Upload. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

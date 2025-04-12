import React from "react";
import "../CSS/Contact_Us.css"; // Use the same CSS styling
import "@fortawesome/fontawesome-free/css/all.min.css";
import Navbar from "./components/navbar";
import TopContent from "./components/TopContent";
import Footer from "./components/Footer";

const Contact = () => {
  return (
    <div className="home-container">
      <nav className="navbar">
        <Navbar />
      </nav>
      <TopContent />

      {/* Contact Us Section */}
      <div className="contact-container">
        <h2 className="contact-heading">Contact Us</h2>
        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" placeholder="Enter your name" required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" required />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="4" placeholder="Enter your message" required></textarea>
          </div>

          <button type="submit" className="contact-button">Send Message</button>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;

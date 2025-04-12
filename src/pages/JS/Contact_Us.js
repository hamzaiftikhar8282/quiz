import React from "react";
import "../CSS/Contact_Us.css"; // Use the same CSS styling
import "@fortawesome/fontawesome-free/css/all.min.css";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";

const Contact = () => {
  // Function to scroll to the contact form section
  const scrollToContactForm = () => {
    const contactForm = document.getElementById("contact-form-container"); // Target the container div
    if (contactForm) {
      contactForm.scrollIntoView({
        behavior: "smooth",
        block: "start", // Ensure it stops at the start of the element
        inline: "nearest",
      });
    }
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <Navbar />
      </nav>
      <div className="background">
        <div className="top-content">
          <div className="text-section">
            <h2>Contact Us</h2>
            <p>We'd love to hear from you</p>
            <p>
              Whether you have a question, feedback, or just want to say hello — feel free to reach out!
              Our team is always here to assist you. Fill out the form below or connect with us through our social channels.
              <br />
              <button
                type="button"
                className="content-button"
                onClick={scrollToContactForm} // Adding functionality to scroll
              >
                Get in Touch
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Contact Us Section */}
      <div className="contact-container" id="contact-form-container"> {/* Add ID to target */}
        <h2 className="contact-heading">Contact Us</h2>
        <form className="contact-form" id="contact-form">
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

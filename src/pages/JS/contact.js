import React, { useState } from "react";
import "../css/contact.css";

const ShopContact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message Sent! Thank you.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="shop-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">🎂 Cake Delight</div>
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/cakes">Cakes</a>
          <a href="/contact">Contact Us</a>
        </div>
      </nav>

      {/* Cakes Section */}
      <div className="cakes-section">
        <h2>Our Cakes</h2>
        <div className="cakes-grid">
          <div className="cake-card">
            <img src="https://i.ibb.co/y5q1vbW/chocolate-cake.jpg" alt="Chocolate Cake" />
            <h3>Chocolate Bliss</h3>
            <p>$15.00</p>
            <button>View More</button>
          </div>

          <div className="cake-card">
            <img src="https://i.ibb.co/k1bQxQ6/strawberry-cake.jpg" alt="Strawberry Cake" />
            <h3>Strawberry Dream</h3>
            <p>$18.00</p>
            <button>View More</button>
          </div>

          <div className="cake-card">
            <img src="https://i.ibb.co/jzrcmht/rainbow-cake.jpg" alt="Rainbow Cake" />
            <h3>Rainbow Surprise</h3>
            <p>$20.00</p>
            <button>View More</button>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="contact-section">
        <h2>Contact Us</h2>
        <p>Got a question or a special request? Reach out to us!</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows={4}
            value={form.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Cake Delight. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ShopContact;

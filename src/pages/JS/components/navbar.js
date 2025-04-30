import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Navbar.css";
import logo from "../../../images/clogo.png";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activePath, setActivePath] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setActivePath(window.location.pathname);
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        alert("You have been logged out.");
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <a href="/" className="logo">
        <img src={logo} alt="World of emanNasir" className="logo-image" />
      </a>

      {/* Menu Toggle for small devices */}
      <div className="menu-toggle" onClick={toggleMenu}>
        <i className={`fas ${isOpen ? "fa-times" : "fa-bars"}`}></i>
      </div>

      {/* Navigation Links */}
      <div className={`nav-links ${isOpen ? "open" : ""}`}>
        <div className="nav-main-links">
          <a href="/Home" className={`nav-link ${activePath === "/Home" ? "active" : ""}`}>
            Home
          </a>
          <a href="/register_ticket" className={`nav-link ${activePath === "/register_ticket" ? "active" : ""}`}>
            Register Ticket
          </a>
          <a href="/browser_moveis" className={`nav-link ${activePath === "/browser_moveis" ? "active" : ""}`}>
            Browse Movies
          </a>
        </div>

        <div className="nav-actions">
  
          <a href="/Contact_Us" className={`nav-link ${activePath === "/Contact_Us" ? "active" : ""}`}>
            Contact Us
          </a>
  
          {isLoggedIn && (
            <button className="nav-link logout-btn" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

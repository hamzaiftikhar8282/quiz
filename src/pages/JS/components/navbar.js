import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Navbar.css";
import logo from "../../../images/bloodlogo.png";
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
        <img src={logo}  alt="bloodbridge" className="logo-image" />
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
    
        </div>

        <div className="nav-actions">
  
          <a href="/Contact_Us" className={`nav-link ${activePath === "/Contact_Us" ? "active" : ""}`}>
            Contact Us
          </a>
  
  
          <a href="/About_us" className={`nav-link ${activePath === "/About_us" ? "active" : ""}`}>
              About Us
          </a>
          <a href="/view_profile" className={`nav-link ${activePath === "/view_profile" ? "active" : ""}`}>
              Dashboard
          </a>
          
       

          <a href="/register_donor" className={`nav-link ${activePath === "/register_donor" ? "active" : ""}`}>
            Become Donor
          </a>

          <a href="/see_donor" className={`nav-link ${activePath === "/see_donor" ? "active" : ""}`}>
              recipients
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

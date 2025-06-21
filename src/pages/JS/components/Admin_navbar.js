import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Admin_Navbar.css";
import logo from "../../../images/bloodlogo.png";

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activePath, setActivePath] = useState("");

  useEffect(() => {
    setActivePath(window.location.pathname);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="admin-navbar">
      {/* Logo Section */}
      <a href="/" className="admin-logo">
        <img src={logo} alt="World of emanNasir" className="admin-logo-image" />
      </a>

      {/* Menu Toggle Button */}
      <div className="admin-menu-toggle" onClick={toggleMenu}>
        <i className={`fas ${isOpen ? "fa-times" : "fa-bars"}`}></i>
      </div>

      {/* Navigation Links */}
      <div className={`admin-nav-links ${isOpen ? "open" : ""}`}>
        <a
          href="/Admin"
          className={`admin-nav-link ${activePath === "/Admin" ? "active" : ""}`}
        >
          Home
        </a>

     

      </div>
    </nav>
  );
};

export default AdminNavbar;

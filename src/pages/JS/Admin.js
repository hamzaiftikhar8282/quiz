import React from "react";
import "../CSS/Admin.css"; 
import "@fortawesome/fontawesome-free/css/all.min.css";
import Footer from "./components/Footer";
import AdminNavbar from "./components/Admin_navbar";
import cinemaBanner from "../../images/clogo.png";

const AdminHome = () => {
  return (
    <div className="home-container">
      <nav className="navbar">
        <AdminNavbar />
      </nav>

      {/* Hero Section */}
      <div className="background">
        <div className="top-content">
          <div className="text-section">
            <h2>🎬 Welcome to CineBooking Admin Panel</h2>
            <p>Manage movies, monitor bookings, and control your cinema world — all from one dashboard.</p>
            <p>
              As an administrator, you have the power to add new movies, update showtimes, manage registered tickets, and keep your cinema community engaged.
              <br />
              <button type="button" className="content-button">
                Manage Movies
              </button>
            </p>
          </div>

          {/* Optional Cinema Image */}
          {/* <div className="image-section">
            <img src={cinemaBanner} alt="Admin Cinema" className="home-image" />
          </div> */}
        </div>
      </div>

      {/* Features Section */}
      <div className="extra-content">
        <div className="extra-text">
          <p>
            Our admin panel is designed to provide a seamless experience for cinema management:
            <br /><br />
            🎟️ Post and update the latest movies easily.<br />
            📅 Schedule and manage movie showtimes.<br />
            🧾 View all user ticket registrations in real-time.<br />
            🛡️ Secure access and control over your cinema platform.<br /><br />
            Start managing your cinema empire today with just a few clicks!
          </p>
          <button type="button" className="extra-content-button">
            View Bookings
          </button>
        </div>

        <div className="extra-image">
          <img src={cinemaBanner} alt="Cinema Admin Panel" className="extra-home-image" />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminHome;

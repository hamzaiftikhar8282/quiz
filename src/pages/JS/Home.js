import React from "react";
import { useNavigate } from "react-router-dom"; // import useNavigate
import "../CSS/Home.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import cinemaBanner from "../../images/clogo.png";
import movie1 from "../../images/movie1.jpg"; 
import movie2 from "../../images/movie2.jpg";
import movie3 from "../../images/movie3.jpg";

const Home = () => {
  const navigate = useNavigate(); // initialize navigate

  const handleBrowseMovies = () => {
    navigate("/browse-movies"); // route to browse movies page
  };

  const handleRegisterTicket = () => {
    navigate("/register_ticket"); // route to register ticket page
  };

  return (
    <div className="home-container">
      <Navbar />

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-text">
          <h1>🎬 Welcome to CineBooking</h1>
          <p>Your one-stop destination to book tickets, explore movies, and experience cinema like never before.</p>
          <button className="hero-button" onClick={handleBrowseMovies}>
            Browse Movies
          </button>
        </div>
        <img src={cinemaBanner} alt="Cinema" className="hero-image" />
      </div>

      {/* Divider */}
      <hr className="section-divider" />

      {/* Slider Section */}
      <div className="slider-section">
        <h2>Now Showing</h2>
        <div className="movie-slider">
          <div className="movie-card">
            <img src={movie1} alt="Movie 1" />
            <p><strong>Edge of Tomorrow</strong><br />Showtimes: 3:00 PM, 6:00 PM, 9:00 PM</p>
          </div>
          <div className="movie-card">
            <img src={movie2} alt="Movie 2" />
            <p><strong>Inception</strong><br />Showtimes: 2:30 PM, 5:30 PM, 8:30 PM</p>
          </div>
          <div className="movie-card">
            <img src={movie3} alt="Movie 3" />
            <p><strong>The Dark Knight</strong><br />Showtimes: 4:00 PM, 7:00 PM, 10:00 PM</p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="section-divider" />

      {/* Why Us Section */}
      <div className="why-choose-us">
        <h2>Why Book With CineBooking?</h2>
        <ul>
          <li><i className="fas fa-ticket-alt"></i> Quick & Easy Ticket Booking</li>
          <li><i className="fas fa-film"></i> Latest Movies & Exclusive Shows</li>
          <li><i className="fas fa-chair"></i> Real-Time Seat Selection</li>
          <li><i className="fas fa-users"></i> Group Booking & Discounts</li>
        </ul>
      </div>

      {/* Divider */}
      <hr className="section-divider" />

      {/* Register Ticket CTA */}
      <div className="register-section">
        <div className="register-text">
          <h2>Register Your Ticket Now</h2>
          <p>Join thousands of movie lovers. Register your ticket now, choose your seats, and get ready for the ultimate cinema experience.</p>
          <button className="register-button" onClick={handleRegisterTicket}>
            Register Ticket
          </button>
        </div>
        <div className="register-image">
          <img src={cinemaBanner} alt="Book Ticket" />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;

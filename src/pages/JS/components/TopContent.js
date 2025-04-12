import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import bookJourney from "../../../images/treebook.png"; // Import image
import "./TopContent.css"; // Import CSS
import Navbar from "./navbar";
const TopContent = () => {
  return (
    <div className="home-container">
      <nav className="navbar">
       <Navbar/>
      </nav>

      <div className="background">
        <div className="top-content">
          <div className="text-section">
            <h2>Explore the World</h2>
            <p>Rediscover yourself</p>
            <p>Discover the magic of storytelling through timeless novels that explore  complex characters, immersive worlds, and captivating plots. Dive into  a world where imagination knows no bounds, and every page takes you on  an unforgettable journey.
          <br></br>
            <button type="submit" className="content-button">Explore Now</button>

            </p>
          </div>

          {/* <div className="image-section">
          <img src={bookJourney} alt="Books" className="home-image" />
          </div> */}
        </div>
      </div>
      </div>
  );
};

export default TopContent;
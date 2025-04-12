import React from "react";
import "../CSS/Admin.css"; // Use the same CSS styling
import "@fortawesome/fontawesome-free/css/all.min.css";
import bookJourney from "../../images/treebook.png"; // Import image
import Navbar from "./components/navbar";
import TopContent from "./components/TopContent";
import Footer from "./components/Footer";
import AdminNavbar from "./components/Admin_navbar";
const AdminHome = () => {
  return (
    <div className="home-container">
      <nav className="navbar">
       <AdminNavbar/>
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

      <div className="extra-content">
        <div className="extra-text">
          <h2>Start Your Reading Journey</h2>
          <p>Join our platform to explore thousands of books, upload your own, and connect with like-minded readers. Reading opens the door to new possibilities! Whether you're an avid reader, a passionate writer, or someone looking for a community of book lovers, our platform has something for you.

Discover a vast collection of novels, academic resources, and self-published works from authors worldwide. Upload your own books and share your knowledge, creativity, and stories with the world. Engage in discussions, write reviews, and build your personal library.

With an easy-to-use interface, seamless book uploads, and a growing community, our platform is designed to provide an immersive reading and sharing experience. Start your journey today and be part of a literary revolution!</p>
<button type="submit" className="extra-content-button">Login</button>

        </div>


        <div className="extra-image">
        <img src={bookJourney} alt="Reading Journey" className="extra-home-image" />
        </div>

      </div>

    
      <Footer/>
    </div>
  );
};

export default AdminHome;

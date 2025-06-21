import React from 'react';
import Navbar from './components/navbar';
import '../CSS/About_us.css';

const AboutUs = () => {
  return (
    <div className="about-simple-wrapper">
      <Navbar />

      <div className="about-simple-container">

      

        <h2>Our Mission</h2>
        <p>
          To create a reliable, voluntary blood donor network that ensures safe and quick blood access whenever it's needed.
        </p>

        <h2>Our Vision</h2>
        <p>
          A connected Pakistan where every person gets blood in time, with the help of a caring donor community.
        </p>

        <h2>Why BloodBridge?</h2>
        <ul>
          <li>Verified Donors</li>
          <li>Search by City & Blood Group</li>
          <li>Safe, Private Communication</li>
          <li>Fast Blood Requests</li>
          <li>Simple & Friendly App</li>
        </ul>

        <h2>Our Team</h2>
        <p>
          We're developers, health advocates, and volunteers working together to save lives using technology.
        </p>

        <p className="about-footer">© {new Date().getFullYear()} BloodBridge. All rights reserved.</p>
      </div>
    </div>
  );
};

export default AboutUs;

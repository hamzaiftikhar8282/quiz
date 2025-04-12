import React, { useRef } from "react";
import "../CSS/About_Author.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Profile from "../../images/profile.png";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";

const Author = () => {
  const authorRef = useRef(null);

  const scrollToAuthor = () => {
    authorRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <Navbar />
      </nav>

      <div className="background">
        <div className="top-content">
          <div className="text-section">
            <h2>Meet the Author</h2>
            <p>Inspiring Minds Through Words</p>
            <p>
              Step into the world of a passionate storyteller whose words aim to move hearts and spark imaginations.
              Through years of dedication and creativity, the author brings life to characters, emotions to stories, 
              and depth to every chapter. This page gives you a glimpse into the journey, inspirations, and purpose 
              behind each written piece.
              <br />
              <button onClick={scrollToAuthor} className="content-button">Read More</button>
            </p>
          </div>
        </div>
      </div>

      {/* Author Info Section */}
      <div className="author-content" ref={authorRef}>
        <div className="profile-image">
          <img src={Profile} alt="Reading Journey" className="extra-home-image" />
          <h3>Eman Nasir</h3>
        </div>
        <div className="author-text">
          <h2 className="author-heading">About Author</h2>
          <p>
            Hi, I’m Eman, a passionate writer and avid reader hailing from Pakistan. I have been writing ever since I was a kid, finding joy in storytelling and expression. My love for writing runs deep, as I often draw inspiration from the vibrant culture and rich history of my homeland. In my novels, you'll discover that Pakistan is not just a backdrop; it's a prominent element that shapes the identities and journeys of my characters.
            <br /><br />
            Ever since I was a child, I’ve been fascinated by dragons, a fascination ignited by the How to Train Your Dragon movies. This early obsession with these majestic creatures influences my writing, where themes of adventure, bravery, and the extraordinary come to life.
            <br /><br />
            In addition to my love for dragons, the concept of human destructive nature and the absence of peace in our world serve as powerful inspirations for my stories. I strive to explore these themes through my characters and narratives, hoping to provoke thought and reflection in my readers.
            <br /><br />
            Join me as I embark on this literary journey, exploring new worlds and sharing tales that resonate with readers of all backgrounds. I invite you to connect with me, share your thoughts, and be part of my adventures.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Author;

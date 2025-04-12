import React, { useEffect, useState } from "react";
import "../CSS/DailyThoughts.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Navbar from "./components/navbar";
// import TopContent from "./components/TopContent";
import Footer from "./components/Footer";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const ViewDailyThought = () => {
  const [todayThought, setTodayThought] = useState(null);

  useEffect(() => {
    const fetchTodayThought = async () => {
      try {
        const now = new Date();
        const thoughtsRef = collection(db, "daily_thoughts");
        const snapshot = await getDocs(thoughtsRef);

        const validThoughts = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((doc) => {
            const createdAt = doc.createdAt?.toDate?.() || new Date(doc.createdAt);
            const diffInMs = now - createdAt;
            return diffInMs < 24 * 60 * 60 * 1000;
          });

        validThoughts.sort((a, b) => b.createdAt?.toDate?.() - a.createdAt?.toDate?.());

        if (validThoughts.length > 0) {
          setTodayThought(validThoughts[0]);
        }
      } catch (error) {
        console.error("Error fetching daily thought:", error);
      }
    };

    fetchTodayThought();
  }, []);

  return (
    <div className="home-container">
      <nav className="navbar">
        <Navbar />
      </nav>
      <div className="background">
  <div className="top-content">
    <div className="text-section">

      {/* Daily Thought Section */}
      <div className="daily-thought">
      </div>

      <h2>Daily Thought</h2>
      <p>
      Every story holds the power to spark change within us, guiding us to rediscover who we truly are. Through the pages of a book, we journey to worlds unknown, yet return with new perspectives and wisdom. Storytelling is not just an escape; it's a reflection of our own lives, reminding us of the dreams, hopes, and strengths we often forget.     <br />
        <button type="submit" className="content-button">Explore Now</button>
      </p>
    </div>

    {/* <div className="image-section">
      <img src={bookJourney} alt="Books" className="home-image" />
    </div> */}
  </div>
</div>

      <div className="chapter-container">
        <h2 className="chapter-title">Daily Thought</h2>

        {todayThought ? (
          <div className="thought-card">
            <h3 className="thought-subject">{todayThought.subject}</h3>
            <p className="thought-author">By Admin</p>
            <p className="thought-text">{todayThought.thought}</p>
          </div>
        ) : (
          <p className="no-thought">No thought uploaded in the last 24 hours.</p>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ViewDailyThought;

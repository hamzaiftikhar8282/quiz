import React, { useEffect, useState } from "react";
import "../CSS/User_Chapters.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { db } from "../../firebase";
import { getAuth } from "firebase/auth";

const Chapter = () => {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState({});
  const [showModal, setShowModal] = useState(false);

  const auth = getAuth();

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "books"));
        const chaptersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setChapters(chaptersData);

        const storedLikes = JSON.parse(localStorage.getItem("likedBooks")) || {};
        setLiked(storedLikes);
      } catch (error) {
        console.error("Error fetching chapters:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChapters();
  }, []);

  const scrollToChapters = () => {
    const chaptersSection = document.getElementById("chapters-section");
    if (chaptersSection) {
      chaptersSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleLike = async (chapterId) => {
    if (liked[chapterId]) return;

    try {
      const chapterRef = doc(db, "books", chapterId);
      await updateDoc(chapterRef, {
        likes: increment(1),
      });

      const updatedLiked = { ...liked, [chapterId]: true };
      setLiked(updatedLiked);
      localStorage.setItem("likedBooks", JSON.stringify(updatedLiked));

      setChapters((prev) =>
        prev.map((ch) =>
          ch.id === chapterId ? { ...ch, likes: (ch.likes || 0) + 1 } : ch
        )
      );
    } catch (error) {
      console.error("Error liking the chapter:", error);
    }
  };

  const handleViewBook = (chapter) => {
    const user = auth.currentUser;

    if (!user) {
      setShowModal(true);
      return;
    }

    window.open(chapter.fileUrl, "_blank");
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <Navbar />
      </nav>

      <div className="background">
        <div className="top-content">
          <div className="text-section">
            <h2>Books Collection</h2>
            <p>
              Explore our vast collection of books and find your next great read.
              Whether you're looking for a thrilling adventure, a deep dive into history,
              or an educational guide — we have it all!
              Browse through our chapters and find your next great read. Each chapter is
              carefully curated for your reading pleasure.
              <br />
              <button
                type="button"
                className="content-button"
                onClick={scrollToChapters}
              >
                Explore Books
              </button>
            </p>
          </div>
        </div>
      </div>

      <section id="chapters-section" className="chapters-section">
        <h2 className="chapters-heading">Book Chapters</h2>
        {loading ? (
          <p>Loading chapters...</p>
        ) : (
          <div className="chapters-container">
            {chapters.map((chapter) => (
              <div key={chapter.id} className="chapter-card">
                <h3>{chapter.chapterName}</h3>
                <p>{chapter.chapterDescription}</p>

                <div className="chapter-actions">
                  <button
                    className="view-button"
                    onClick={() => handleViewBook(chapter)}
                  >
                    View
                  </button>

                  <button
                    className={`like-button ${liked[chapter.id] ? "liked" : ""}`}
                    onClick={() => handleLike(chapter.id)}
                    disabled={liked[chapter.id]}
                  >
                    <i
                      className="fas fa-heart"
                      style={{
                        color: liked[chapter.id] ? "#E28B2C" : "gray",
                      }}
                    />{" "}
                    {chapter.likes || 0}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Modal for login required */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Login Required</h3>
            <p>You must be signed in to view this book.</p>
            <div className="modal-buttons">
              <button onClick={() => (window.location.href = "/SignUp")}>
                Go to SignUp
              </button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Chapter;

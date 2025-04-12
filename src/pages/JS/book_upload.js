import React, { useState, useEffect } from "react";
import "../CSS/book_upload.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
// import Navbar from "./components/navbar";
// import TopContent from "./components/TopContent";
import Footer from "./components/Footer";
import axios from "axios";
import { db } from "../../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import AdminNavbar from "./components/Admin_navbar";
const Chapter = () => {
  const [file, setFile] = useState(null);
  const [chapterName, setChapterName] = useState("");
  const [chapterDescription, setChapterDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [books, setBooks] = useState([]);

  // Fetch books from Firebase on mount
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "books"));
        const booksArray = querySnapshot.docs.map((doc) => doc.data());
        setBooks(booksArray);
      } catch (error) {
        console.error("Error fetching books: ", error);
      }
    };

    fetchBooks();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && !selectedFile.name.endsWith(".pdf")) {
      setError("Only PDF files are allowed.");
      return;
    }
    setFile(selectedFile);
    setError("");
  };

  const handleUpload = async () => {
    if (!file || !chapterName || !chapterDescription) {
      setError("Please provide all fields and a valid PDF file.");
      return;
    }

    setUploading(true);
    setError("");
    setSuccess("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "uploadbooks"); // ✅ Only this needed

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dihaynvq1/upload",
        formData
      );

      const fileUrl = response.data.secure_url;

      await addDoc(collection(db, "books"), {
        name: file.name,
        chapterName,
        chapterDescription,
        fileUrl,
        createdAt: new Date(),
      });

      setSuccess("Book uploaded successfully!");
      setFile(null);
      setChapterName("");
      setChapterDescription("");

      // Refresh book list
      const querySnapshot = await getDocs(collection(db, "books"));
      const booksArray = querySnapshot.docs.map((doc) => doc.data());
      setBooks(booksArray);
    } catch (error) {
      console.error(error);
      setError("Upload failed. Please try again.");
    }

    setUploading(false);
  };

  const handleDownloadPdf = (fileUrl) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileUrl.split("/").pop();
    link.click();
  };

  return (
    <div className="home-container">
      <nav className="navbar">
      <AdminNavbar/>

      </nav>
      <div className="background">
      <div className="top-content">
  <div className="text-section">
    <h2>Upload Book Description</h2>
    <p>Share your chapters with the world</p>
    <p>
      Provide a brief title and summary for each chapter and upload a PDF file.
      Let readers explore your words and ideas through meaningful content.
    </p>
  </div>
</div>

      </div>
      {/* Upload Section */}
      <section className="book-upload-section">
        <div className="upload-card">
          <h2>Upload Your Book</h2>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="book-upload-input"
          />
          <input
            type="text"
            placeholder="Chapter Name"
            value={chapterName}
            onChange={(e) => setChapterName(e.target.value)}
            className="chapter-input"
          />
          <textarea
            placeholder="Chapter Description"
            value={chapterDescription}
            onChange={(e) => setChapterDescription(e.target.value)}
            className="chapter-description-input"
          />
          <button onClick={handleUpload} disabled={uploading} className="book-upload-button">
            {uploading ? "Uploading..." : "Upload"}
          </button>
          {error && <p className="book-upload-error">{error}</p>}
          {success && <p className="book-upload-success">{success}</p>}
        </div>
      </section>

      {/* Book List */}
      <section className="user-chapters-section">
        <h2 className="user-chapters-heading">Book Chapters</h2>
        <div className="user-chapters-wrapper">
          {books.length > 0 ? (
            books.map((book, index) => (
              <div key={index} className="user-chapter-card">
                <h3 className="user-chapter-title">{book.chapterName}</h3>
                <p className="user-chapter-description">{book.chapterDescription}</p>
                <div className="user-chapter-actions">
                  <button
                    className="view-btn"
                    onClick={() => handleDownloadPdf(book.fileUrl)}
                  >
                    Download
                  </button>
                  <button className="delete-btn">Delete</button>
                </div>
              </div>
            ))
          ) : (
            <p>No books available.</p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Chapter;

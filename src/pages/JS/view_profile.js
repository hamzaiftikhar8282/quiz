import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import "../CSS/view_profile.css";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const ViewProfile = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("profile");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [donationStatus, setDonationStatus] = useState("");

  const [availability, setAvailability] = useState(false); // New availability state

  const [receivedRequests, setReceivedRequests] = useState([]);
  const [myRequests, setMyRequests] = useState([]);
  const [completedDonationsCount, setCompletedDonationsCount] = useState(0);

  // Store the donor document ID to update availability later
  const [donorDocId, setDonorDocId] = useState(null);

  const fetchUserName = async (uid) => {
    try {
      const donorQuery = query(collection(db, "donors"), where("uid", "==", uid));
      const donorSnap = await getDocs(donorQuery);
      if (!donorSnap.empty) {
        return donorSnap.docs[0].data().name || "Unknown";
      } else {
        return "Unknown";
      }
    } catch (error) {
      console.error("Error fetching user name:", error);
      return "Unknown";
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setError("No authenticated user.");
        setLoading(false);
        return;
      }

      try {
        // Fetch donor profile info and get donor doc id
        const donorQuery = query(collection(db, "donors"), where("uid", "==", user.uid));
        const donorSnap = await getDocs(donorQuery);

        if (!donorSnap.empty) {
          const donorDoc = donorSnap.docs[0];
          const data = donorDoc.data();
          setDonorDocId(donorDoc.id);
          setName(data.name || "");
          setEmail(data.email || "");
          setGender(data.gender || "");
          setLocation(data.location || "");
          setPhone(data.phone || "");
          setAvailability(data.available || false); // Set availability from db (default false)
        } else {
          setError("Donor profile not found.");
        }

        // Fetch requests sent by current user
        const sentQuery = query(
          collection(db, "donationRequests"),
          where("fromUserId", "==", user.uid)
        );
        const sentSnap = await getDocs(sentQuery);
        const sentData = await Promise.all(
          sentSnap.docs.map(async (doc) => {
            const request = doc.data();
            const toName = await fetchUserName(request.toUserId);
            return {
              id: doc.id,
              ...request,
              toName,
            };
          })
        );
        setMyRequests(sentData);
        setDonationStatus(sentData[0]?.status || "No requests yet");

        const completedCount = sentData.filter(req => req.status === "Completed").length;
        setCompletedDonationsCount(completedCount);

        // Fetch requests received by current user
        const receivedQuery = query(
          collection(db, "donationRequests"),
          where("toUserId", "==", user.uid)
        );
        const receivedSnap = await getDocs(receivedQuery);
        const receivedData = await Promise.all(
          receivedSnap.docs.map(async (doc) => {
            const request = doc.data();
            const fromName = await fetchUserName(request.fromUserId);
            return {
              id: doc.id,
              ...request,
              fromName,
            };
          })
        );
        setReceivedRequests(receivedData);
      } catch (err) {
        setError("Error loading data: " + err.message);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      setReceivedRequests((prev) =>
        prev.map((req) => (req.id === id ? { ...req, status } : req))
      );
      const requestRef = doc(db, "donationRequests", id);
      await updateDoc(requestRef, { status });
      console.log(`Updated request ${id} to status: ${status}`);
    } catch (err) {
      console.error("Failed to update request:", err);
      alert("Failed to update status. Please try again.");
    }
  };

  // New function to toggle availability and update Firestore
  const toggleAvailability = async () => {
    if (!donorDocId) return;

    try {
      const newAvailability = !availability;
      setAvailability(newAvailability);

      const donorRef = doc(db, "donors", donorDocId);
      await updateDoc(donorRef, { available: newAvailability });

      console.log("Availability updated to:", newAvailability);
    } catch (error) {
      console.error("Error updating availability:", error);
      alert("Failed to update availability. Please try again.");
    }
  };

  if (loading) return <p style={{ color: "black" }}>Loading profile...</p>;

  return (
    <div className="profile-container" style={{ color: "black" }}>
      <div className="profile-sidebar">
        <h2 className="profile-sidebar-title">Dashboard</h2>
        <ul className="profile-sidebar-list">
          <li
            className={`profile-sidebar-item ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </li>
          <li
            className={`profile-sidebar-item ${activeTab === "view" ? "active" : ""}`}
            onClick={() => setActiveTab("view")}
          >
            View Requests
          </li>
          <li
            className={`profile-sidebar-item ${activeTab === "myrequests" ? "active" : ""}`}
            onClick={() => setActiveTab("myrequests")}
          >
            My Requests
          </li>
          <li
            className={`profile-sidebar-item ${activeTab === "history" ? "active" : ""}`}
            onClick={() => setActiveTab("history")}
          >
            Request History
          </li>
        </ul>
      </div>

      <div className="profile-main-content">
        <div className="profile-card">
          {error && <p style={{ color: "black" }}>{error}</p>}

          {activeTab === "profile" && (
            <>
              <h2 className="profile-title">Profile Information</h2>
              <div className="profile-info">
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Gender:</strong> {gender}</p>
                <p><strong>Location:</strong> {location}</p>
                <p><strong>Phone:</strong> {phone}</p>
                <p><strong>Request Status:</strong> {donationStatus}</p>

                {/* New Availability toggle button */}
                <p>
                  <strong>Availability: </strong>
                  <button
                    onClick={toggleAvailability}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: availability ? "#28a745" : "#dc3545",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      marginLeft: "10px",
                    }}
                  >
                    {availability ? "Available" : "Not Available"}
                  </button>
                </p>
              </div>
            </>
          )}

          {activeTab === "view" && (
            <>
              <h2 className="profile-title">Requests Received</h2>
              <div className="profile-requests-list">
                {receivedRequests.length === 0 ? (
                  <p>No requests received yet.</p>
                ) : (
                  receivedRequests.map((req) => (
                    <div key={req.id} className="profile-request-box">
                      <p><strong>From:</strong> {req.fromName}</p>
                      <p><strong>Blood Group:</strong> {req.bloodGroup || "N/A"}</p>
                      <p><strong>Location:</strong> {req.location || "N/A"}</p>
                      <p><strong>Status:</strong> {req.status}</p>
                      <div className="profile-request-actions">
                        <button
                          className="profile-btn-complete"
                          onClick={() => handleStatusChange(req.id, "Completed")}
                        >
                          Complete
                        </button>
                        <button
                          className="profile-btn-incomplete"
                          onClick={() => handleStatusChange(req.id, "Incomplete")}
                        >
                          Incomplete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}

          {activeTab === "myrequests" && (
            <>
              <h2 className="profile-title">My Donation Requests</h2>
              <div className="profile-requests-list">
                {myRequests.length === 0 ? (
                  <p>No requests made yet.</p>
                ) : (
                  myRequests.map((req) => (
                    <div key={req.id} className="profile-request-box">
                      <p><strong>To:</strong> {req.toName}</p>
                      <p><strong>Blood Group:</strong> {req.bloodGroup || "N/A"}</p>
                      <p><strong>Location:</strong> {req.location || "N/A"}</p>
                      <p><strong>Status:</strong> {req.status || "N/A"}</p>
                    </div>
                  ))
                )}
              </div>
            </>
          )}

          {activeTab === "history" && (
            <>
              <h2 className="profile-title">Request History</h2>
              <p>
                You have completed <strong>{completedDonationsCount}</strong> donation{" "}
                {completedDonationsCount === 1 ? "request" : "requests"}.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;

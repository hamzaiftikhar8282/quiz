import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../firebase";
import Navbar from "./components/navbar";
import "../CSS/see_donor.css";

const DonorList = () => {
  const [donors, setDonors] = useState([]);
  const [searchCity, setSearchCity] = useState("");
  const [filterBloodGroup, setFilterBloodGroup] = useState("");
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [requestsSent, setRequestsSent] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch available donors on component mount
  const fetchDonors = async () => {
    setLoading(true);
    try {
      const donorQuery = collection(db, "donors");
      const querySnapshot = await getDocs(donorQuery);
      let donorList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Filter only available donors
      donorList = donorList.filter((donor) => donor.available === true);

      console.log("Available donors fetched:", donorList.length);
      donorList.forEach((donor) =>
        console.log("Available donor location:", donor.location)
      );

      setDonors(donorList);
      setFilteredDonors(donorList);
    } catch (error) {
      console.error("Error fetching donors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  // Filter donors on button click
  const handleSearch = () => {
    const citySearch = searchCity.trim().toLowerCase();
    const bloodGroupFilter = filterBloodGroup;

    let filtered = donors;

    if (citySearch !== "") {
      filtered = filtered.filter((donor) => {
        if (!donor.location) return false;
        const donorLoc = donor.location.trim().toLowerCase();

        console.log(`Donor location: [${donorLoc}], Search city: [${citySearch}]`);
        return donorLoc.includes(citySearch);
      });
    }

    if (bloodGroupFilter) {
      filtered = filtered.filter(
        (donor) => donor.bloodGroup === bloodGroupFilter
      );
    }

    console.log("Filtered donors:", filtered.length);
    setFilteredDonors(filtered);
  };

  const sendRequest = async (donorId) => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      alert("You need to be logged in to send requests.");
      return;
    }

    if (requestsSent.includes(donorId)) {
      alert("Request already sent to this donor.");
      return;
    }

    try {
      await addDoc(collection(db, "donationRequests"), {
        fromUserId: currentUser.uid,
        toUserId: donorId,
        timestamp: new Date(),
        status: "pending",
      });
      setRequestsSent([...requestsSent, donorId]);
      alert("Request sent successfully!");
    } catch (error) {
      console.error("Error sending request:", error);
      alert("Failed to send request. Please try again.");
    }
  };

  return (
    <div className="donor-list-page">
      <Navbar />
      <h2>Find Donors By City</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter city name"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          style={{
            padding: "10px",
            marginRight: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        <select
          value={filterBloodGroup}
          onChange={(e) => setFilterBloodGroup(e.target.value)}
          style={{ marginRight: "10px", padding: "10px", borderRadius: "6px" }}
        >
          <option value="">All Blood Groups</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>

        <button
          onClick={handleSearch}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>

      {loading ? (
        <p>Loading donors...</p>
      ) : filteredDonors.length === 0 ? (
        <p>No donors found for the entered city and blood group.</p>
      ) : (
        <div className="donor-list-container">
          {filteredDonors.map((donor) => (
            <div key={donor.id} className="donor-card">
              <h3>{donor.name}</h3>
              <p>
                <strong>Blood Group:</strong> {donor.bloodGroup}
              </p>
              <p>
                <strong>City:</strong> {donor.location}
              </p>
              <p>
                <strong>Phone:</strong> {donor.phone}
              </p>
              <p>
                <strong>Donations:</strong> {donor.donationsCount || 0}
              </p>
              <p>
                <strong>Status:</strong> Available
              </p>
              <button
                className="request-button"
                onClick={() => sendRequest(donor.id)}
                disabled={requestsSent.includes(donor.id)}
              >
                {requestsSent.includes(donor.id)
                  ? "Request Sent"
                  : "Send Request"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DonorList;

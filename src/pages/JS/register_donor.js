import { auth, db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder";
import React, { useState, useEffect, useRef } from "react";
import "../CSS/register_donor.css";

// Fix leaflet marker icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const citiesInPakistan = [
  "Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan",
  "Peshawar", "Quetta", "Hyderabad", "Gujranwala", "Sialkot", "Bahawalpur",
  "Sargodha", "Sukkur", "Abbottabad", "Mardan", "Mirpur", "Dera Ghazi Khan",
  "Rahim Yar Khan", "Okara", "Larkana", "Sheikhupura", "Jhelum",
];

const LocationSelector = ({ setCoordinates }) => {
  useMapEvents({
    click(e) {
      setCoordinates({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
};

const MapWithSearch = ({ setCoordinates, coordinates }) => {
  const mapRef = useRef();

  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    const geocoderControl = L.Control.geocoder({
      defaultMarkGeocode: false,
      placeholder: "Search for a city or place...",
      lang: "en",
    })
      .on("markgeocode", function (e) {
        const center = e.geocode.center;
        map.setView(center, 13);
        setCoordinates({ lat: center.lat, lng: center.lng });
      })
      .addTo(map);

    return () => {
      geocoderControl.remove();
    };
  }, [setCoordinates]);

  return (
    <MapContainer
      center={[30.3753, 69.3451]}
      zoom={6}
      style={{ height: "400px", width: "100%" }}
      whenCreated={(mapInstance) => {
        mapRef.current = mapInstance;
      }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationSelector setCoordinates={setCoordinates} />
      {coordinates && <Marker position={[coordinates.lat, coordinates.lng]} />}
    </MapContainer>
  );
};

const BecomeDonor = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    bloodGroup: "",
    phone: "",
    email: "",
    location: "",
    lastDonation: "",
    medicalConditions: "",
  });

  const [coordinates, setCoordinates] = useState(null);
  const [selectedLocationName, setSelectedLocationName] = useState("");
  const [showMapPopup, setShowMapPopup] = useState(false);
  const [tempCoordinates, setTempCoordinates] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const openMapPopup = () => {
    setTempCoordinates(coordinates);
    setShowMapPopup(true);
  };

  const cancelMapSelection = () => {
    setCoordinates(tempCoordinates);
    setShowMapPopup(false);
  };

  const confirmMapSelection = () => {
    setShowMapPopup(false);
  };

  useEffect(() => {
    if (!coordinates) {
      setSelectedLocationName("");
      return;
    }

    const geocoder = L.Control.Geocoder.nominatim();
    geocoder.reverse(
      L.latLng(coordinates.lat, coordinates.lng),
      1,
      function (results) {
        if (results && results.length > 0) {
          setSelectedLocationName(results[0].name || "");
        } else {
          setSelectedLocationName("Unknown location");
        }
      }
    );
  }, [coordinates]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError("");

    const user = auth.currentUser;
    console.log("Auth User:", user);
    if (!user) {
      alert("You must be logged in to register as a donor.");
      setIsSubmitting(false);
      return;
    }

    if (!coordinates) {
      alert("Please select a location on the map.");
      setIsSubmitting(false);
      return;
    }

    console.log("Donor Submission Data:", {
      ...formData,
      locationCoordinates: coordinates,
      uid: user.uid,
    });

    try {
      await addDoc(collection(db, "donors"), {
        ...formData,
        locationCoordinates: coordinates,
        uid: user.uid,
        timestamp: new Date(),
      });
      alert(`Thank you, ${formData.name}, for registering as a donor!`);
      // Optional redirect
      window.location.href = "/"; // change if needed
    } catch (error) {
      console.error("Error saving donor data:", error);
      setSubmitError("Failed to register. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="become-donor-page">
      <div className="become-donor-card">
        <h2>Become a Donor</h2>
        <form
          className="become-donor-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <input className="auth-field-input" type="text" name="name" placeholder="Full Name" required onChange={handleChange} />
          <input className="auth-field-input" type="number" name="age" placeholder="Age" required onChange={handleChange} />
          <select className="auth-field-input" name="gender" required onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <select className="auth-field-input" name="bloodGroup" required onChange={handleChange}>
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
          <input className="auth-field-input" type="tel" name="phone" placeholder="Phone Number" required onChange={handleChange} />
          <input className="auth-field-input" type="email" name="email" placeholder="Email Address" required onChange={handleChange} />
          <select className="auth-field-input" name="location" required onChange={handleChange} value={formData.location}>
            <option value="">Select Your City</option>
            {citiesInPakistan.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          <input className="auth-field-input" type="date" name="lastDonation" onChange={handleChange} />
          <textarea className="auth-field-input" name="medicalConditions" placeholder="Any Medical Conditions (if any)" rows="3" onChange={handleChange}></textarea>

          <button type="button" className="become-donor-button" onClick={openMapPopup} style={{ marginBottom: "15px" }}>
            Select Location on Map
          </button>

          {selectedLocationName && (
            <div style={{ fontSize: "0.9em", marginBottom: "10px" }}>
              Selected Location: {selectedLocationName}
            </div>
          )}

          {showMapPopup && (
            <div className="map-popup-overlay">
              <div className="map-popup">
                <MapWithSearch setCoordinates={setCoordinates} coordinates={coordinates} />
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px", gap: "10px" }}>
                  <button type="button" className="become-donor-button" onClick={confirmMapSelection}>OK</button>
                  <button type="button" className="become-donor-button" onClick={cancelMapSelection} style={{ backgroundColor: "#d9534f" }}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {submitError && (
            <div style={{ color: "red", marginBottom: "10px" }}>{submitError}</div>
          )}

          <button type="submit" className="become-donor-button" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Register as Donor"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BecomeDonor;

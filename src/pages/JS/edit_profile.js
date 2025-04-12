import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { updateProfile, updateEmail, updatePassword } from "firebase/auth";
import "../CSS/Auth.css";

const EditProfile = () => {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
      setDisplayName(currentUser.displayName || "");
      setNewEmail(currentUser.email || "");
    }
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      if (user) {
        if (displayName !== user.displayName) {
          await updateProfile(user, { displayName });
        }

        if (newEmail !== user.email) {
          await updateEmail(user, newEmail);
        }

        if (newPassword) {
          if (newPassword.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
          }
          await updatePassword(user, newPassword);
        }

        setSuccess("Profile updated successfully!");
      }
    } catch (err) {
      console.error("Update error:", err.message);
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Edit Profile</h2>
        <form onSubmit={handleUpdate} className="auth-form">
          <div className="auth-field">
            <label>Name</label>
            <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
          </div>
          <div className="auth-field">
            <label>Email</label>
            <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
          </div>
          <div className="auth-field">
            <label>New Password</label>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Leave blank to keep same" />
          </div>

          {error && <p className="error-text">{error}</p>}
          {success && <p className="success-text">{success}</p>}

          <button type="submit" className="auth-button">Update Profile</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;

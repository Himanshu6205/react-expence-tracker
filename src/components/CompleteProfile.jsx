// src/components/CompleteProfile.jsx
import React, { useState } from "react";
import { auth } from "../firebase";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function CompleteProfile() {
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError("");

    if (!auth.currentUser) {
      setError("No user is logged in.");
      return;
    }

    try {
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL,
      });

      console.log("Profile updated successfully.");
      // Redirect back or show success message
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="w-full max-w-sm p-8 bg-white shadow-md rounded">
        <h2 className="text-center text-2xl font-bold mb-6">
          Complete Profile
        </h2>
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <input
            type="text"
            placeholder="Display Name"
            className="w-full p-2 border rounded"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Photo URL"
            className="w-full p-2 border rounded"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

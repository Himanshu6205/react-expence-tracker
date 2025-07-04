// src/components/Dashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleCompleteProfile = () => {
    navigate("/complete-profile");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-50">
      <h1 className="text-2xl font-bold mb-4 text-yellow-800">
        Your profile is incomplete
      </h1>
      <button
        onClick={handleCompleteProfile}
        className="px-6 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
      >
        Complete Profile
      </button>
    </div>
  );
}

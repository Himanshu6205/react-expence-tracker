import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendEmailVerification } from "../api/authApi";

export default function Dashboard() {
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  // ✅ LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  // ✅ VERIFY EMAIL FUNCTION
  const handleVerifyEmail = async () => {
    setMsg("");
    const token = localStorage.getItem("token");

    try {
      const data = await sendEmailVerification(token);
      console.log("Verification email sent:", data);
      setMsg("✅ Verification email sent! Please check your inbox.");
    } catch (err) {
      console.error(err);
      if (err.message === "INVALID_ID_TOKEN") {
        setMsg("❌ Session expired. Please login again.");
      } else if (err.message === "USER_DISABLED") {
        setMsg("❌ This user account is disabled.");
      } else if (err.message === "EMAIL_NOT_FOUND") {
        setMsg("❌ Email not found.");
      } else {
        setMsg(`❌ ${err.message}`);
      }
    }
  };

  // ✅ COMPLETE PROFILE FUNCTION
  const handleCompleteProfile = () => {
    navigate("/complete-profile");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-8 bg-yellow-50 relative">
      {/* ✅ LOGOUT BUTTON */}
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>

      {/* ✅ Main Dashboard Content */}
      <h1 className="text-2xl font-bold mb-4 text-yellow-800">
        Your profile is incomplete
      </h1>

      <button
        onClick={handleCompleteProfile}
        className="px-6 py-2 mb-4 bg-yellow-500 text-white rounded hover:bg-yellow-600"
      >
        Complete Profile
      </button>

      <button
        onClick={handleVerifyEmail}
        className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Verify Email
      </button>

      {msg && <p className="mt-4 text-green-800 font-semibold">{msg}</p>}
    </div>
  );
}

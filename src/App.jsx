import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Ye sab teri components folder se aayenge:
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import CompleteProfile from "./components/CompleteProfile";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Sign Up Screen */}
        <Route path="/signup" element={<SignUp />} />

        {/* Login Screen */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard: yaha user ko "profile incomplete" aur "complete profile" button dikhega */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Complete Profile Screen: yaha user apna naam aur photo update karega */}
        <Route path="/complete-profile" element={<CompleteProfile />} />

        {/* Default route: agar koi root pe aaye toh Login pe bhej de */}
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

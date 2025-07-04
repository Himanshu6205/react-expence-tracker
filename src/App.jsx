import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import CompleteProfile from "./components/CompleteProfile";
import ForgotPassword from "./components/ForgotPassword"; // ✅ NEW

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />{" "}
        {/* ✅ NEW */}
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

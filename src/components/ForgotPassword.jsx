import React, { useState } from "react";
import { sendPasswordResetEmail } from "../api/authApi";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      await sendPasswordResetEmail(email);
      setMsg("✅ Password reset link sent! Check your inbox.");
    } catch (err) {
      console.error(err);
      setMsg(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const isFormInvalid = !email;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white shadow-md rounded">
        <h2 className="text-center text-2xl font-bold mb-6">Reset Password</h2>

        <form onSubmit={handleResetPassword} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {msg && <p className="text-green-600 text-sm text-center">{msg}</p>}

          {loading ? (
            <p className="text-center">Sending reset link...</p>
          ) : (
            <button
              type="submit"
              disabled={isFormInvalid}
              className={`w-full py-2 bg-blue-600 text-white rounded ${
                isFormInvalid
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-700"
              }`}
            >
              Send Reset Link
            </button>
          )}
        </form>

        <p className="mt-4 text-center">
          Remember password?{" "}
          <a href="/login" className="text-blue-600 underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

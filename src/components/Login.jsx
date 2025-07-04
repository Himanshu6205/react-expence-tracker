import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await loginUser(email, password);
      localStorage.setItem("token", data.idToken);
      localStorage.setItem("userId", data.localId);
      console.log("User has successfully logged in:", data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  const isFormInvalid = !email || !password;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white shadow-md rounded">
        <h2 className="text-center text-2xl font-bold mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={isFormInvalid}
            className={`w-full py-2 bg-blue-600 text-white rounded ${
              isFormInvalid
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-700"
            }`}
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="text-blue-600 underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

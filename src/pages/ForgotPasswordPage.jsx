import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendPasswordReset } from "../firebase/auth";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    setLoading(true);
    try {
      const res = await sendPasswordReset(email);
      if (res.email) {
        setMessage(
          "A password reset link has been sent to your email address."
        );
        setEmail("");
      } else {
        throw new Error(res.error.message);
      }
    } catch (err) {
      setError("Failed to send password reset. " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="w-full max-w-md bg-slate-800 shadow-xl rounded-3xl p-8 border border-slate-700">
        <h1 className="text-3xl font-semibold text-center text-slate-200 mb-4">
          Forgot Password?
        </h1>
        <p className="text-center text-slate-400 mb-6 text-sm">
          Enter your email address below and we&apos;ll send you a link to reset
          your password.
        </p>

        <form onSubmit={handlePasswordReset} className="space-y-4">
          <input
            className="w-full bg-slate-700 border border-slate-600 text-slate-100 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            placeholder="Your email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {loading && (
            <div className="text-center text-indigo-400 font-medium text-sm">
              Sending link... Please wait.
            </div>
          )}
          {error && <p className="text-red-500 text-xs text-center">{error}</p>}
          {message && (
            <p className="text-green-500 text-sm text-center">{message}</p>
          )}

          <button
            type="submit"
            className={`w-full bg-indigo-500 text-white font-medium py-2 rounded-xl transition-all duration-200 shadow-sm
              ${
                loading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-indigo-400"
              }`}
            disabled={loading}
          >
            Send Reset Link
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <button
            onClick={() => navigate("/login")}
            className="text-slate-400 hover:underline"
          >
            Remembered your password?{" "}
            <span className="text-indigo-400 font-medium">Back to Login</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;

import { useState, useEffect } from "react";
import { LoginWithEmail } from "../firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }
    setLoading(true);
    try {
      const res = await LoginWithEmail(email, password);
      if (res.idToken) {
        dispatch(login({ token: res.idToken, userId: res.localId }));
        navigate("/dashboard");
      } else {
        throw new Error(res.error.message);
      }
    } catch (error) {
      let displayMessage = "Login failed. Please check your credentials.";
      if (
        error.message.includes("INVALID_PASSWORD") ||
        error.message.includes("EMAIL_NOT_FOUND")
      ) {
        displayMessage = "Invalid email or password.";
      } else if (error.message.includes("INVALID_EMAIL")) {
        displayMessage = "Invalid email address format.";
      }
      setErrorMessage(displayMessage);
    } finally {
      setLoading(false);
    }
  };

  // ✅ New Guest Login Handler
  const handleGuestLogin = () => {
    dispatch(login({ token: "guest-token", userId: "guest" }));
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="w-full max-w-md bg-slate-800 shadow-xl rounded-3xl p-8 border border-slate-700">
        <h1 className="text-3xl font-semibold text-center text-slate-200 mb-6">
          Welcome Back
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            className="w-full bg-slate-700 border border-slate-600 text-slate-100 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            placeholder="Email address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="w-full bg-slate-700 border border-slate-600 text-slate-100 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {errorMessage && (
            <p className="text-red-500 text-xs text-center">{errorMessage}</p>
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
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* ✅ Guest Login Button */}
          <button
            type="button"
            onClick={handleGuestLogin}
            className="w-full mt-3 bg-green-500 hover:bg-green-400 text-white font-medium py-2 rounded-xl transition-all duration-200 shadow-sm"
          >
            Login as Guest
          </button>

          <div className="text-center">
            <button
              type="button"
              className="text-sm text-indigo-400 hover:underline hover:text-indigo-300 transition"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot your password?
            </button>
          </div>
        </form>

        <div className="mt-5 text-center text-sm">
          <button
            className="text-slate-400 hover:underline"
            onClick={() => navigate("/signup")}
          >
            Don’t have an account?{" "}
            <span className="text-indigo-400 font-medium">Sign up</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

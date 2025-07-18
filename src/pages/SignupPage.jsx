import { useState } from "react";
import { SignUpWithEmail } from "../firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";

const SignupPage = () => {
  const [inputVal, setInputVal] = useState("");
  const [passwordVal, setPasswordVal] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFormSignUp = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (!inputVal || !passwordVal || !confirmPassword) {
      setErrorMessage("Please fill in all the fields.");
      return;
    }
    if (passwordVal !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    try {
      const res = await SignUpWithEmail(inputVal, passwordVal);
      if (res.idToken) {
        dispatch(login({ token: res.idToken, userId: res.localId }));
        navigate("/");
      } else {
        throw new Error(res.error.message);
      }
    } catch (err) {
      setErrorMessage("Signup failed. " + err.message);
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="w-full max-w-md bg-slate-800 shadow-xl rounded-3xl p-8 border border-slate-700">
        <h1 className="text-3xl font-semibold text-center text-slate-200 mb-6">
          Create Your Account
        </h1>

        <form onSubmit={handleFormSignUp} className="space-y-4">
          <input
            className="w-full bg-slate-700 border border-slate-600 text-slate-100 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            placeholder="Email address"
            type="email"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
          <input
            className="w-full bg-slate-700 border border-slate-600 text-slate-100 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            placeholder="Password"
            type="password"
            value={passwordVal}
            onChange={(e) => setPasswordVal(e.target.value)}
          />
          <input
            className="w-full bg-slate-700 border border-slate-600 text-slate-100 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {errorMessage && (
            <p className="text-red-500 text-xs text-center">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-400 text-white font-medium py-2 rounded-xl transition-all duration-200 shadow-sm"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <button
            onClick={() => navigate("/")}
            className="text-slate-400 hover:underline"
          >
            Already have an account?{" "}
            <span className="text-indigo-400 font-medium">Login</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

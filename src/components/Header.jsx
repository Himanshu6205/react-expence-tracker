import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "../store/authSlice";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const isPremium = useSelector((state) => state.auth.isPremium);
  const expenses = useSelector((state) => state.expenses.expenses);

  useEffect(() => {
    const publicPaths = ["/login", "/signup", "/", "/forgot-password"];
    if (!token && !publicPaths.includes(location.pathname)) {
      navigate("/login");
    }
  }, [location.pathname, token, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleDownload = () => {
    const csvHeader = "Title,Amount,Category,Timestamp\n";
    const csvRows = expenses
      .map(
        (exp) => `${exp.title},${exp.amount},${exp.category},${exp.timestamp}`
      )
      .join("\n");

    const blob = new Blob([csvHeader + csvRows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "expenses.csv";
    a.click();
  };

  const handleProtectedNavigation = (path) => {
    if (!token) {
      toast.error("Please log in to access this page.");
      navigate("/login");
    } else {
      navigate(path);
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-slate-900 text-slate-200 shadow-lg p-4 md:p-6 fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <span
          onClick={() => navigate("/")}
          className="text-xl md:text-2xl font-extrabold tracking-tight cursor-pointer"
        >
          Expense Calculator
        </span>

        <nav className="hidden md:flex items-center space-x-6">
          <button
            onClick={() => handleProtectedNavigation("/dashboard")}
            className="hover:text-indigo-400 font-medium"
          >
            Dashboard
          </button>
          <button
            onClick={() => handleProtectedNavigation("/expenses")}
            className="hover:text-indigo-400 font-medium"
          >
            My Expenses
          </button>
          {token && (
            <button
              onClick={() => handleProtectedNavigation("/complete-profile")}
              className="hover:text-indigo-400 font-medium"
            >
              Profile
            </button>
          )}

          {isPremium && (
            <>
              <button
                onClick={handleDownload}
                className="bg-indigo-500 text-white font-semibold px-4 py-2 rounded-xl hover:bg-indigo-400 transition"
              >
                📁 Download CSV
              </button>
              <ThemeToggle />
            </>
          )}

          {token ? (
            <button
              onClick={handleLogout}
              className="bg-indigo-500 text-white px-5 py-2 rounded-xl font-semibold hover:bg-indigo-400 transition"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-indigo-500 text-white px-5 py-2 rounded-xl font-semibold hover:bg-indigo-400"
            >
              Login
            </button>
          )}
        </nav>

        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-slate-200 focus:outline-none"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden mt-4 px-4 space-y-4 p-4 rounded-md bg-slate-800 shadow-slate-900">
          <button
            onClick={() => handleProtectedNavigation("/dashboard")}
            className="block w-full text-center text-slate-200 font-medium hover:text-indigo-400"
          >
            Dashboard
          </button>
          <button
            onClick={() => handleProtectedNavigation("/expenses")}
            className="block w-full text-center text-slate-200 font-medium hover:text-indigo-400"
          >
            My Expenses
          </button>
          {token && (
            <button
              onClick={() => handleProtectedNavigation("/complete-profile")}
              className="block w-full text-center text-slate-200 font-medium hover:text-indigo-400"
            >
              Profile
            </button>
          )}
          {isPremium && (
            <>
              <button
                onClick={handleDownload}
                className="block w-full text-center bg-indigo-500 text-white px-4 py-2 rounded-xl shadow hover:bg-indigo-400 transition"
              >
                📁 Download CSV
              </button>
              <div className="block w-full text-center bg-indigo-500 text-white px-4 py-2 rounded-xl shadow hover:bg-indigo-400 transition">
                <ThemeToggle />
              </div>
            </>
          )}
          {token ? (
            <button
              onClick={handleLogout}
              className="block w-full text-center bg-indigo-500 text-white px-5 py-2 rounded-xl font-semibold hover:bg-indigo-400 transition"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="block w-full text-center bg-indigo-500 text-white px-5 py-2 rounded-xl font-semibold hover:bg-indigo-400"
            >
              Login
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;

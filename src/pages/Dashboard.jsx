import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/expenses");
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col overflow-x-hidden text-slate-200">
      {/* Hero Section */}
      <div className="flex flex-col justify-center items-center text-center px-4 pt-40 sm:px-6 py-20 flex-grow w-full">
        <div className="w-full max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-indigo-400 leading-tight break-words">
            Welcome to <span className="text-indigo-500">Expense Tracker</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg md:text-xl mt-4">
            Track your daily expenses and take control of your finances. <br />
            Stay consistent, stay smart.
          </p>
          <button
            onClick={handleGetStarted}
            className="mt-8 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 px-8 rounded-full transition duration-300 text-lg shadow-lg shadow-indigo-800/30"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Info Cards Section */}
      <div className="px-6 pb-20 grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
        {/* Card 1 */}
        <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 hover:scale-105 transition duration-300 shadow-md shadow-slate-900/50">
          <h2 className="text-xl font-semibold text-indigo-400 mb-2">
            💰 Easy Expense Tracking
          </h2>
          <p className="text-slate-400 text-sm">
            Log your income and expenses effortlessly. Stay organized and
            understand where your money goes.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 hover:scale-105 transition duration-300 shadow-md shadow-slate-900/50">
          <h2 className="text-xl font-semibold text-indigo-400 mb-2">
            📊 Visual Insights
          </h2>
          <p className="text-slate-400 text-sm">
            Get beautiful visual summaries of your spending habits and monthly
            reports in one click.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 hover:scale-105 transition duration-300 shadow-md shadow-slate-900/50">
          <h2 className="text-xl font-semibold text-indigo-400 mb-2">
            🔒 Secure & Private
          </h2>
          <p className="text-slate-400 text-sm">
            Your data is safely stored and accessible only to you. We value your
            privacy as much as your money.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

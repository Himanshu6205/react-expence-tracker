import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { sendEmailVerification } from "../api/authApi";
import { addExpense, getAllExpenses } from "../api/expenseApi";

export default function Dashboard() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");

  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Food");

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  // ✅ Get expenses on mount
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const data = await getAllExpenses(token, userId);
        setExpenses(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchExpenses();
  }, [token, userId]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const handleCompleteProfile = () => {
    navigate("/complete-profile");
  };

  const handleVerifyEmail = async () => {
    setMsg("");
    try {
      await sendEmailVerification(token);
      setMsg("✅ Verification email sent! Check your inbox.");
    } catch (err) {
      setMsg(`❌ ${err.message}`);
    }
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (!amount || !description || !category) return;

    const newExpense = {
      amount,
      description,
      category,
    };

    try {
      const data = await addExpense(newExpense, token, userId);
      console.log("Added expense:", data);

      setExpenses((prev) => [...prev, { id: data.name, ...newExpense }]);

      setAmount("");
      setDescription("");
      setCategory("Food");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-8 bg-yellow-50 relative">
      {/* ✅ Logout */}
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>

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
        className="px-6 py-2 mb-4 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Verify Email
      </button>

      {msg && <p className="mt-4 text-green-800 font-semibold">{msg}</p>}

      {/* ✅ Expense Form */}
      <div className="w-full max-w-md mt-8 bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">Add Daily Expense</h2>
        <form onSubmit={handleAddExpense} className="space-y-4">
          <input
            type="number"
            placeholder="Amount spent"
            className="w-full p-2 border rounded"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            className="w-full p-2 border rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <select
            className="w-full p-2 border rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Food">Food</option>
            <option value="Petrol">Petrol</option>
            <option value="Salary">Salary</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Shopping">Shopping</option>
          </select>
          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Add Expense
          </button>
        </form>
      </div>

      {/* ✅ Expenses List */}
      <div className="w-full max-w-md mt-8">
        <h2 className="text-xl font-bold mb-4">Your Expenses</h2>
        {expenses.length === 0 ? (
          <p>No expenses added yet.</p>
        ) : (
          <ul className="space-y-2">
            {expenses.map((exp) => (
              <li
                key={exp.id}
                className="border p-3 rounded flex justify-between items-center bg-white shadow-sm"
              >
                <div>
                  <p className="font-semibold">₹ {exp.amount}</p>
                  <p className="text-sm">{exp.description}</p>
                  <p className="text-xs text-gray-500">{exp.category}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

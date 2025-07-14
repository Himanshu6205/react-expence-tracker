import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setExpensesList } from "../store/expensesSlice";
import { unlockPremium } from "../store/authSlice";
import {
  getAllExpenses,
  deleteExpense,
  updateExpense,
} from "../firebase/firebaseRest";
import AddExpenseForm from "../components/AddExpenseForm";

const Expenses = () => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.expenses);
  const isPremium = useSelector((state) => state.auth.isPremium);
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);

  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [editCategory, setEditCategory] = useState("transport");

  const [searchCategory, setSearchCategory] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  useEffect(() => {
    if (!token || !userId) return;
    const fetchData = async () => {
      try {
        const expenses = await getAllExpenses(token, userId);
        dispatch(setExpensesList(expenses));
      } catch (err) {
        toast.error("Failed to fetch expenses!");
        console.error(err);
      }
    };
    fetchData();
  }, [token, userId, dispatch]);

  const handleDelete = async (id) => {
    try {
      await deleteExpense(id, token, userId);
      toast.success("Expense deleted!");
      dispatch(setExpensesList(expenses.filter((e) => e.id !== id)));
      if (editId === id) resetEdit();
    } catch (err) {
      toast.error("Error deleting!");
      console.log(err);
    }
  };

  const handleEdit = (exp) => {
    setEditId(exp.id);
    setEditTitle(exp.title);
    setEditAmount(exp.amount);
    setEditCategory(exp.category);
  };

  const resetEdit = () => {
    setEditId(null);
    setEditTitle("");
    setEditAmount("");
    setEditCategory("transport");
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editTitle.trim() || !editAmount) {
      toast.error("Please fill all fields!");
      return;
    }
    const updatedExpense = {
      title: editTitle,
      amount: Number(editAmount),
      category: editCategory,
      timestamp: new Date().toISOString(),
    };
    try {
      await updateExpense(editId, updatedExpense, token, userId);
      toast.success("Expense updated!");
      resetEdit();
      const updatedList = await getAllExpenses(token, userId);
      dispatch(setExpensesList(updatedList));
    } catch (err) {
      toast.error("Failed to update!");
      console.log(err);
    }
  };

  const totalAmount = expenses.reduce(
    (acc, curr) => acc + Number(curr.amount),
    0
  );

  const filteredExpenses = expenses.filter((exp) => {
    const matchCategory = exp.category
      .toLowerCase()
      .includes(searchCategory.toLowerCase());
    const matchTitle = exp.title
      .toLowerCase()
      .includes(searchTitle.toLowerCase());
    const matchFilter =
      selectedFilter === "All" || exp.category === selectedFilter;
    return matchCategory && matchTitle && matchFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-cyan-200 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <AddExpenseForm />
        </div>

        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-slate-800">
            My Expenses
          </h2>
          <p className="mt-2 text-lg text-slate-700 font-medium">
            Total Spent: ₹{totalAmount}
          </p>
          {!isPremium && totalAmount > 10000 && (
            <button
              onClick={() => dispatch(unlockPremium())}
              className="mt-4 bg-cyan-700 text-white px-6 py-2 rounded-full font-semibold hover:bg-cyan-800 transition"
            >
              Unlock Premium
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="mb-10 flex flex-col md:flex-row justify-center gap-4 items-center">
          <input
            type="text"
            placeholder="🔍 Search by title..."
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            className="px-4 py-2 w-full md:w-1/3 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
          />

          <input
            type="text"
            placeholder="🔎 Search by category..."
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
            className="px-4 py-2 w-full md:w-1/3 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
          />

          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-4 py-2 rounded border border-gray-400 w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            <option value="All">All</option>
            <option value="transport">Transport</option>
            <option value="shopping">Shopping</option>
            <option value="bills">Bills</option>
            <option value="food">Food</option>
            <option value="miscellaneous">Miscellaneous</option>
          </select>
        </div>

        {/* Expenses Grid */}
        {filteredExpenses.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            No expenses found.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredExpenses.map((exp) => (
              <div
                key={exp.id}
                className="bg-white rounded-xl shadow-md p-5 border border-gray-200 hover:shadow-xl transition"
              >
                {editId === exp.id ? (
                  <form onSubmit={handleSave} className="space-y-3">
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full border border-gray-300 p-2 rounded"
                      placeholder="Title"
                    />
                    <input
                      type="number"
                      value={editAmount}
                      onChange={(e) => setEditAmount(e.target.value)}
                      className="w-full border border-gray-300 p-2 rounded"
                      placeholder="Amount"
                    />
                    <select
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                      className="w-full border border-gray-300 p-2 rounded"
                    >
                      <option value="transport">Transport</option>
                      <option value="shopping">Shopping</option>
                      <option value="bills">Bills</option>
                      <option value="food">Food</option>
                      <option value="miscellaneous">Miscellaneous</option>
                    </select>
                    <div className="flex gap-2 justify-end">
                      <button
                        type="submit"
                        className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={resetEdit}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <h3 className="text-lg font-bold text-slate-900">
                      {exp.title}
                    </h3>
                    <p className="text-sm text-slate-700 mb-2">
                      ₹{exp.amount} • {exp.category}
                    </p>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(exp)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(exp.id)}
                        className="bg-pink-600 text-white px-3 py-1 rounded hover:bg-pink-700"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Expenses;

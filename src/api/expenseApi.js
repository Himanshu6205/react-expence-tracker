const DB_URL = import.meta.env.VITE_FIREBASE_DB_URL;

// ✅ Add Expense
export const addExpense = async (expense, idToken, userId) => {
  const res = await fetch(`${DB_URL}/expenses/${userId}.json?auth=${idToken}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...expense,
      createdAt: new Date().toISOString(),
    }),
  });

  if (!res.ok) throw new Error("Failed to add expense");
  return res.json(); // { name: "-Mxyz123..." }
};

// ✅ Get All Expenses
export const getAllExpenses = async (idToken, userId) => {
  const res = await fetch(`${DB_URL}/expenses/${userId}.json?auth=${idToken}`);
  const data = await res.json();

  if (!data || data.error) return [];
  return Object.entries(data).map(([id, value]) => ({
    id,
    ...value,
  }));
};

// ✅ Delete Expense
export const deleteExpense = async (expenseId, idToken, userId) => {
  const res = await fetch(
    `${DB_URL}/expenses/${userId}/${expenseId}.json?auth=${idToken}`,
    { method: "DELETE" }
  );
  if (!res.ok) throw new Error("Failed to delete expense");
};

// ✅ Update Expense
export const updateExpense = async (expenseId, updatedData, idToken, userId) => {
  const res = await fetch(
    `${DB_URL}/expenses/${userId}/${expenseId}.json?auth=${idToken}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    }
  );
  if (!res.ok) throw new Error("Failed to update expense");
};

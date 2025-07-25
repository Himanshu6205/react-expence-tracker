import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "./expensesSlice";
import authReducer from "./authSlice";
 

export const store = configureStore({
  reducer: {
    expenses: expensesReducer,
    auth: authReducer,
  },
});

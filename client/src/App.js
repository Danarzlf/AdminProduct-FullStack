import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
  Navigate,
  BrowserRouter,
} from "react-router-dom";
import Expense from "./components/Expenses/Expense";
import ExpenseDetail from "./components/Expenses/ExpenseDetail";
import ExpenseFormUpdate from "./components/NewExpense/ExpenseFormUpdate";

import ExpenseLogin from "./components/Expenses/ExpenseLogin";
import ExpenseRegister from "./components/Expenses/ExpenseRegister";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ExpenseLogin />} />
        <Route path="/dashboard" element={<Expense />} />
        <Route path="/details/:id" element={<ExpenseDetail />} />
        <Route path="/update/:id" element={<ExpenseFormUpdate />} />
        <Route path="/register" element={<ExpenseRegister />} />{" "}
        {/* Tambahkan properti element untuk rute login */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;

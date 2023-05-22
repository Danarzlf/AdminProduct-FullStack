import React, { useState } from "react";

import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesList from "./ExpensesList";
import ExpensesChart from "./ExpensesChart";
import "./Expenses.css";

const Expenses = (props) => {
  

  const [filteredYear, setFilteredYear] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  const searchChangeHandler = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredExpenses = props?.items?.products?.filter((expense) => {
    const expenseYear = new Date(expense?.createdAt).getFullYear().toString();
    const expenseName = expense?.name.toLowerCase();

    // Filter berdasarkan tahun
    if (filteredYear !== "All" && expenseYear !== filteredYear) {
      return false;
    }

    // Filter berdasarkan pencarian nama produk
    if (
      searchTerm.trim() !== "" &&
      !expenseName.includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  return (
    <div className="container">
      
        <ExpensesFilter
          selected={filteredYear}
          onChangeFilter={filterChangeHandler}
          onSearch={searchChangeHandler}
        />
        {/* <ExpensesChart expenses={filteredExpenses}  /> */}
        <ExpensesList items={filteredExpenses} />
      
    </div>
  );
};

export default Expenses;

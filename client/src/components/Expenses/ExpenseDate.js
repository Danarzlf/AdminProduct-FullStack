import React from "react";

import "./ExpenseDate.css";

const ExpenseDate = (props) => {
  const dateTime = new Date(props.date).toLocaleString("id-ID", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <div className="">
      <div className="">{dateTime}</div>
    </div>
  );
};

export default ExpenseDate;
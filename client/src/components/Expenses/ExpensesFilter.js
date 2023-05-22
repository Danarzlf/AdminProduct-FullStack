import React from "react";
import { FaSearch } from "react-icons/fa";

import "./ExpensesFilter.css";

const ExpensesFilter = (props) => {
  const styles = `
  .form-edit {
    background: white;
    border : 1px solid #6e6e6e;
    border-right:none;
  }

  .year-filter {
    background: white;
    border : 1px solid #6e6e6e;
    padding: 14px 20px;
    font-size: 12px;
  }

  .input-group-text {
    display: flex;
    align-items: center;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color:#6e6e6e;
    text-align: center;
    white-space: nowrap;
     background-color: white; 
    border: var(--bs-border-width) solid #101010;
    /* border-radius: var(--bs-border-radius); */
}
  `;
  const dropdownChangeHandler = (event) => {
    props.onChangeFilter(event.target.value);
  };

  const searchChangeHandler = (event) => {
    props.onSearch(event);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="row mb-5">
        <div className="col-md-6">
          <select
            class="form-select  year-filter"
            aria-label="Default select example"
            value={props.selected}
            onChange={dropdownChangeHandler}
          >
            <option selected value="All">
              All
            </option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
          </select>
        </div>
        <div className="col-md-6">
          <div className="input-group">
            <input
              type="text"
              className="form-control form-edit"
              placeholder="Search Product"
              aria-label="Search Product"
              aria-describedby="basic-addon1"
              value={props.searchTerm}
              onChange={searchChangeHandler}
            />
            <span className="input-group-text search-icon">
              <FaSearch />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpensesFilter;

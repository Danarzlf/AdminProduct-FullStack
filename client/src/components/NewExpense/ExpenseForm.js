import React, { useState } from "react";
import axios from "axios";

import "./ExpenseForm.css";

const ExpenseForm = (props) => {
  const [enteredName, setEnteredName] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredStock, setEnteredStock] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [enteredDate, setEnteredDate] = useState(""); // New state for date
  const [enteredDescription, setEnteredDescription] = useState(""); // New state for description
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const titleChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };

  const stockChangeHandler = (event) => {
    setEnteredStock(event.target.value);
  };

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  const descriptionChangeHandler = (event) => {
    setEnteredDescription(event.target.value);
  };

  const fileChangeHandler = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (
      enteredName.trim() === "" ||
      enteredAmount.trim() === "" ||
      enteredStock.trim() === "" ||
      selectedFile === null ||
      enteredDate.trim() === "" || // Check if date field is empty
      enteredDescription.trim() === "" // Check if description field is empty
    ) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("name", enteredName);
    formData.append("price", enteredAmount);
    formData.append("stock", enteredStock);
    formData.append("image", selectedFile);
    formData.append("date", enteredDate); // Append date to form data
    formData.append("description", enteredDescription); // Append description to form data

    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      const response = await axios.post(
        "http://localhost:8000/api/v1/products",
        formData,
        { headers }
      );
      console.log(response.data);

      setEnteredName("");
      setEnteredAmount("");
      setEnteredStock("");
      setSelectedFile(null);
      setPreviewImage(null);
      setEnteredDate(""); // Clear date field
      setEnteredDescription(""); // Clear description field
      window.location.href = "/dashboard";
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input
            type="text"
            value={enteredName}
            onChange={titleChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Price</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={enteredAmount}
            onChange={amountChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Stock</label>
          <input
            type="number"
            min="1"
            step="1"
            value={enteredStock}
            onChange={stockChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input type="date" value={enteredDate} onChange={dateChangeHandler} />
        </div>
        <div className="new-expense__control">
          <label>Description</label>
          <textarea
            rows="3"
            value={enteredDescription}
            onChange={descriptionChangeHandler}
          ></textarea>
        </div>
        <div className="new-expense__control">
          <label>Image</label>
          <input type="file" onChange={fileChangeHandler} />
          {previewImage && (
            <img src={previewImage} alt="Preview" className="image-preview" />
          )}
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Please Wait..." : "Add Product"}
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

export default ExpenseForm;

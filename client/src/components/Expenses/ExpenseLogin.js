import React, { useState } from "react";
import axios from "axios";
import "./ExpenseLogin.css";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";

const ExpenseLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/login",
        {
          email,
          password,
        }
      );

      // Simpan token ke penyimpanan lokal (localStorage atau session storage)
      localStorage.setItem("token", response.data.data.token);

      // Redirect ke halaman localhost:3000 setelah login berhasil
      window.location.href = "http://localhost:3000/dashboard";
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="container-fluid d-flex flex-column justify-content-end align-items-center vh-100">
      <div className="row justify-content-end">
        <div className="col-md-5 pt-3 ms-2 me-xxl-5 ps-xxl-4">
          <h1>Login</h1>
          <p className="mb-5">
            Unlock your dashboard with a simple login and take control of
            everything
          </p>
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                aria-label="Email"
                value={email}
                onChange={handleEmailChange}
                required
                style={{ fontFamily: "Segoe UI, sans-serif" }}
              />
            </div>
            <div className="input-group mb-2">
              <input
                type="password"
                placeholder="Password"
                aria-label="Password"
                className="form-control"
                value={password}
                onChange={handlePasswordChange}
                required
                style={{ fontFamily: "Segoe UI, sans-serif" }}
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <div className="d-grid gap-2 mt-5">
              <button
                className="btn btn-primary lg sign-up fw-bold"
                type="submit"
              >
                Log in
              </button>
            </div>
          </form>
          <p className="mt-5 mb-1 text-center">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
        <div className="col-md-6 d-flex justify-content-end">
          <img
            src="assets/images/Group 11.png"
            alt="background"
            className="img-fluid"
            style={{ width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ExpenseLogin;

import React, { useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./ExpenseItem.css";

const ExpenseItem = (props) => {
  const styles = `
  .btn {
    padding: 10px;
    border-radius:4px;
  }

  .btn-delete{
    border: 1px solid rgba(250, 44, 90, 1);
    background-color:white;
    color: rgba(250, 44, 90, 1);
  }

  .btn-delete:hover{
    border: 1px solid rgba(250, 44, 90, 1);
    background-color:rgba(250, 44, 90, 1);
    color:white
  }
  .trash-icon{
    style={{ color: "rgba(250, 44, 90, 1)" }}
  }
  .btn-delete:hover .trash-icon {
    color: #ffffff;
  }
  .btn-edit{
    border: 1px solid rgba(92, 184, 95, 1);
    background-color:white;
    color: rgba(92, 184, 95, 1);
  }
  .btn-edit:hover{
    border: 1px solid rgba(92, 184, 95, 1);
    background-color:rgba(92, 184, 95, 1);
    color:white
  }

  .btn-detail{
    color:white;
    border: 1px solid  #0C7D81;
  }

  .btn-detail:hover{
    border: 1px solid  #0C7D81;
    background-color:white;
  }

  .title{
    font-size:24px;
  }

  .harga{
    font-size:18px;
  }

  .stock{
    font-size : 14px
  }
  `;
  const [isDeleted, setIsDeleted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const deleteHandler = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      await axios.delete(`http://localhost:8000/api/v1/products/${props.id}`, {
        headers,
      });
      setIsDeleted(true);
      window.location.reload();
      console.log("Data berhasil dihapus");
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  if (isDeleted) {
    return null; // Menghilangkan komponen setelah penghapusan berhasil dilakukan .
  }

  return (
    <>
      <style>{styles}</style>
      <img
        className="mb-3"
        src={props.image}
        style={{ width: "100%", height: "220px", objectFit: "contain" }}
      />
      <div className="">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2 className="title">{props.title}</h2>
          </div>
          <div className="col-md-6 text-end">
            <span className="harga">Rp. {props.amount}</span>
          </div>
        </div>
        <div className="stock mb-3">Sisa Stock : {props?.stock}</div>

        <div className="row mb-2">
          <div className="col-md-6">
            <button
              className="btn btn-delete"
              onClick={handleShow}
              style={{ width: "100%" }}
            >
              <FaTrash className="trash-icon" /> Delete
            </button>
          </div>
          <div className="col-md-6">
            <Link to={`/update/${props.id}`}>
              <button className="btn btn-edit" style={{ width: "100%" }}>
                <FaEdit className="edit-icon" /> Edit
              </button>
            </Link>
          </div>
        </div>

        <Link to={`/details/${props.id}`}>
          <div className="d-grid">
            <button className="btn btn-detail">
              <FaEye className="detail-icon" /> Detail Product
            </button>
          </div>
        </Link>
      </div>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src="assets/images/dlt.jpg"
            alt="background"
            className="img-fluid mt-2 mb-3 mx-auto d-block"
            style={{ width: "30%" }}
          />

          <p className="text-center">
            Are you sure you want to delete this product?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            className="btn-delete"
            variant="danger"
            onClick={deleteHandler}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ExpenseItem;

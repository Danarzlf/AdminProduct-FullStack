import React, { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css";
import { Button, Modal } from "react-bootstrap";

const NewExpense = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(),
    };
    props.onAddExpense(expenseData);
    setIsEditing(false);
  };

  const startEditingHandler = () => {
    setIsEditing(true);
  };

  const stopEditingHandler = () => {
    setIsEditing(false);
  };

  const logoutHandler = () => {
    // Menampilkan modal konfirmasi saat logout
    setShowConfirmationModal(true);
  };

  const confirmLogoutHandler = () => {
    // Hapus token atau informasi login lainnya dari localStorage
    localStorage.removeItem("token");

    // Lakukan tindakan lain yang diperlukan setelah logout, seperti mengarahkan pengguna ke halaman login
    window.location.href = "/";
  };

  const cancelLogoutHandler = () => {
    // Menutup modal konfirmasi tanpa melakukan logout
    setShowConfirmationModal(false);
  };

  return (
    <div className="new-expense">
      {!isEditing && (
        <>
          <button onClick={startEditingHandler}>Add New Product</button>
          <button onClick={logoutHandler}>Logout</button>
        </>
      )}
      {isEditing && (
        <ExpenseForm
          onSaveExpenseData={saveExpenseDataHandler}
          onCancel={stopEditingHandler}
        />
      )}

      <Modal show={showConfirmationModal} onHide={cancelLogoutHandler} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <img
              src="assets/images/logout.png"
              alt="background"
              className="img-fluid mt-2 mb-4 mx-auto d-block"
              style={{ width: "20%" }}
            />
          </div>
          <p>Are you sure you want to logout?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelLogoutHandler}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmLogoutHandler}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default NewExpense;

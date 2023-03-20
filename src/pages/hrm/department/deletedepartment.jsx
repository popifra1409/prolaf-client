import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteDepartmentConfirmationDialog = ({ onDelete, onClose }) => {
  const handleDelete = async () => {
    await onDelete();
    onClose();
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Entry</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this entry?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default DeleteDepartmentConfirmationDialog;
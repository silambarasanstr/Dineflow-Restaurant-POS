import { useState } from "react";
import ConfirmModal from "../../components/common/modal/ConfirmModal";

const DeleteMenuForm = ({ isOpen, onClose }) => {
  return (
    <ConfirmModal
      title="Delete Category"
      isOpen={isOpen}
      onClose={onClose}
      confirmText="Delete"
      cancelText="Cancel"
      variant="danger"
    />
  );
};

export default DeleteMenuForm;

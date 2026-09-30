import { useState } from "react";
import Modal from "../../components/common/modal/Modal";

const EditMenuForm = ({ isOpen, onClose }) => {
  return (
    <Modal title="Edit Menu Item" isOpen={isOpen} onClose={onClose}>
      <p>This is the content for the Edit Menu Item modal.</p>

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="button"
          className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-3 py-2 text-xs font-medium text-white transition hover:bg-gray-800"
        >
          Save Changes
        </button>
      </div>
    </Modal>
  );
};

export default EditMenuForm;

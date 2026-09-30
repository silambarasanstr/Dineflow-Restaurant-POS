import { useState } from "react";
import { Plus } from "lucide-react";
import Modal from "../../components/common/modal/Modal";

const AddMenuForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleOpen}
        className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-3 py-2 text-xs font-medium text-white transition hover:bg-gray-800"
      >
        <Plus size={16} />
        Add Menu Item
      </button>

      <Modal title="Add Menu Item" isOpen={isModalOpen} onClose={handleClose}>
        <p>This is the content for the Add Menu Item modal.</p>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={handleClose}
            className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-3 py-2 text-xs font-medium text-white transition hover:bg-gray-800"
          >
            Add Menu Item
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AddMenuForm;

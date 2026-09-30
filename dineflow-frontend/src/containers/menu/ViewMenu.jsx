import Modal from "../../components/common/modal/Modal";

const ViewMenu = ({ isOpen, onClose }) => {
  return (
    <Modal title="View Menu Item" isOpen={isOpen} onClose={onClose}>
      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default ViewMenu;

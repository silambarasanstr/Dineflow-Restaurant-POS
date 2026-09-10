import ConfirmModal from "../../components/common/modal/ConfirmModal";
import categoryService from "../../services/categoryService";

const DeleteCategoryModal = ({
  isOpen,
  onClose,
  onSuccess,
  loading = false,
  category,
}) => {
  const handleDeleteConfirm = async () => {
    if (!category?._id) return;

    try {
      await categoryService.deleteCategory(category._id);

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleDeleteConfirm}
      loading={loading}
      title="Delete Category"
      message={
        category
          ? `Are you sure you want to delete "${category.name}"? This action cannot be undone.`
          : "Are you sure you want to delete this category? This action cannot be undone."
      }
      confirmText="Delete"
      cancelText="Cancel"
      variant="danger"
    />
  );
};

export default DeleteCategoryModal;

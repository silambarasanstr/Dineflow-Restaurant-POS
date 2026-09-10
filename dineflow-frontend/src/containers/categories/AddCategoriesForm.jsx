import { useState } from "react";
import { Plus } from "lucide-react";

import Modal from "../../components/common/modal/Modal";
import categoryService from "../../services/categoryService";

const AddCategoriesForm = ({ onSuccess }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleOpen = () => {
    setError("");
    setIsModalOpen(true);
  };

  const handleClose = () => {
    if (loading) return;
    setIsModalOpen(false);
    setName("");
    setDescription("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Category name is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await categoryService.createCategory({
        name: name.trim(),
        description: description.trim(),
      });

      handleClose();
      // இரண்டும் almost same.
      // Refresh category list
      onSuccess?.();

      // if (onSuccess) {
      //   onSuccess();
      // }
    } catch (error) {
      console.error("Create category error:", error);

      setError(error.response?.data?.message || "Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Add Category Button */}
      <button
        type="button"
        onClick={handleOpen}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-3 py-2 text-xs font-medium text-white transition hover:bg-gray-800"
      >
        <Plus size={16} />
        Add Category
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={handleClose}
        title="Add Category"
        size="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Error */}
          {error && (
            <div className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">
              {error}
            </div>
          )}

          {/* Category Name */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Category Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter category name"
              disabled={loading}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-slate-500 disabled:bg-slate-50"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter category description"
              rows={3}
              disabled={loading}
              className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-slate-500 disabled:bg-slate-50"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Category"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddCategoriesForm;

import { useEffect, useState } from "react";
import Modal from "../../components/common/modal/Modal";
import categoryService from "../../services/categoryService";

const EditCategoriesForm = ({ category, isOpen, onClose, onSuccess }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (category) {
      setName(category.name || "");
      setDescription(category.description || "");
      setIsActive(category.isActive ?? true);
      setError("");
    }
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Category name is required");
      return;
    }

    if (!category?._id) {
      setError("Category ID is missing");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await categoryService.updateCategory(category._id, {
        name: name.trim(),
        description: description.trim(),
        isActive,
      });

      onClose();
      onSuccess();
    } catch (error) {
      console.error("Error updating category:", error);

      setError(
        error?.response?.data?.message ||
          "Failed to update category. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Category" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Error */}
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
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
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
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

        {/* Status */}
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Status
          </label>

          <select
            value={String(isActive)}
            onChange={(e) => setIsActive(e.target.value === "true")}
            disabled={loading}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-50"
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditCategoriesForm;

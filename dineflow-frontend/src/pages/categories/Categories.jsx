import { useCallback, useEffect, useState } from "react";
import { Pencil, Trash2, Search, RefreshCw, Tags } from "lucide-react";
import categoryService from "../../services/categoryService";
import AddCategoriesForm from "../../containers/categories/AddCategoriesForm";
import EditCategoriesForm from "../../containers/categories/EditCategoriesForm";
import DeleteCategoryModal from "../../containers/categories/DeleteCategoryModal";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const fetchCategories = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const res = await categoryService.getCategories();

      setCategories(res.data || []);
    } catch (error) {
      console.error("Category fetch error:", error);

      setError(error.response?.data?.message || "Failed to fetch categories");
    } finally {
      if (isRefresh) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCategories();
  }, [fetchCategories]);

  // const filteredCategories = categories.filter((category) =>
  //   category.name?.toLowerCase().includes(search.toLowerCase()),
  // );

  const filteredCategories = categories
    .map((category, index) => ({
      ...category,
      originalIndex: index,
    }))
    .filter((category) =>
      category.name?.toLowerCase().includes(search.toLowerCase()),
    );

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };
  const handleEditClose = () => {
    setIsEditModalOpen(false);
    setSelectedCategory(null);
  };

  const handleDelete = (category) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteClose = () => {
    setIsDeleteModalOpen(false);
    setSelectedCategory(null);
  };

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Categories</h1>

          <p className="text-xs text-gray-500">
            Manage your restaurant food categories.
          </p>
        </div>

        <AddCategoriesForm onSuccess={() => fetchCategories(true)} />
      </div>

      {/* Card */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        {/* Toolbar */}
        <div className="flex flex-col gap-3 border-b border-gray-100 p-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Search */}
          <div className="flex w-full items-center rounded-lg border border-gray-200 bg-gray-50 px-3 sm:max-w-xs">
            <Search size={16} className="shrink-0 text-gray-400" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search categories..."
              className="w-full bg-transparent px-2 py-2 text-xs text-gray-700 outline-none placeholder:text-gray-400"
            />
          </div>

          {/* Refresh */}
          <button
            type="button"
            onClick={() => fetchCategories(true)}
            disabled={refreshing}
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-3 text-xs font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex min-h-60 items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-gray-200 border-t-gray-900" />

              <p className="mt-3 text-xs text-gray-500">
                Loading categories...
              </p>
            </div>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="flex min-h-60 items-center justify-center px-4">
            <div className="text-center">
              <p className="text-sm font-medium text-red-600">{error}</p>

              <button
                type="button"
                onClick={fetchCategories}
                className="mt-3 rounded-lg bg-gray-900 px-3 py-2 text-xs font-medium text-white"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && filteredCategories.length === 0 && (
          <div className="flex min-h-60 flex-col items-center justify-center px-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
              <Tags size={20} className="text-gray-500" />
            </div>

            <p className="mt-3 text-sm font-medium text-gray-700">
              No categories found
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Try a different search term.
            </p>
          </div>
        )}

        {/* Table */}
        {!loading && !error && filteredCategories.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-150 text-left">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="px-4 py-3 text-[11px] font-semibold text-gray-500">
                    #
                  </th>

                  <th className="px-4 py-3 text-[11px] font-semibold text-gray-500">
                    Category
                  </th>

                  <th className="px-4 py-3 text-[11px] font-semibold text-gray-500">
                    Description
                  </th>

                  <th className="px-4 py-3 text-[11px] font-semibold text-gray-500">
                    Status
                  </th>

                  <th className="px-4 py-3 text-right text-[11px] font-semibold text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredCategories.map((category, index) => (
                  <tr
                    key={category._id}
                     className="border-b border-gray-50 last:border-0 transition-colors duration-150 hover:bg-gray-200/60"
                  >
                    <td className="px-4 py-3 text-xs text-gray-400">
                      {category.originalIndex + 1}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100">
                          <Tags size={15} className="text-gray-600" />
                        </div>

                        <span className="text-xs font-medium text-gray-800">
                          {category.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-xs text-gray-500">
                      {category.description || "-"}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-[10px] font-medium ${
                          category.isActive
                            ? "bg-green-50 text-green-600"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {category.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => handleEdit(category)}
                          className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                          title="Edit"
                        >
                          <Pencil size={15} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(category)}
                          className="rounded-lg p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                          title="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <EditCategoriesForm
        category={selectedCategory}
        isOpen={isEditModalOpen}
        onClose={handleEditClose}
        onSuccess={() => fetchCategories(true)}
      />

      <DeleteCategoryModal
        category={selectedCategory}
        isOpen={isDeleteModalOpen}
        onClose={handleDeleteClose}
        onSuccess={() => fetchCategories(true)}
      />
    </div>
  );
};

export default Categories;

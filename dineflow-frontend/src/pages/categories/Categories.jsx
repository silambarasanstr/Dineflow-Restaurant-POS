import { useCallback, useEffect, useState } from "react";
import { Pencil, Trash2, Search, RefreshCw, Tags } from "lucide-react";

import categoryService from "../../services/categoryService";
import AddCategoriesForm from "../../containers/categories/AddCategoriesForm";
import EditCategoriesForm from "../../containers/categories/EditCategoriesForm";
import DeleteCategoryModal from "../../containers/categories/DeleteCategoryModal";

import ErrorState from "../../components/common/ErrorState";
import EmptyState from "../../components/common/EmptyState";
import LoadingState from "../../components/common/LoadingState";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  const [page, setPage] = useState(1);
  const [limit] = useState(3);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCategories, setTotalCategories] = useState(0);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const fetchCategories = useCallback(
    async (isRefresh = false) => {
      try {
        if (isRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        setError("");

        const res = await categoryService.getCategories(page, limit, search);

        setCategories(res.data || []);
        setTotalPages(res.pagination?.totalPages || 1);
        setTotalCategories(res.pagination?.total || 0);
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
    },
    [page, limit, search],
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCategories();
  }, [fetchCategories]);

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

  const filteredcategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

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
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
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

        {/* Total Categories */}
        <div className="border-b border-gray-100 px-4 py-3">
          <div className="w-fit rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5">
            <p className="text-[11px] font-medium text-gray-500">
              Total Categories
            </p>

            <p className="mt-0.5 text-lg font-semibold text-gray-900">
              {totalCategories}
            </p>
          </div>
        </div>

        {/* Loading */}
        {loading && <LoadingState />}

        {/* Error */}
        {!loading && error && (
          <ErrorState message={error} onRetry={() => fetchCategories(true)} />
        )}

        {/* Empty */}
        {!loading && !error && categories.length === 0 && (
          <EmptyState
            title={
              search.trim() ? "No categories found" : "No categories available"
            }
            message={
              search.trim()
                ? "Try a different search term."
                : "Add a category to get started."
            }
          />
        )}

        {/* Table */}
        {!loading && !error && categories.length > 0 && (
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
                {categories.map((category, index) => (
                  <tr
                    key={category._id}
                    className="border-b border-gray-50 last:border-0 transition-colors duration-150 hover:bg-gray-200/60"
                  >
                    {/* Index */}
                    <td className="px-4 py-3 text-xs text-gray-400">
                      {(page - 1) * limit + index + 1}
                    </td>

                    {/* Category */}
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

                    {/* Description */}
                    <td className="px-4 py-3 text-xs text-gray-500">
                      {category.description || "-"}
                    </td>

                    {/* Status */}
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
                        {/* Edit */}
                        <button
                          type="button"
                          onClick={() => handleEdit(category)}
                          className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                          title="Edit"
                        >
                          <Pencil size={15} />
                        </button>

                        {/* Delete */}
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

        {/* Pagination */}
        {!loading && !error && categories.length > 0 && (
          <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3">
            {/* Previous */}
            <button
              type="button"
              onClick={() => setPage((prev) => prev - 1)}
              disabled={page === 1}
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>

            {/* Page */}
            <span className="text-xs text-gray-500">
              Page {page} of {totalPages}
            </span>

            {/* Next */}
            <button
              type="button"
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page === totalPages}
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}

        <div className="border-t border-gray-100 px-4 py-2.5">
          <p className="text-[11px] text-gray-400">
            Showing{" "}
            <span className="font-medium text-gray-600">
              {filteredcategories.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-gray-600">
              {categories.length}
            </span>{" "}
            categories
          </p>
        </div>
      </div>

      {/* Edit Modal */}
      <EditCategoriesForm
        category={selectedCategory}
        isOpen={isEditModalOpen}
        onClose={handleEditClose}
        onSuccess={() => fetchCategories(true)}
      />

      {/* Delete Modal */}
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

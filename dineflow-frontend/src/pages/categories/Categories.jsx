import { useCallback, useEffect, useState } from "react";
import { Plus, Search, RefreshCw, Tags } from "lucide-react";
import categoryService from "../../services/categoryService";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const res = await categoryService.getCategories();

      setCategories(res.data || []);
    } catch (error) {
      console.error("Category fetch error:", error);

      setError(error.response?.data?.message || "Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCategories();
  }, [fetchCategories]);

  const filteredCategories = categories.filter((category) =>
    category.name?.toLowerCase().includes(search.toLowerCase()),
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

        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-3 py-2 text-xs font-medium text-white transition hover:bg-gray-800"
        >
          <Plus size={16} />
          Add Category
        </button>
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
            onClick={fetchCategories}
            className="inline-flex items-center justify-center gap-2 self-start rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
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
            <table className="w-full min-w-[600px] text-left">
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
                    className="border-b border-gray-50 last:border-0 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 text-xs text-gray-400">
                      {index + 1}
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

                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        className="text-xs font-medium text-gray-500 hover:text-gray-900"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;

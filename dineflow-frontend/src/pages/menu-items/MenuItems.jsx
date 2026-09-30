import { useCallback, useEffect, useState } from "react";
import {
  Plus,
  Search,
  RefreshCw,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";

import menuItemService from "../../services/menuItemService";
import AddMenuForm from "../../containers/menu/AddMenuForm";
import EditMenuForm from "../../containers/menu/EditMenuForm";
import DeleteMenuForm from "../../containers/menu/DeleteMenuForm";
import ViewMenu from "../../containers/menu/ViewMenu";

const MenuItems = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Fetch menu items
  const fetchMenuItems = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const res = await menuItemService.getMenuItems();

      setMenuItems(res.data || []);
    } catch (error) {
      console.error("Menu items fetch error:", error);

      setError(error.response?.data?.message || "Failed to fetch menu items");

      setMenuItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchMenuItems();
  }, [fetchMenuItems]);

  // Search filter
  const filteredItems = menuItems.filter((item) =>
    item.name?.toLowerCase().includes(search.toLowerCase()),
  );

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleEditClose = () => {
    setIsEditModalOpen(false);
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteClose = () => {
    setIsDeleteModalOpen(false);
  };

  const handleView = () => {
    setIsViewModalOpen(true);
  };

  const handleViewClose = () => {
    setIsViewModalOpen(false);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Menu Items</h1>

          <p className="mt-0.5 text-xs text-gray-500">
            Manage your restaurant menu items
          </p>
        </div>

        <AddMenuForm />
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="flex w-full items-center rounded-lg border border-gray-200 bg-gray-50 px-3 sm:max-w-xs">
          <Search size={16} className="shrink-0 text-gray-400" />

          <input
            type="text"
            placeholder="Search menu items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent px-2 py-2 text-xs text-gray-700 outline-none placeholder:text-gray-400"
          />
        </div>

        {/* Refresh */}
        <button
          type="button"
          onClick={fetchMenuItems}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-3 py-2.5">
          <p className="text-xs text-red-600">{error}</p>

          <button
            type="button"
            onClick={fetchMenuItems}
            className="text-xs font-medium text-red-700 hover:underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-212.5 text-left">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  #
                </th>

                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  Menu Item
                </th>

                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  Category
                </th>

                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  Price
                </th>

                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  Availability
                </th>

                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  Status
                </th>

                <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-4 py-10 text-center text-xs text-gray-400"
                  >
                    Loading menu items...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-4 py-10 text-center text-xs text-red-400"
                  >
                    Failed to load menu items
                  </td>
                </tr>
              ) : filteredItems.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-4 py-10 text-center text-xs text-gray-400"
                  >
                    No menu items found
                  </td>
                </tr>
              ) : (
                filteredItems.map((item, index) => (
                  <tr key={item._id} className="transition hover:bg-gray-50">
                    {/* # */}
                    <td className="px-4 py-3 text-xs text-gray-500">
                      {index + 1}
                    </td>

                    {/* Menu Item */}
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-xs font-semibold text-gray-800">
                          {item.name || "-"}
                        </p>

                        {item.description && (
                          <p className="mt-0.5 max-w-xs truncate text-[11px] text-gray-400">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-4 py-3 text-xs text-gray-600">
                      {item.category?.name || "-"}
                    </td>

                    {/* Price */}
                    <td className="px-4 py-3 text-xs font-semibold text-gray-800">
                      ₹{item.price ?? 0}
                    </td>

                    {/* Availability */}
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-[10px] font-medium ${
                          item.isAvailable
                            ? "bg-green-50 text-green-600"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {item.isAvailable ? "Available" : "Unavailable"}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-[10px] font-medium ${
                          item.isActive
                            ? "bg-blue-50 text-blue-600"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {item.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            handleEdit();
                          }}
                          className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                          title="Edit"
                        >
                          <Pencil size={15} />
                        </button>

                        <button
                          type="button"
                          onClick={handleDelete}
                          className="rounded-lg p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                          title="Delete"
                        >
                          <Trash2 size={15} />
                        </button>

                        <button
                          type="button"
                          onClick={handleView}
                          className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                          title="More"
                        >
                          <MoreVertical size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        {!loading && (
          <div className="border-t border-gray-100 px-4 py-2.5">
            <p className="text-[11px] text-gray-400">
              Showing{" "}
              <span className="font-medium text-gray-600">
                {filteredItems.length}
              </span>{" "}
              of{" "}
              <span className="font-medium text-gray-600">
                {menuItems.length}
              </span>{" "}
              menu items
            </p>
          </div>
        )}
      </div>

      <EditMenuForm isOpen={isEditModalOpen} onClose={handleEditClose} />
      <DeleteMenuForm isOpen={isDeleteModalOpen} onClose={handleDeleteClose} />
      <ViewMenu isOpen={isViewModalOpen} onClose={handleViewClose} />
    </div>
  );
};

export default MenuItems;

import { useCallback, useEffect, useState } from "react";
import {
  Plus,
  Search,
  RefreshCw,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";

import tableService from "../../services/tablesService";

const statusClasses = {
  Available: "bg-green-50 text-green-600",
  Occupied: "bg-red-50 text-red-600",
  Reserved: "bg-yellow-50 text-yellow-600",
  Maintenance: "bg-gray-100 text-gray-500",
};

const Tables = () => {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  // Fetch Tables
  const fetchTables = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const res = await tableService.getTables();

      setTables(res.data || []);
    } catch (error) {
      console.error("Tables fetch error:", error);

      setError(error.response?.data?.message || "Failed to fetch tables");

      setTables([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial API call
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTables();
  }, [fetchTables]);

  // Search filter
  const filteredTables = tables.filter((table) =>
    table.tableNumber?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Tables</h1>

          <p className="mt-0.5 text-xs text-gray-500">
            Manage your restaurant tables
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-3.5 py-2 text-xs font-medium text-white transition hover:bg-gray-800"
        >
          <Plus size={16} />
          Add Table
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="flex w-full items-center rounded-lg border border-gray-200 bg-gray-50 px-3 sm:max-w-xs">
          <Search size={16} className="shrink-0 text-gray-400" />

          <input
            type="text"
            placeholder="Search tables..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent px-2 py-2 text-xs text-gray-700 outline-none placeholder:text-gray-400"
          />
        </div>

        {/* Refresh */}
        <button
          type="button"
          onClick={fetchTables}
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
            onClick={fetchTables}
            className="text-xs font-medium text-red-700 hover:underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-175 text-left">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  #
                </th>

                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  Table Number
                </th>

                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  Capacity
                </th>

                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  Location
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
                    colSpan="6"
                    className="px-4 py-10 text-center text-xs text-gray-400"
                  >
                    Loading tables...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-4 py-10 text-center text-xs text-gray-400"
                  >
                    Unable to load tables
                  </td>
                </tr>
              ) : filteredTables.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-4 py-10 text-center text-xs text-gray-400"
                  >
                    No tables found
                  </td>
                </tr>
              ) : (
                filteredTables.map((table, index) => (
                  <tr
                    key={table._id}
                    className="transition hover:bg-gray-50"
                  >
                    {/* # */}
                    <td className="px-4 py-3 text-xs text-gray-500">
                      {index + 1}
                    </td>

                    {/* Table Number */}
                    <td className="px-4 py-3">
                      <p className="text-xs font-semibold text-gray-800">
                        {table.tableNumber}
                      </p>
                    </td>

                    {/* Capacity */}
                    <td className="px-4 py-3 text-xs text-gray-600">
                      {table.capacity} Seats
                    </td>

                    {/* Location */}
                    <td className="px-4 py-3 text-xs text-gray-600">
                      {table.location || "-"}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-[10px] font-medium ${
                          statusClasses[table.status] ||
                          "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {table.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        {/* Edit */}
                        <button
                          type="button"
                          className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                          title="Edit"
                        >
                          <Pencil size={15} />
                        </button>

                        {/* Delete */}
                        <button
                          type="button"
                          className="rounded-lg p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                          title="Delete"
                        >
                          <Trash2 size={15} />
                        </button>

                        {/* More */}
                        <button
                          type="button"
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
                {filteredTables.length}
              </span>{" "}
              of{" "}
              <span className="font-medium text-gray-600">
                {tables.length}
              </span>{" "}
              tables
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tables;
import { useCallback, useEffect, useState } from "react";
import { Search, RefreshCw, MoreVertical, Pencil, Trash2 } from "lucide-react";

import billService from "../../services/billService";

const Bills = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const fetchBills = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const res = await billService.getBills();

      setBills(res.data || []);
    } catch (error) {
      console.error("Bills fetch error:", error);

      setError(error.response?.data?.message || "Failed to fetch bills");

      setBills([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchBills();
  }, [fetchBills]);

  const filteredBills = bills.filter((bill) => {
    const searchValue = search.toLowerCase();

    return (
      bill.billNumber?.toLowerCase().includes(searchValue) ||
      bill.order?.orderNumber?.toLowerCase().includes(searchValue) ||
      bill.order?.customer?.name?.toLowerCase().includes(searchValue) ||
      bill.billStatus?.toLowerCase().includes(searchValue)
    );
  });

  const billStatusClasses = {
    Generated: "bg-green-50 text-green-600",
    Pending: "bg-yellow-50 text-yellow-600",
    Cancelled: "bg-red-50 text-red-600",
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Bills</h1>

          <p className="mt-0.5 text-xs text-gray-500">
            Manage restaurant bills and billing records
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="relative w-full sm:max-w-sm">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search bills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-xs text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-gray-400"
          />
        </div>

        {/* Refresh */}
        <button
          type="button"
          onClick={fetchBills}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-xs text-red-600">{error}</p>

          <button
            type="button"
            onClick={fetchBills}
            className="text-xs font-medium text-red-600 hover:underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] text-left">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  #
                </th>

                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  Bill
                </th>

                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  Order
                </th>

                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  Customer
                </th>

                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  Subtotal
                </th>

                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  Tax
                </th>

                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  Discount
                </th>

                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  Total
                </th>

                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  Status
                </th>

                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  Generated
                </th>

                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td
                    colSpan="11"
                    className="px-4 py-10 text-center text-xs text-gray-500"
                  >
                    Loading bills...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td
                    colSpan="11"
                    className="px-4 py-10 text-center text-xs text-red-400"
                  >
                    Failed to load bills
                  </td>
                </tr>
              ) : filteredBills.length === 0 ? (
                <tr>
                  <td
                    colSpan="11"
                    className="px-4 py-10 text-center text-xs text-gray-500"
                  >
                    No bills found
                  </td>
                </tr>
              ) : (
                filteredBills.map((bill, index) => (
                  <tr key={bill._id} className="transition hover:bg-gray-50">
                    {/* # */}
                    <td className="px-4 py-3 text-xs text-gray-500">
                      {index + 1}
                    </td>

                    {/* Bill */}
                    <td className="px-4 py-3">
                      <p className="text-xs font-medium text-gray-900">
                        {bill.billNumber || "-"}
                      </p>

                      <p className="mt-0.5 text-[11px] text-gray-400">
                        {bill.order?.orderType || "-"}
                      </p>
                    </td>

                    {/* Order */}
                    <td className="px-4 py-3">
                      <p className="text-xs font-medium text-gray-700">
                        {bill.order?.orderNumber || "-"}
                      </p>

                      <p className="mt-0.5 text-[11px] text-gray-400">
                        Table: {bill.order?.table?.tableNumber || "-"}
                      </p>
                    </td>

                    {/* Customer */}
                    <td className="px-4 py-3">
                      <p className="text-xs font-medium text-gray-700">
                        {bill.order?.customer?.name || "Walk-in Customer"}
                      </p>

                      <p className="mt-0.5 text-[11px] text-gray-400">
                        {bill.order?.customer?.phone || "-"}
                      </p>
                    </td>

                    {/* Subtotal */}
                    <td className="px-4 py-3 text-xs text-gray-700">
                      ₹{bill.subtotal ?? 0}
                    </td>

                    {/* Tax */}
                    <td className="px-4 py-3 text-xs text-gray-700">
                      ₹{bill.tax ?? 0}
                    </td>

                    {/* Discount */}
                    <td className="px-4 py-3 text-xs text-gray-700">
                      ₹{bill.discount ?? 0}
                    </td>

                    {/* Total */}
                    <td className="px-4 py-3">
                      <span className="text-xs font-semibold text-gray-900">
                        ₹{bill.totalAmount ?? 0}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-[10px] font-medium ${
                          billStatusClasses[bill.billStatus] ||
                          "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {bill.billStatus || "-"}
                      </span>
                    </td>

                    {/* Generated */}
                    <td className="px-4 py-3">
                      <p className="text-xs text-gray-700">
                        {bill.generatedAt
                          ? new Date(bill.generatedAt).toLocaleDateString()
                          : "-"}
                      </p>

                      <p className="mt-0.5 text-[11px] text-gray-400">
                        {bill.generatedAt
                          ? new Date(bill.generatedAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "-"}
                      </p>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                          title="Edit"
                        >
                          <Pencil size={15} />
                        </button>

                        <button
                          type="button"
                          className="rounded-lg p-1.5 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
                          title="Delete"
                        >
                          <Trash2 size={15} />
                        </button>

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
          <div className="border-t border-gray-100 px-4 py-3">
            <p className="text-xs text-gray-500">
              Showing{" "}
              <span className="font-medium text-gray-700">
                {filteredBills.length}
              </span>{" "}
              of{" "}
              <span className="font-medium text-gray-700">{bills.length}</span>{" "}
              bills
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bills;

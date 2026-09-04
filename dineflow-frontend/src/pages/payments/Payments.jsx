
import { useCallback, useEffect, useState } from "react";
import {
  Plus,
  Search,
  RefreshCw,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";

import paymentService from "../../services/paymentService";

const paymentStatusClasses = {
  Paid: "bg-green-50 text-green-600",
  Pending: "bg-yellow-50 text-yellow-600",
  Failed: "bg-red-50 text-red-600",
  Refunded: "bg-gray-100 text-gray-500",
};

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  // Fetch payments
  const fetchPayments = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const res = await paymentService.getPayments();

      setPayments(res.data || []);
    } catch (error) {
      console.error("Payments fetch error:", error);

      setError(
        error.response?.data?.message || "Failed to fetch payments"
      );

      setPayments([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPayments();
  }, [fetchPayments]);

  // Search filter
  const filteredPayments = payments.filter((payment) => {
    const searchValue = search.toLowerCase();

    return (
      payment.order?.orderNumber?.toLowerCase().includes(searchValue) ||
      payment.order?.customer?.name?.toLowerCase().includes(searchValue) ||
      payment.transactionId?.toLowerCase().includes(searchValue) ||
      payment.paymentMethod?.toLowerCase().includes(searchValue)
    );
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">
            Payments
          </h1>

          <p className="mt-0.5 text-xs text-gray-500">
            Manage restaurant payment transactions
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-3.5 py-2 text-xs font-medium text-white transition hover:bg-gray-800"
        >
          <Plus size={16} />
          Add Payment
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search */}
        <div className="flex w-full items-center rounded-lg border border-gray-200 bg-gray-50 px-3 sm:max-w-xs">
          <Search
            size={16}
            className="shrink-0 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search payments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent px-2 py-2 text-xs text-gray-700 outline-none placeholder:text-gray-400"
          />
        </div>

        {/* Refresh */}
        <button
          type="button"
          onClick={fetchPayments}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw
            size={15}
            className={loading ? "animate-spin" : ""}
          />
          Refresh
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-3 py-2.5">
          <p className="text-xs text-red-600">{error}</p>

          <button
            type="button"
            onClick={fetchPayments}
            className="text-xs font-medium text-red-700 hover:underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-275 text-left">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  #
                </th>

                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  Order
                </th>

                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  Customer
                </th>

                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  Amount
                </th>

                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  Method
                </th>

                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  Status
                </th>

                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  Transaction ID
                </th>

                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wide text-gray-500">
                  Payment Date
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
                    colSpan="9"
                    className="px-4 py-10 text-center text-xs text-gray-400"
                  >
                    Loading payments...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td
                    colSpan="9"
                    className="px-4 py-10 text-center text-xs text-red-400"
                  >
                    Failed to load payments
                  </td>
                </tr>
              ) : filteredPayments.length === 0 ? (
                <tr>
                  <td
                    colSpan="9"
                    className="px-4 py-10 text-center text-xs text-gray-400"
                  >
                    No payments found
                  </td>
                </tr>
              ) : (
                filteredPayments.map((payment, index) => (
                  <tr
                    key={payment._id}
                    className="transition hover:bg-gray-50"
                  >
                    {/* # */}
                    <td className="px-4 py-3 text-xs text-gray-500">
                      {index + 1}
                    </td>

                    {/* Order */}
                    <td className="px-4 py-3">
                      <p className="text-xs font-semibold text-gray-800">
                        {payment.order?.orderNumber || "-"}
                      </p>

                      {payment.order?.table?.tableNumber && (
                        <p className="mt-0.5 text-[11px] text-gray-400">
                          {payment.order.table.tableNumber}
                        </p>
                      )}
                    </td>

                    {/* Customer */}
                    <td className="px-4 py-3">
                      <p className="text-xs font-medium text-gray-700">
                        {payment.order?.customer?.name ||
                          "Walk-in Customer"}
                      </p>

                      {payment.order?.customer?.phone && (
                        <p className="mt-0.5 text-[11px] text-gray-400">
                          {payment.order.customer.phone}
                        </p>
                      )}
                    </td>

                    {/* Amount */}
                    <td className="px-4 py-3 text-xs font-semibold text-gray-800">
                      ₹{payment.amount}
                    </td>

                    {/* Method */}
                    <td className="px-4 py-3 text-xs text-gray-600">
                      {payment.paymentMethod || "-"}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-[10px] font-medium ${
                          paymentStatusClasses[
                            payment.paymentStatus
                          ] || "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {payment.paymentStatus || "-"}
                      </span>
                    </td>

                    {/* Transaction ID */}
                    <td className="px-4 py-3">
                      <span className="text-xs text-gray-600">
                        {payment.transactionId || "-"}
                      </span>
                    </td>

                    {/* Payment Date */}
                    <td className="px-4 py-3">
                      <p className="text-xs text-gray-600">
                        {payment.paymentDate
                          ? new Date(
                              payment.paymentDate
                            ).toLocaleDateString()
                          : "-"}
                      </p>

                      {payment.paymentDate && (
                        <p className="mt-0.5 text-[11px] text-gray-400">
                          {new Date(
                            payment.paymentDate
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
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
          <div className="border-t border-gray-100 px-4 py-2.5">
            <p className="text-[11px] text-gray-400">
              Showing{" "}
              <span className="font-medium text-gray-600">
                {filteredPayments.length}
              </span>{" "}
              of{" "}
              <span className="font-medium text-gray-600">
                {payments.length}
              </span>{" "}
              payments
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payments;


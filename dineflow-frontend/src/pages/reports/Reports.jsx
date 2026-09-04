import { useCallback, useEffect, useState } from "react";
import {
  BarChart3,
  CreditCard,
  ShoppingCart,
  IndianRupee,
  TrendingUp,
  Banknote,
  Smartphone,
  WalletCards,
  RefreshCw,
} from "lucide-react";

import {
  getSalesReport,
  getPaymentReport,
} from "../../services/reportService";

const Reports = () => {
  const [from, setFrom] = useState("2026-09-01");
  const [to, setTo] = useState("2026-09-02");

  const [salesReport, setSalesReport] = useState(null);
  const [paymentReport, setPaymentReport] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch Reports
  const fetchReports = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const [salesResponse, paymentResponse] = await Promise.all([
        getSalesReport(from, to),
        getPaymentReport(from, to),
      ]);

      setSalesReport(salesResponse.data);
      setPaymentReport(paymentResponse.data);
    } catch (error) {
      console.error("Reports fetch error:", error);

      setError(error.response?.data?.message || "Failed to fetch reports");
    } finally {
      setLoading(false);
    }
  }, [from, to]);

  // Initial report fetch
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchReports();
  }, [fetchReports]);

  const formatCurrency = (amount = 0) => {
    return `₹${Number(amount).toLocaleString("en-IN")}`;
  };

  const summary = salesReport?.summary;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>

          <p className="mt-1 text-sm text-gray-500">
            Analyze sales and payment performance
          </p>
        </div>

        <button
          type="button"
          onClick={fetchReports}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Date Filter */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-end">
          <div className="flex-1">
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              From Date
            </label>

            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-gray-900"
            />
          </div>

          <div className="flex-1">
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              To Date
            </label>

            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-gray-900"
            />
          </div>

          <button
            type="button"
            onClick={fetchReports}
            disabled={loading}
            className="rounded-lg bg-gray-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Generate Report
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Sales Summary */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <BarChart3 size={20} />
          <h2 className="text-lg font-semibold text-gray-900">
            Sales Summary
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            title="Total Sales"
            value={formatCurrency(summary?.totalSales)}
            icon={IndianRupee}
          />

          <SummaryCard
            title="Total Orders"
            value={summary?.totalOrders || 0}
            icon={ShoppingCart}
          />

          <SummaryCard
            title="Average Order Value"
            value={formatCurrency(summary?.averageOrderValue)}
            icon={TrendingUp}
          />

          <SummaryCard
            title="Total Tax"
            value={formatCurrency(summary?.totalTax)}
            icon={CreditCard}
          />
        </div>
      </div>

      {/* Payment Methods */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <PaymentMethodCard
          title="Cash"
          amount={salesReport?.paymentMethods?.cash}
          icon={Banknote}
        />

        <PaymentMethodCard
          title="Card"
          amount={salesReport?.paymentMethods?.card}
          icon={CreditCard}
        />

        <PaymentMethodCard
          title="UPI"
          amount={salesReport?.paymentMethods?.upi}
          icon={Smartphone}
        />
      </div>

      {/* Orders */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-gray-900">Sales Orders</h2>

              <p className="mt-1 text-sm text-gray-500">
                Orders from {salesReport?.period?.from} to{" "}
                {salesReport?.period?.to}
              </p>
            </div>

            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
              {salesReport?.orders?.length || 0} Orders
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-5 py-3">Order</th>
                <th className="px-5 py-3">Customer</th>
                <th className="px-5 py-3">Table</th>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3">Subtotal</th>
                <th className="px-5 py-3">Total</th>
                <th className="px-5 py-3">Payment</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {salesReport?.orders?.length > 0 ? (
                salesReport.orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-5 py-4 font-medium text-gray-900">
                      {order.orderNumber}
                    </td>

                    <td className="px-5 py-4">
                      {order.customer?.name || "Walk-in Customer"}
                    </td>

                    <td className="px-5 py-4">
                      {order.table?.tableNumber || "-"}
                    </td>

                    <td className="px-5 py-4">{order.orderType}</td>

                    <td className="px-5 py-4">
                      {formatCurrency(order.subtotal)}
                    </td>

                    <td className="px-5 py-4 font-medium">
                      {formatCurrency(order.totalAmount)}
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={order.paymentStatus} />
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={order.orderStatus} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="px-5 py-10 text-center text-gray-500"
                  >
                    No orders found for this period
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Report */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gray-100 p-2">
              <WalletCards size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-gray-900">Payment Report</h2>

              <p className="text-sm text-gray-500">
                {paymentReport?.summary?.totalPayments || 0} payments{" "}
                {" • "}
                {formatCurrency(paymentReport?.summary?.totalAmount)}
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-5 py-3">Order</th>
                <th className="px-5 py-3">Amount</th>
                <th className="px-5 py-3">Method</th>
                <th className="px-5 py-3">Transaction ID</th>
                <th className="px-5 py-3">Payment Date</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {paymentReport?.payments?.length > 0 ? (
                paymentReport.payments.map((payment) => (
                  <tr key={payment._id} className="hover:bg-gray-50">
                    <td className="px-5 py-4 font-medium">
                      {payment.order?.orderNumber || "-"}
                    </td>

                    <td className="px-5 py-4 font-semibold">
                      {formatCurrency(payment.amount)}
                    </td>

                    <td className="px-5 py-4">{payment.paymentMethod}</td>

                    <td className="px-5 py-4">
                      {payment.transactionId || "-"}
                    </td>

                    <td className="px-5 py-4">
                      {payment.paymentDate
                        ? new Date(payment.paymentDate).toLocaleString("en-IN")
                        : "-"}
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={payment.paymentStatus} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-5 py-10 text-center text-gray-500"
                  >
                    No payments found for this period
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const SummaryCard = ({ title, value, icon: Icon }) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>

          <p className="mt-2 text-2xl font-semibold text-gray-900">{value}</p>
        </div>

        <div className="rounded-lg bg-gray-100 p-3">
          <Icon size={21} />
        </div>
      </div>
    </div>
  );
};

const PaymentMethodCard = ({ title, amount, icon: Icon }) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-gray-100 p-3">
          <Icon size={20} />
        </div>

        <div>
          <p className="text-sm text-gray-500">{title}</p>

          <p className="mt-1 text-xl font-semibold text-gray-900">
            ₹{Number(amount || 0).toLocaleString("en-IN")}
          </p>
        </div>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const normalizedStatus = status?.toLowerCase();

  let classes = "bg-gray-100 text-gray-700";

  if (normalizedStatus === "paid" || normalizedStatus === "completed") {
    classes = "bg-green-100 text-green-700";
  }

  if (normalizedStatus === "pending" || normalizedStatus === "processing") {
    classes = "bg-yellow-100 text-yellow-700";
  }

  if (normalizedStatus === "cancelled" || normalizedStatus === "failed") {
    classes = "bg-red-100 text-red-700";
  }

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${classes}`}
    >
      {status || "-"}
    </span>
  );
};

export default Reports;
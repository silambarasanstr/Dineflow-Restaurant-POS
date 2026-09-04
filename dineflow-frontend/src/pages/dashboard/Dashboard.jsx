import { useCallback, useEffect, useState } from "react";
import {
  IndianRupee,
  ShoppingCart,
  CheckCircle2,
  Clock3,
  XCircle,
  Utensils,
  Users,
  CreditCard,
  Banknote,
  Smartphone,
  ArrowUpRight,
} from "lucide-react";

const API_URL = "http://localhost:9000/api";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch dashboard
  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/dashboard`);

      if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
      }

      const result = await response.json();

      setDashboard(result.data);
    } catch (error) {
      console.error("Dashboard Error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchDashboard();
  }, [fetchDashboard]);

  // Loading
  if (loading) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-gray-200 border-t-gray-900" />

          <p className="mt-3 text-xs text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-center">
          <XCircle size={24} className="mx-auto text-red-500" />

          <p className="mt-2 text-sm font-medium text-red-700">
            Failed to load dashboard
          </p>

          <p className="mt-1 text-xs text-red-500">{error}</p>

          <button
            type="button"
            onClick={fetchDashboard}
            className="mt-3 rounded-lg bg-gray-900 px-3 py-2 text-xs font-medium text-white hover:bg-gray-800"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const { sales, orders, tables, payments, customers, recentOrders } =
    dashboard || {};

  const stats = [
    {
      title: "Today's Sales",
      value: `₹${sales?.today?.toLocaleString("en-IN") || 0}`,
      subtitle: "Total revenue today",
      icon: IndianRupee,
    },
    {
      title: "Total Orders",
      value: orders?.total || 0,
      subtitle: "Orders today",
      icon: ShoppingCart,
    },
    {
      title: "Completed Orders",
      value: orders?.completed || 0,
      subtitle: "Successfully completed",
      icon: CheckCircle2,
    },
    {
      title: "Pending Orders",
      value: orders?.pending || 0,
      subtitle: "Waiting for completion",
      icon: Clock3,
    },
  ];

  const tableStats = [
    {
      label: "Available",
      value: tables?.available || 0,
      icon: CheckCircle2,
    },
    {
      label: "Occupied",
      value: tables?.occupied || 0,
      icon: Utensils,
    },
    {
      label: "Reserved",
      value: tables?.reserved || 0,
      icon: Clock3,
    },
  ];

  const paymentStats = [
    {
      label: "Cash",
      value: `₹${payments?.cash?.toLocaleString("en-IN") || 0}`,
      icon: Banknote,
    },
    {
      label: "Card",
      value: `₹${payments?.card?.toLocaleString("en-IN") || 0}`,
      icon: CreditCard,
    },
    {
      label: "UPI",
      value: `₹${payments?.upi?.toLocaleString("en-IN") || 0}`,
      icon: Smartphone,
    },
  ];

  const statusStyles = {
    Completed: "bg-green-50 text-green-600",
    Preparing: "bg-blue-50 text-blue-600",
    Ready: "bg-purple-50 text-purple-600",
    Pending: "bg-yellow-50 text-yellow-600",
    Cancelled: "bg-red-50 text-red-600",
  };

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>

          <p className="text-xs text-gray-500">
            Overview of your restaurant performance today.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchDashboard}
          disabled={loading}
          className="self-start rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 sm:self-auto"
        >
          Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500">
                    {item.title}
                  </p>

                  <h2 className="mt-1 text-xl font-semibold text-gray-900">
                    {item.value}
                  </h2>

                  <p className="mt-1 text-[11px] text-gray-400">
                    {item.subtitle}
                  </p>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
                  <Icon size={18} className="text-gray-700" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Orders + Tables */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        {/* Recent Orders */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm xl:col-span-2">
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Recent Orders
              </h3>

              <p className="text-[11px] text-gray-400">
                Latest restaurant orders
              </p>
            </div>

            <button
              type="button"
              className="flex items-center gap-1 text-xs font-medium text-gray-600 hover:text-gray-900"
            >
              View All
              <ArrowUpRight size={14} />
            </button>
          </div>

          <div className="overflow-x-auto">
            {recentOrders?.length > 0 ? (
              <table className="w-full min-w-150 text-left">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="px-4 py-2.5 text-[11px] font-semibold text-gray-500">
                      Order
                    </th>

                    <th className="px-4 py-2.5 text-[11px] font-semibold text-gray-500">
                      Customer
                    </th>

                    <th className="px-4 py-2.5 text-[11px] font-semibold text-gray-500">
                      Table
                    </th>

                    <th className="px-4 py-2.5 text-[11px] font-semibold text-gray-500">
                      Amount
                    </th>

                    <th className="px-4 py-2.5 text-[11px] font-semibold text-gray-500">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {recentOrders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-b border-gray-50 last:border-0 hover:bg-gray-50"
                    >
                      <td className="px-4 py-3 text-xs font-medium text-gray-800">
                        {order.orderNumber || "-"}
                      </td>

                      <td className="px-4 py-3 text-xs text-gray-600">
                        {order.customer?.name || "Walk-in Customer"}
                      </td>

                      <td className="px-4 py-3 text-xs text-gray-600">
                        {order.table?.tableNumber || "-"}
                      </td>

                      <td className="px-4 py-3 text-xs font-medium text-gray-800">
                        ₹{order.totalAmount?.toLocaleString("en-IN") || 0}
                      </td>

                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-[10px] font-medium ${
                            statusStyles[order.orderStatus] ||
                            "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {order.orderStatus || "-"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="px-4 py-10 text-center">
                <ShoppingCart size={25} className="mx-auto text-gray-300" />

                <p className="mt-2 text-xs text-gray-400">No recent orders</p>
              </div>
            )}
          </div>
        </div>

        {/* Table Overview */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-4 py-3">
            <h3 className="text-sm font-semibold text-gray-900">
              Table Overview
            </h3>

            <p className="text-[11px] text-gray-400">
              Current table availability
            </p>
          </div>

          <div className="space-y-3 p-4">
            {tableStats.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
                      <Icon size={16} className="text-gray-600" />
                    </div>

                    <span className="text-xs font-medium text-gray-600">
                      {item.label}
                    </span>
                  </div>

                  <span className="text-sm font-semibold text-gray-900">
                    {item.value}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="border-t border-gray-100 px-4 py-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Total Tables</span>

              <span className="text-sm font-semibold text-gray-900">
                {tables?.total || 0}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment + Order Summary */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Payment Summary */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-4 py-3">
            <h3 className="text-sm font-semibold text-gray-900">
              Payment Summary
            </h3>

            <p className="text-[11px] text-gray-400">Today's payment methods</p>
          </div>

          <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-3">
            {paymentStats.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="rounded-lg border border-gray-100 p-3"
                >
                  <div className="flex items-center gap-2">
                    <Icon size={16} className="text-gray-500" />

                    <span className="text-xs text-gray-500">{item.label}</span>
                  </div>

                  <p className="mt-2 text-sm font-semibold text-gray-900">
                    {item.value}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Summary */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-4 py-3">
            <h3 className="text-sm font-semibold text-gray-900">
              Order Summary
            </h3>

            <p className="text-[11px] text-gray-400">Today's order status</p>
          </div>

          <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-4">
            <SummaryCard
              icon={ShoppingCart}
              value={orders?.total || 0}
              label="Total"
            />

            <SummaryCard
              icon={CheckCircle2}
              value={orders?.completed || 0}
              label="Completed"
            />

            <SummaryCard
              icon={Clock3}
              value={orders?.pending || 0}
              label="Pending"
            />

            <SummaryCard
              icon={XCircle}
              value={orders?.cancelled || 0}
              label="Cancelled"
            />
          </div>
        </div>
      </div>

      {/* Customers */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
            <Users size={19} className="text-gray-700" />
          </div>

          <div>
            <p className="text-xs text-gray-500">Active Customers</p>

            <p className="text-lg font-semibold text-gray-900">
              {customers?.total || 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const SummaryCard = ({ icon: Icon, value, label }) => {
  return (
    <div className="rounded-lg bg-gray-50 p-3">
      <Icon size={16} className="text-gray-500" />

      <p className="mt-2 text-lg font-semibold text-gray-900">{value}</p>

      <p className="text-[10px] text-gray-400">{label}</p>
    </div>
  );
};

export default Dashboard;

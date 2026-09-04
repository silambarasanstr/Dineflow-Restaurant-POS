
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

const Dashboard = () => {
  // Temporary dashboard data
  // Later replace this with API data from /api/dashboard
  const stats = [
    {
      title: "Today's Sales",
      value: "₹12,450",
      subtitle: "Total revenue today",
      icon: IndianRupee,
    },
    {
      title: "Total Orders",
      value: "48",
      subtitle: "Orders today",
      icon: ShoppingCart,
    },
    {
      title: "Completed Orders",
      value: "38",
      subtitle: "Successfully completed",
      icon: CheckCircle2,
    },
    {
      title: "Pending Orders",
      value: "6",
      subtitle: "Waiting for completion",
      icon: Clock3,
    },
  ];

  const tableStats = [
    {
      label: "Available",
      value: 8,
      icon: CheckCircle2,
    },
    {
      label: "Occupied",
      value: 5,
      icon: Utensils,
    },
    {
      label: "Reserved",
      value: 2,
      icon: Clock3,
    },
  ];

  const paymentStats = [
    {
      label: "Cash",
      value: "₹4,250",
      icon: Banknote,
    },
    {
      label: "Card",
      value: "₹3,800",
      icon: CreditCard,
    },
    {
      label: "UPI",
      value: "₹4,400",
      icon: Smartphone,
    },
  ];

  const recentOrders = [
    {
      orderNumber: "ORD-0048",
      customer: "Arun Kumar",
      table: "T01",
      amount: "₹180",
      status: "Completed",
    },
    {
      orderNumber: "ORD-0047",
      customer: "Priya",
      table: "T04",
      amount: "₹320",
      status: "Preparing",
    },
    {
      orderNumber: "ORD-0046",
      customer: "Karthik",
      table: "T02",
      amount: "₹250",
      status: "Ready",
    },
    {
      orderNumber: "ORD-0045",
      customer: "Rahul",
      table: "T06",
      amount: "₹420",
      status: "Pending",
    },
    {
      orderNumber: "ORD-0044",
      customer: "Meena",
      table: "T03",
      amount: "₹150",
      status: "Completed",
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
      {/* ==================== */}
      {/* Page Header */}
      {/* ==================== */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>

          <p className="text-xs text-gray-500">
            Overview of your restaurant performance today.
          </p>
        </div>

        <div className="text-xs text-gray-400">Today</div>
      </div>

      {/* ==================== */}
      {/* Stats Cards */}
      {/* ==================== */}
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

      {/* ==================== */}
      {/* Main Dashboard Grid */}
      {/* ==================== */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        {/* Recent Orders */}
        <div className="xl:col-span-2 rounded-xl border border-gray-200 bg-white shadow-sm">
          {/* Header */}
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

          {/* Orders */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left">
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
                    key={order.orderNumber}
                    className="border-b border-gray-50 last:border-0 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 text-xs font-medium text-gray-800">
                      {order.orderNumber}
                    </td>

                    <td className="px-4 py-3 text-xs text-gray-600">
                      {order.customer}
                    </td>

                    <td className="px-4 py-3 text-xs text-gray-600">
                      {order.table}
                    </td>

                    <td className="px-4 py-3 text-xs font-medium text-gray-800">
                      {order.amount}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-[10px] font-medium ${
                          statusStyles[order.status]
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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

              <span className="text-sm font-semibold text-gray-900">15</span>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== */}
      {/* Bottom Grid */}
      {/* ==================== */}
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
            <div className="rounded-lg bg-gray-50 p-3">
              <ShoppingCart size={16} className="text-gray-500" />

              <p className="mt-2 text-lg font-semibold text-gray-900">48</p>

              <p className="text-[10px] text-gray-400">Total</p>
            </div>

            <div className="rounded-lg bg-green-50 p-3">
              <CheckCircle2 size={16} className="text-green-600" />

              <p className="mt-2 text-lg font-semibold text-gray-900">38</p>

              <p className="text-[10px] text-gray-400">Completed</p>
            </div>

            <div className="rounded-lg bg-yellow-50 p-3">
              <Clock3 size={16} className="text-yellow-600" />

              <p className="mt-2 text-lg font-semibold text-gray-900">6</p>

              <p className="text-[10px] text-gray-400">Pending</p>
            </div>

            <div className="rounded-lg bg-red-50 p-3">
              <XCircle size={16} className="text-red-600" />

              <p className="mt-2 text-lg font-semibold text-gray-900">4</p>

              <p className="text-[10px] text-gray-400">Cancelled</p>
            </div>
          </div>
        </div>
      </div>

      {/* ==================== */}
      {/* Customers */}
      {/* ==================== */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
            <Users size={19} className="text-gray-700" />
          </div>

          <div>
            <p className="text-xs text-gray-500">Active Customers</p>

            <p className="text-lg font-semibold text-gray-900">126</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

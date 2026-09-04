import Order from "../models/Order.js";
import Payment from "../models/Payment.js";
import Table from "../models/Table.js";
import Customer from "../models/Customer.js";

// Get Dashboard Summary
export const getDashboardSummary = async () => {
  // Start of today
  const startOfToday = new Date();
  // 03-09-2026 10:30:45 PM
  startOfToday.setHours(0, 0, 0, 0);
  // இன்றைய நாள் தொடங்கும் நேரம்.
  // setHours(hours, minutes, seconds, milliseconds)
  // 03-09-2026 00:00:00.000
  // startOfToday
  // இன்று 12:00 AM

  // End of today
  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);
  // இது இன்றைய நாளின் கடைசி நேரம்.
  // 03-09-2026 23:59:59.999
  // 23 hours 59 minutes 59 seconds 999 milliseconds
  // endOfToday
  // இன்று 11:59:59.999 PM

  // Today's Orders
  // $gte = Greater Than or Equal To
  // $lte = Less Than or Equal To
  const todayOrders = await Order.find({
    createdAt: {
      $gte: startOfToday,
      $lte: endOfToday,
    },
  });

  // Today's Payments
  const todayPayments = await Payment.find({
    paymentDate: {
      $gte: startOfToday,
      $lte: endOfToday,
    },
    paymentStatus: "Paid",
  });

  // Today's Sales
  const todaySales = todayPayments.reduce(
    (total, payment) => total + payment.amount,
    0,
  );

  // Order Counts
  const totalOrders = todayOrders.length;

  const completedOrders = todayOrders.filter(
    (order) => order.orderStatus === "Completed",
  ).length;

  const pendingOrders = todayOrders.filter((order) =>
    ["Pending", "Preparing", "Ready"].includes(order.orderStatus),
  ).length;

  const cancelledOrders = todayOrders.filter(
    (order) => order.orderStatus === "Cancelled",
  ).length;

  // Table Summary
  const tables = await Table.find({
    isActive: true,
  });

  const availableTables = tables.filter(
    (table) => table.status === "Available",
  ).length;

  const occupiedTables = tables.filter(
    (table) => table.status === "Occupied",
  ).length;

  const reservedTables = tables.filter(
    (table) => table.status === "Reserved",
  ).length;

  // Payment Summary
  const cashPayments = todayPayments
    .filter((payment) => payment.paymentMethod === "Cash")
    .reduce((total, payment) => total + payment.amount, 0);

  const cardPayments = todayPayments
    .filter((payment) => payment.paymentMethod === "Card")
    .reduce((total, payment) => total + payment.amount, 0);

  const upiPayments = todayPayments
    .filter((payment) => payment.paymentMethod === "UPI")
    .reduce((total, payment) => total + payment.amount, 0);

  // Customers
  const totalCustomers = await Customer.countDocuments({
    isActive: true,
  });

  // Recent Orders
  const recentOrders = await Order.find()
    .populate("table")
    .populate("customer")
    .sort({ createdAt: -1 })
    .limit(5);

  return {
    sales: {
      today: todaySales,
    },

    orders: {
      total: totalOrders,
      completed: completedOrders,
      pending: pendingOrders,
      cancelled: cancelledOrders,
    },

    tables: {
      total: tables.length,
      available: availableTables,
      occupied: occupiedTables,
      reserved: reservedTables,
    },

    payments: {
      total: todaySales,
      cash: cashPayments,
      card: cardPayments,
      upi: upiPayments,
    },

    customers: {
      total: totalCustomers,
    },

    recentOrders,
  };
};

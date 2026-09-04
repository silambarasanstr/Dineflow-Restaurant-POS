import Order from "../models/Order.js";
import Payment from "../models/Payment.js";

// Get Sales Report
export const getSalesReport = async (from, to) => {
  const startDate = new Date(from);
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date(to);
  endDate.setHours(23, 59, 59, 999);

  // Get completed orders
  const orders = await Order.find({
    createdAt: {
      $gte: startDate,
      $lte: endDate,
    },
    paymentStatus: "Paid",
  })
    .populate("table")
    .populate("customer")
    .sort({ createdAt: -1 });

  // Get paid payments
  const payments = await Payment.find({
    paymentDate: {
      $gte: startDate,
      $lte: endDate,
    },
    paymentStatus: "Paid",
  });

  // Calculate totals
  const totalSales = payments.reduce(
    (total, payment) => total + payment.amount,
    0
  );

  const totalOrders = orders.length;

  const totalTax = orders.reduce(
    (total, order) => total + order.tax,
    0
  );

  const totalDiscount = orders.reduce(
    (total, order) => total + order.discount,
    0
  );

  // Payment method summary
  const cash = payments
    .filter((payment) => payment.paymentMethod === "Cash")
    .reduce((total, payment) => total + payment.amount, 0);

  const card = payments
    .filter((payment) => payment.paymentMethod === "Card")
    .reduce((total, payment) => total + payment.amount, 0);

  const upi = payments
    .filter((payment) => payment.paymentMethod === "UPI")
    .reduce((total, payment) => total + payment.amount, 0);

  return {
    period: {
      from,
      to,
    },

    summary: {
      totalSales,
      totalOrders,
      totalTax,
      totalDiscount,
      averageOrderValue:
        totalOrders > 0
          ? Number((totalSales / totalOrders).toFixed(2))
          : 0,
    },

    paymentMethods: {
      cash,
      card,
      upi,
    },

    orders,
  };
};

// Get Payment Report
export const getPaymentReport = async (from, to) => {
  const startDate = new Date(from);
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date(to);
  endDate.setHours(23, 59, 59, 999);

  const payments = await Payment.find({
    paymentDate: {
      $gte: startDate,
      $lte: endDate,
    },
    paymentStatus: "Paid",
  })
    .populate("order")
    .sort({ paymentDate: -1 });

  const totalAmount = payments.reduce(
    (total, payment) => total + payment.amount,
    0
  );

  return {
    period: {
      from,
      to,
    },

    summary: {
      totalPayments: payments.length,
      totalAmount,
    },

    payments,
  };
};
import Payment from "../models/Payment.js";
import Order from "../models/Order.js";
import Table from "../models/Table.js";

// Create Payment
export const createPayment = async (paymentData) => {
  const {
    order,
    amount,
    paymentMethod,
    transactionId = null,
    notes = "",
  } = paymentData;

  // Check Order
  const selectedOrder = await Order.findById(order);

  if (!selectedOrder) {
    throw new Error("Order not found");
  }

  // Check Order already paid
  if (selectedOrder.paymentStatus === "Paid") {
    throw new Error("Order is already paid");
  }

  // Check Payment already exists
  const existingPayment = await Payment.findOne({ order });

  if (existingPayment) {
    throw new Error("Payment already exists for this order");
  }

  // Validate amount
  if (Number(amount) !== Number(selectedOrder.totalAmount)) {
    throw new Error(
      `Payment amount must be ${selectedOrder.totalAmount}`
    );
  }

  // Create Payment
  const payment = await Payment.create({
    order,
    amount,
    paymentMethod,
    paymentStatus: "Paid",
    transactionId,
    paymentDate: new Date(),
    notes,
  });

  // Update Order Payment Status
  selectedOrder.paymentStatus = "Paid";
  selectedOrder.orderStatus = "Completed";

  await selectedOrder.save();

  // Release Table
  if (selectedOrder.table) {
    await Table.findByIdAndUpdate(selectedOrder.table, {
      status: "Available",
    });
  }

  // Return Payment with Order
  const createdPayment = await Payment.findById(payment._id)
    .populate({
      path: "order",
      populate: [
        {
          path: "table",
        },
        {
          path: "customer",
        },
      ],
    });

  return createdPayment;
};

// Get All Payments
export const getPayments = async () => {
  const payments = await Payment.find()
    .populate({
      path: "order",
      populate: [
        {
          path: "table",
        },
        {
          path: "customer",
        },
      ],
    })
    .sort({ createdAt: -1 });

  return payments;
};

// Get Payment By ID
export const getPaymentById = async (paymentId) => {
  const payment = await Payment.findById(paymentId).populate({
    path: "order",
    populate: [
      {
        path: "table",
      },
      {
        path: "customer",
      },
    ],
  });

  if (!payment) {
    throw new Error("Payment not found");
  }

  return payment;
};

// Get Payment By Order
export const getPaymentByOrder = async (orderId) => {
  const payment = await Payment.findOne({
    order: orderId,
  }).populate({
    path: "order",
    populate: [
      {
        path: "table",
      },
      {
        path: "customer",
      },
    ],
  });

  if (!payment) {
    throw new Error("Payment not found for this order");
  }

  return payment;
};
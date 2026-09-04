import Bill from "../models/Bill.js";
import Order from "../models/Order.js";
import Payment from "../models/Payment.js";
import OrderItem from "../models/OrderItem.js";

// Generate Bill Number
const generateBillNumber = async () => {
  const lastBill = await Bill.findOne()
    .sort({ createdAt: -1 })
    .select("billNumber");

  let nextNumber = 1;

  if (lastBill) {
    const lastNumber = parseInt(
      lastBill.billNumber.replace("BILL-", ""),
      10
    );

    nextNumber = lastNumber + 1;
  }

  return `BILL-${String(nextNumber).padStart(4, "0")}`;
};

// Create Bill
export const createBill = async (billData) => {
  const { order, notes = "" } = billData;

  // Check Order
  const selectedOrder = await Order.findById(order);

  if (!selectedOrder) {
    throw new Error("Order not found");
  }

  // Order must be paid
  if (selectedOrder.paymentStatus !== "Paid") {
    throw new Error("Bill can be generated only for paid orders");
  }

  // Check Bill already exists
  const existingBill = await Bill.findOne({ order });

  if (existingBill) {
    throw new Error("Bill already exists for this order");
  }

  // Get Payment
  const payment = await Payment.findOne({
    order,
    paymentStatus: "Paid",
  });

  if (!payment) {
    throw new Error("Paid payment not found for this order");
  }

  // Get Order Items
  const orderItems = await OrderItem.find({
    order,
  }).populate("menuItem");

  if (orderItems.length === 0) {
    throw new Error("Order items not found");
  }

  // Generate Bill Number
  const billNumber = await generateBillNumber();

  // Create Bill
  const bill = await Bill.create({
    billNumber,
    order: selectedOrder._id,
    payment: payment._id,
    subtotal: selectedOrder.subtotal,
    tax: selectedOrder.tax,
    discount: selectedOrder.discount,
    totalAmount: selectedOrder.totalAmount,
    billStatus: "Generated",
    generatedAt: new Date(),
    notes,
  });

  // Get Complete Bill
  const createdBill = await Bill.findById(bill._id)
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
    .populate("payment");

  return {
    bill: createdBill,
    items: orderItems,
  };
};

// Get All Bills
export const getBills = async () => {
  const bills = await Bill.find()
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
    .populate("payment")
    .sort({ createdAt: -1 });

  return bills;
};

// Get Bill By ID
export const getBillById = async (billId) => {
  const bill = await Bill.findById(billId)
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
    .populate("payment");

  if (!bill) {
    throw new Error("Bill not found");
  }

  const items = await OrderItem.find({
    order: bill.order._id,
  }).populate("menuItem");

  return {
    bill,
    items,
  };
};

// Get Bill By Order
export const getBillByOrder = async (orderId) => {
  const bill = await Bill.findOne({
    order: orderId,
  })
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
    .populate("payment");

  if (!bill) {
    throw new Error("Bill not found for this order");
  }

  const items = await OrderItem.find({
    order: orderId,
  }).populate("menuItem");

  return {
    bill,
    items,
  };
};
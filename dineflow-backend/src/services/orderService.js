import Order from "../models/Order.js";
import OrderItem from "../models/OrderItem.js";
import MenuItem from "../models/MenuItem.js";
import Table from "../models/Table.js";

// Generate Order Number
const generateOrderNumber = async () => {
  const lastOrder = await Order.findOne()
    .sort({ createdAt: -1 })
    .select("orderNumber");

  let nextNumber = 1;

  if (lastOrder) {
    const lastNumber = parseInt(
      lastOrder.orderNumber.replace("ORD-", ""),
      10
    );

    nextNumber = lastNumber + 1;
  }

  return `ORD-${String(nextNumber).padStart(4, "0")}`;
};

// Create Order
export const createOrder = async (orderData) => {
  const {
    table,
    customer,
    orderType = "Dine-In",
    items,
    tax = 0,
    discount = 0,
    notes = "",
  } = orderData;

  if (!items || items.length === 0) {
    throw new Error("Order must contain at least one item");
  }

  // Check table for Dine-In
  if (orderType === "Dine-In") {
    if (!table) {
      throw new Error("Table is required for Dine-In orders");
    }

    const selectedTable = await Table.findById(table);

    if (!selectedTable) {
      throw new Error("Table not found");
    }

    if (selectedTable.status !== "Available") {
      throw new Error("Table is not available");
    }
  }

  // Get Menu Items
  const menuItemIds = items.map((item) => item.menuItem);

  const menuItems = await MenuItem.find({
    _id: { $in: menuItemIds },
    isAvailable: true,
  });

  if (menuItems.length !== items.length) {
    throw new Error("One or more menu items are unavailable");
  }

  // Calculate Order Items
  let subtotal = 0;

  const orderItemsData = items.map((item) => {
    const menuItem = menuItems.find(
      (menu) => menu._id.toString() === item.menuItem.toString()
    );

    const quantity = Number(item.quantity);

    if (!quantity || quantity < 1) {
      throw new Error("Quantity must be at least 1");
    }

    const unitPrice = menuItem.price;
    const totalPrice = unitPrice * quantity;

    subtotal += totalPrice;

    return {
      menuItem: menuItem._id,
      quantity,
      unitPrice,
      totalPrice,
      notes: item.notes || "",
    };
  });

  const totalAmount = Math.max(
    0,
    subtotal + Number(tax) - Number(discount)
  );

  // Generate Order Number
  const orderNumber = await generateOrderNumber();

  // Create Order
  const order = await Order.create({
    orderNumber,
    table: orderType === "Dine-In" ? table : null,
    customer: customer || null,
    orderType,
    subtotal,
    tax,
    discount,
    totalAmount,
    paymentStatus: "Pending",
    orderStatus: "Pending",
    notes,
  });

  // Add Order ID to Order Items
  const orderItems = orderItemsData.map((item) => ({
    ...item,
    order: order._id,
  }));

  await OrderItem.insertMany(orderItems);

  // Mark Table as Occupied
  if (orderType === "Dine-In") {
    await Table.findByIdAndUpdate(table, {
      status: "Occupied",
    });
  }

  // Return Complete Order
  const createdOrder = await Order.findById(order._id)
    .populate("table")
    .populate("customer");

  const createdOrderItems = await OrderItem.find({
    order: order._id,
  }).populate("menuItem");

  return {
    order: createdOrder,
    items: createdOrderItems,
  };
};

// Get All Orders
export const getOrders = async () => {
  const orders = await Order.find()
    .populate("table")
    .populate("customer")
    .sort({ createdAt: -1 });

  return orders;
};

// Get Order By ID
export const getOrderById = async (orderId) => {
  const order = await Order.findById(orderId)
    .populate("table")
    .populate("customer");

  if (!order) {
    throw new Error("Order not found");
  }

  const items = await OrderItem.find({
    order: orderId,
  }).populate("menuItem");

  return {
    order,
    items,
  };
};

// Update Order Status
export const updateOrderStatus = async (orderId, orderStatus) => {
  const order = await Order.findByIdAndUpdate(
    orderId,
    { orderStatus },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!order) {
    throw new Error("Order not found");
  }

  // Release table after order completion/cancellation
  if (
    ["Completed", "Cancelled"].includes(orderStatus) &&
    order.table
  ) {
    await Table.findByIdAndUpdate(order.table, {
      status: "Available",
    });
  }

  return order;
};
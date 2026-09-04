import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
} from "../services/orderService.js";

// Create Order
export const createOrderController = async (req, res) => {
  try {
    const result = await createOrder(req.body);

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Orders
export const getOrdersController = async (req, res) => {
  try {
    const orders = await getOrders();

    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Order By ID
export const getOrderByIdController = async (req, res) => {
  try {
    const result = await getOrderById(req.params.id);

    res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Order Status
export const updateOrderStatusController = async (req, res) => {
  try {
    const { orderStatus } = req.body;

    if (!orderStatus) {
      return res.status(400).json({
        success: false,
        message: "Order status is required",
      });
    }

    const order = await updateOrderStatus(
      req.params.id,
      orderStatus
    );

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
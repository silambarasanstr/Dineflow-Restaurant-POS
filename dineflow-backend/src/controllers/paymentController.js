import {
  createPayment,
  getPayments,
  getPaymentById,
  getPaymentByOrder,
} from "../services/paymentService.js";

// Create Payment
export const createPaymentController = async (req, res) => {
  try {
    const payment = await createPayment(req.body);

    res.status(201).json({
      success: true,
      message: "Payment created successfully",
      data: payment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Payments
export const getPaymentsController = async (req, res) => {
  try {
    const payments = await getPayments();

    res.status(200).json({
      success: true,
      message: "Payments fetched successfully",
      data: payments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Payment By ID
export const getPaymentByIdController = async (req, res) => {
  try {
    const payment = await getPaymentById(req.params.id);

    res.status(200).json({
      success: true,
      message: "Payment fetched successfully",
      data: payment,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Payment By Order
export const getPaymentByOrderController = async (req, res) => {
  try {
    const payment = await getPaymentByOrder(req.params.orderId);

    res.status(200).json({
      success: true,
      message: "Payment fetched successfully",
      data: payment,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
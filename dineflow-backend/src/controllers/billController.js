import {
  createBill,
  getBills,
  getBillById,
  getBillByOrder,
} from "../services/billService.js";

// Create Bill
export const createBillController = async (req, res) => {
  try {
    const bill = await createBill(req.body);

    res.status(201).json({
      success: true,
      message: "Bill generated successfully",
      data: bill,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Bills
export const getBillsController = async (req, res) => {
  try {
    const bills = await getBills();

    res.status(200).json({
      success: true,
      message: "Bills fetched successfully",
      data: bills,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Bill By ID
export const getBillByIdController = async (req, res) => {
  try {
    const bill = await getBillById(req.params.id);

    res.status(200).json({
      success: true,
      message: "Bill fetched successfully",
      data: bill,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Bill By Order
export const getBillByOrderController = async (req, res) => {
  try {
    const bill = await getBillByOrder(req.params.orderId);

    res.status(200).json({
      success: true,
      message: "Bill fetched successfully",
      data: bill,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
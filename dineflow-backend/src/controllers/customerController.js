import {
  createCustomer,
  getCustomers,
  getCustomerById,
  getCustomerByPhone,
  updateCustomer,
  deleteCustomer,
  updateCustomerStatus,
} from "../services/customerService.js";

// Create Customer
export const createCustomerController = async (req, res) => {
  try {
    const customer = await createCustomer(req.body);

    res.status(201).json({
      success: true,
      message: "Customer created successfully",
      data: customer,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Customers
export const getCustomersController = async (req, res) => {
  try {
    const customers = await getCustomers();

    res.status(200).json({
      success: true,
      message: "Customers fetched successfully",
      data: customers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Customer By ID
export const getCustomerByIdController = async (req, res) => {
  try {
    const customer = await getCustomerById(req.params.id);

    res.status(200).json({
      success: true,
      message: "Customer fetched successfully",
      data: customer,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Customer By Phone
export const getCustomerByPhoneController = async (req, res) => {
  try {
    const customer = await getCustomerByPhone(req.params.phone);

    res.status(200).json({
      success: true,
      message: "Customer fetched successfully",
      data: customer,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Customer
export const updateCustomerController = async (req, res) => {
  try {
    const customer = await updateCustomer(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Customer updated successfully",
      data: customer,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Customer
export const deleteCustomerController = async (req, res) => {
  try {
    await deleteCustomer(req.params.id);

    res.status(200).json({
      success: true,
      message: "Customer deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Customer Status
export const updateCustomerStatusController = async (req, res) => {
  try {
    const { isActive } = req.body;

    if (typeof isActive !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "isActive must be a boolean",
      });
    }

    const customer = await updateCustomerStatus(
      req.params.id,
      isActive
    );

    res.status(200).json({
      success: true,
      message: "Customer status updated successfully",
      data: customer,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
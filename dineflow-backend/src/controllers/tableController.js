import {
  createTable,
  getTables,
  getTableById,
  updateTable,
  deleteTable,
  updateTableStatus,
} from "../services/tableService.js";

// Create Table
export const createTableController = async (req, res) => {
  try {
    const table = await createTable(req.body);

    res.status(201).json({
      success: true,
      message: "Table created successfully",
      data: table,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Tables
export const getTablesController = async (req, res) => {
  try {
    const tables = await getTables();

    res.status(200).json({
      success: true,
      message: "Tables fetched successfully",
      data: tables,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Table By ID
export const getTableByIdController = async (req, res) => {
  try {
    const table = await getTableById(req.params.id);

    res.status(200).json({
      success: true,
      message: "Table fetched successfully",
      data: table,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Table
export const updateTableController = async (req, res) => {
  try {
    const table = await updateTable(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Table updated successfully",
      data: table,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Table
export const deleteTableController = async (req, res) => {
  try {
    await deleteTable(req.params.id);

    res.status(200).json({
      success: true,
      message: "Table deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Table Status
export const updateTableStatusController = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    const table = await updateTableStatus(req.params.id, status);

    res.status(200).json({
      success: true,
      message: "Table status updated successfully",
      data: table,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
import Table from "../models/Table.js";

// Create Table
export const createTable = async (tableData) => {
  const table = await Table.create(tableData);

  return table;
};

// Get All Tables
export const getTables = async () => {
  const tables = await Table.find().sort({ tableNumber: 1 });

  return tables;
};

// Get Table By ID
export const getTableById = async (tableId) => {
  const table = await Table.findById(tableId);

  if (!table) {
    throw new Error("Table not found");
  }

  return table;
};

// Update Table
export const updateTable = async (tableId, tableData) => {
  const table = await Table.findByIdAndUpdate(
    tableId,
    tableData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!table) {
    throw new Error("Table not found");
  }

  return table;
};

// Delete Table
export const deleteTable = async (tableId) => {
  const table = await Table.findByIdAndDelete(tableId);

  if (!table) {
    throw new Error("Table not found");
  }

  return table;
};

// Update Table Status
export const updateTableStatus = async (tableId, status) => {
  const table = await Table.findByIdAndUpdate(
    tableId,
    { status },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!table) {
    throw new Error("Table not found");
  }

  return table;
};
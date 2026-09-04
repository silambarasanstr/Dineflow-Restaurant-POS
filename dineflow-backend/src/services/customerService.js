import Customer from "../models/Customer.js";

// Create Customer
export const createCustomer = async (customerData) => {
  const customer = await Customer.create(customerData);

  return customer;
};

// Get All Customers
export const getCustomers = async () => {
  const customers = await Customer.find().sort({ createdAt: -1 });

  return customers;
};

// Get Customer By ID
export const getCustomerById = async (customerId) => {
  const customer = await Customer.findById(customerId);

  if (!customer) {
    throw new Error("Customer not found");
  }

  return customer;
};

// Get Customer By Phone
export const getCustomerByPhone = async (phone) => {
  const customer = await Customer.findOne({ phone });

  if (!customer) {
    throw new Error("Customer not found");
  }

  return customer;
};

// Update Customer
export const updateCustomer = async (customerId, customerData) => {
  const customer = await Customer.findByIdAndUpdate(
    customerId,
    customerData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!customer) {
    throw new Error("Customer not found");
  }

  return customer;
};

// Delete Customer
export const deleteCustomer = async (customerId) => {
  const customer = await Customer.findByIdAndDelete(customerId);

  if (!customer) {
    throw new Error("Customer not found");
  }

  return customer;
};

// Update Customer Status
export const updateCustomerStatus = async (customerId, isActive) => {
  const customer = await Customer.findByIdAndUpdate(
    customerId,
    { isActive },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!customer) {
    throw new Error("Customer not found");
  }

  return customer;
};
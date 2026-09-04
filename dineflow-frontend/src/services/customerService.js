import api from "./api";

const getCustomers = async () => {
  const res = await api.get("/customers");

  return res.data;
};

const customerService = {
  getCustomers,
};

export default customerService;
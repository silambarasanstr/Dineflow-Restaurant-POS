import api from "./api";

const getOrders = async () => {
  const res = await api.get("/orders");

  return res.data;
};

const orderService = {
  getOrders,
};

export default orderService;

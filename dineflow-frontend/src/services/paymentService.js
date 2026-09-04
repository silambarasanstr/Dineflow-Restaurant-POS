import api from "./api";

const getPayments = async () => {
  const res = await api.get("/payments");

  return res.data;
};

const paymentService = {
  getPayments,
};

export default paymentService;

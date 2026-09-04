import api from "./api";

export const getSalesReport = async (from, to) => {
  const response = await api.get("/reports/sales", {
    params: {
      from,
      to,
    },
  });

  return response.data;
};

export const getPaymentReport = async (from, to) => {
  const response = await api.get("/reports/payments", {
    params: {
      from,
      to,
    },
  });

  return response.data;
};
import api from "./api";

const getTables = async () => {
  const res = await api.get("/tables");
  return res.data;
};

const tableService = {
  getTables,
};

export default tableService;

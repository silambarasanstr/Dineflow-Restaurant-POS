import api from "./api";

const getBills = async () => {
  const res = await api.get("/bills");
  return res.data;
};

const billService = {
  getBills,
};

export default billService;

import api from "./api";

const getOnlyCategories = async () => {
  const res = await api.get("/categories");
  console.log(res.data,"Only Categories");
  return res.data;

  
};

const getCategories = async (page, limit, search = "") => {
  const res = await api.get("/categories", {
    params: {
      page,
      limit,
      search,
    },
  });
  return res.data;
};

const getCategoryById = async (id) => {
  const res = await api.get(`/categories/${id}`);
  return res.data;
};

const createCategory = async (data) => {
  const res = await api.post("/categories", data);
  return res.data;
};

const updateCategory = async (id, data) => {
  const res = await api.put(`/categories/${id}`, data);
  return res.data;
};

const deleteCategory = async (id) => {
  const res = await api.delete(`/categories/${id}`);
  return res.data;
};

const updateCategoryStatus = async (id, isActive) => {
  const res = await api.patch(`/categories/${id}/status`, {
    isActive,
  });

  return res.data;
};

const categoryService = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  updateCategoryStatus,
};

export default categoryService;

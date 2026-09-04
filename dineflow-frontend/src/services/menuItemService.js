import api from "./api";

const getMenuItems = async () => {
  const res = await api.get("/menu-items");
  return res.data;
};

const getMenuItemById = async (id) => {
  const res = await api.get(`/menu-items/${id}`);
  return res.data;
};

const createMenuItem = async (data) => {
  const res = await api.post("/menu-items", data);
  return res.data;
};

const updateMenuItem = async (id, data) => {
  const res = await api.put(`/menu-items/${id}`, data);
  return res.data;
};

const deleteMenuItem = async (id) => {
  const res = await api.delete(`/menu-items/${id}`);
  return res.data;
};

const updateMenuItemStatus = async (id, isActive) => {
  const res = await api.patch(`/menu-items/${id}/status`, {
    isActive,
  });

  return res.data;
};

const menuItemService = {
  getMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  updateMenuItemStatus,
};

export default menuItemService;
import {
  createMenuItem,
  getMenuItems,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem,
} from "../services/menuItemService.js";

// Create Menu Item
export const createMenuItemController = async (req, res) => {
  try {
    const menuItem = await createMenuItem(req.body);

    res.status(201).json({
      success: true,
      message: "Menu item created successfully",
      data: menuItem,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Menu Items
export const getMenuItemsController = async (req, res) => {
  try {
    const menuItems = await getMenuItems();

    res.status(200).json({
      success: true,
      message: "Menu items fetched successfully",
      data: menuItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Menu Item By ID
export const getMenuItemByIdController = async (req, res) => {
  try {
    const menuItem = await getMenuItemById(req.params.id);

    res.status(200).json({
      success: true,
      message: "Menu item fetched successfully",
      data: menuItem,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Menu Item
export const updateMenuItemController = async (req, res) => {
  try {
    const menuItem = await updateMenuItem(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Menu item updated successfully",
      data: menuItem,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Menu Item
export const deleteMenuItemController = async (req, res) => {
  try {
    await deleteMenuItem(req.params.id);

    res.status(200).json({
      success: true,
      message: "Menu item deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
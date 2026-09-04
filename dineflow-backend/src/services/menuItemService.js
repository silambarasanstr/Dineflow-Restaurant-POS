import mongoose from "mongoose";
import MenuItem from "../models/MenuItem.js";
import Category from "../models/Category.js";

export const createMenuItem = async ({
  name,
  category,
  description,
  price,
  image,
  isAvailable,
}) => {
  // Check category
  const existingCategory = await Category.findById(category);

  if (!existingCategory) {
    throw new Error("Category not found");
  }

  // Check duplicate item in same category
  const existingMenuItem = await MenuItem.findOne({
    name,
    category,
  });

  if (existingMenuItem) {
    throw new Error(
      "Menu item with this name already exists in this category"
    );
  }

  const menuItem = await MenuItem.create({
    name,
    category,
    description,
    price,
    image,
    isAvailable,
  });

  return await menuItem.populate("category", "name");
};

export const getMenuItems = async () => {
  const menuItems = await MenuItem.find()
    .populate("category", "name")
    .sort({ createdAt: -1 });

  return menuItems;
};

export const getMenuItemById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid menu item ID");
  }

  const menuItem = await MenuItem.findById(id).populate(
    "category",
    "name"
  );

  if (!menuItem) {
    throw new Error("Menu item not found");
  }

  return menuItem;
};

export const updateMenuItem = async (
  id,
  {
    name,
    category,
    description,
    price,
    image,
    isAvailable,
    isActive,
  }
) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid menu item ID");
  }

  const menuItem = await MenuItem.findById(id);

  if (!menuItem) {
    throw new Error("Menu item not found");
  }

  // Check category if category is being changed
  if (category && category !== menuItem.category.toString()) {
    const existingCategory = await Category.findById(category);

    if (!existingCategory) {
      throw new Error("Category not found");
    }
  }

  const updatedCategory = category || menuItem.category;

  // Check duplicate item
  if (
    name &&
    (name !== menuItem.name ||
      updatedCategory.toString() !== menuItem.category.toString())
  ) {
    const existingMenuItem = await MenuItem.findOne({
      name,
      category: updatedCategory,
      _id: { $ne: id },
    });

    if (existingMenuItem) {
      throw new Error(
        "Menu item with this name already exists in this category"
      );
    }
  }

  menuItem.name = name ?? menuItem.name;
  menuItem.category = category ?? menuItem.category;
  menuItem.description = description ?? menuItem.description;
  menuItem.price = price ?? menuItem.price;
  menuItem.image = image ?? menuItem.image;
  menuItem.isAvailable =
    isAvailable ?? menuItem.isAvailable;
  menuItem.isActive = isActive ?? menuItem.isActive;

  await menuItem.save();

  return await menuItem.populate("category", "name");
};

export const deleteMenuItem = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid menu item ID");
  }

  const menuItem = await MenuItem.findById(id);

  if (!menuItem) {
    throw new Error("Menu item not found");
  }

  await menuItem.deleteOne();

  return menuItem;
};
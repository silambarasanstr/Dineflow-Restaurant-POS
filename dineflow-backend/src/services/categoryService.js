import Category from "../models/Category.js";

export const createCategory = async ({ name, description }) => {
  const existingCategory = await Category.findOne({ name });

  if (existingCategory) {
    throw new Error("Category with this name already exists");
  }

  const category = await Category.create({
    name,
    description,
  });

  return category;
};

export const getCategories = async () => {
  const categories = await Category.find().sort({
    createdAt: -1,
  });

  return categories;
};

export const getCategoryById = async (id) => {
  const category = await Category.findById(id);

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
};

export const updateCategory = async (
  id,
  { name, description, isActive }
) => {
  const category = await Category.findById(id);

  if (!category) {
    throw new Error("Category not found");
  }

  if (name && name !== category.name) {
    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      throw new Error("Category with this name already exists");
    }
  }

  category.name = name ?? category.name;
  category.description = description ?? category.description;
  category.isActive = isActive ?? category.isActive;

  await category.save();

  return category;
};

export const deleteCategory = async (id) => {
  const category = await Category.findById(id);

  if (!category) {
    throw new Error("Category not found");
  }

  await category.deleteOne();

  return category;
};
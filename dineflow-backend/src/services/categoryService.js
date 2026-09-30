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

export const getCategories = async (page = 1, limit = 10, search = "",) => {
  const skip = (page - 1) * limit;

  const filter = search
    ? {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ],
      }
    : {};

  const categories = await Category.find(filter)
    .sort({
      createdAt: -1,
    })
    .skip(skip)
    .limit(limit);

  const total = await Category.countDocuments(filter);

  return {
    categories,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};

export const getCategoryById = async (id) => {
  const category = await Category.findById(id);

  if (!category) {
    throw new Error("Category not found");
  }

  return category;
};

export const updateCategory = async (id, { name, description, isActive }) => {
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

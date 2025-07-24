import CategoryModel from "../models/category.model.js";
import SubCategoryModel from "../models/subCategory.model.js";
import ProductModel from "../models/product.model.js";

export const AddCategoryController = async (request, response) => {
  try {
    const { name, image } = request.body;

    if (!name || !image) {
      return response.status(400).json({
        message: "Enter requird fileds",
        error: true,
        success: false,
      });
    }

    const addCategory = new CategoryModel({
      // Create a new category instance
      name,
      image,
    });
    // Save the category to the database

    const saveeCategory = await addCategory.save();
    // Check if the category was saved successfully

    if (!saveeCategory) {
      return response.status(500).json({
        message: "Not Created",
        error: true,
        success: false,
      });
    }

    return response.json({
      message: "Add Category",
      data: saveeCategory,
      success: true,
      error: false,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const GetCategoryController = async (request, response) => {
  try {
    const data = await CategoryModel.find().sort({ createdAt: -1 });

    return response.json({
      data: data,
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(200).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const UpdateCategoryController = async (request, response) => {
  try {
    const { _id, name, image } = request.body;

    const update = await CategoryModel.updateOne(
      {
        _id: _id,
      },
      {
        name,
        image,
      }
    );

    return response.json({
      message: "Category Updated",
      data: update,
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

export const DeleteCategoryController = async (request, response) => {
  try {
    const { _id } = request.body;
    const checkSubCategory = await SubCategoryModel.find({
      category: {
        '$in': [_id],
      },
    }).countDocuments();

    const checkProduct = await ProductModel.find({
      category: {
        '$in': [ _id ],
      },
    }).countDocuments();

    if (checkSubCategory > 0 || checkProduct > 0) {
      return response.status(400).json({
        message: "This category has subcategories, please delete them first.",
        error: true,
        success: false,
      });
    }

    const deleteCategory = await CategoryModel.deleteOne({ _id: _id });
    return response.json({
      message: "Category Deleted Successfully",
      data: deleteCategory,
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};





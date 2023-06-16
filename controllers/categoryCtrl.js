import Category from "../model/Category.js";
import asyncHandler from 'express-async-handler';



// @desc Create Category
// @Route POST /api/v1/categories
// @Access Private/Admin


export const createCategoryCtrl = asyncHandler (async (req, res) => {
    const { name } = req.body;

    const categoryFound = await Category.findOne({name})

    if(categoryFound){
        throw new Error('Category already exists')
    };

    const category = await Category.create({
        name: name.toLowerCase(),
        user: req.userAuthId,
    })

    res.json({
        status: 'success',
        message:"Caregory created successfully",
        category,
    });
});

// @desc Get all categories
// @route GET /api/v1/categories
// @access Public

export const getAllCategoriesCtrl = asyncHandler(async (req, res) => {
    const categories = await Category.find();

    res.json({
        status: "success",
        message: "categories fetched successfully",
        categories,
    });
    }
);

// @desc Get single category
// @route GET /api/v1/categories/:id
// @access Public

export const getSingleCategoryCtrl = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);

    if(!category) {
        throw new Error("category not found");
    }
    res.json({
        status: "success",
        message: "category fetched successfully",
        category,
    });
    }
);

// @desc Update category
// @route PUT /api/v1/categories/:id/
// @access Private/Admin

export const updateCategoryCtrl = asyncHandler(async (req, res) => {
    const {name} = req.body;

    const category = await Category.findByIdAndUpdate(req.params.id, {name}, {new: true});

    res.json({
        status: "success",
        message: "category updated successfully",
        category,
    });
});

// @desc Delete category
// @route DELETE /api/v1/categories/:id/
// @access Private/Admin


export const deleteCategoryCtrl = asyncHandler(async (req, res) => {
    const category = await Category.findByIdAndDelete(req.params.id);

    res.json({
        status: "success",
        message: "Product deleted successfully",
    });
});
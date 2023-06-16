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
        name,
        user: req.userAuthId,
    })

    res.json({
        status: 'success',
        message:"Caregory created successfully",
        category,
    });
});
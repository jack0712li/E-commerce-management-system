import asyncHandler from "express-async-handler";
import Product from "../model/Product.js";
import Review from "../model/Review.js";

// @desc    Create new review
// @route   POST /api/v1/reviews
// @access  Private/Admin

export const createReviewCtrl = asyncHandler(async (req, res) => {
    console.log(req.body);
    const {product,message,rating} = req.body;
    
    const {productID} = req.params;
    const productFound = await Product.findById(productID);
    if(!productFound) {
        throw new Error("Product not found");
    }

    //check if user has already reviewed
    const reviewFound = await Review.findOne({user : req.userAuthId,product : productFound?._id})
    if(reviewFound) {
        throw new Error("You have already reviewed this product");
    }

    //create Review
    const review = await Review.create({
        product : productFound?._id,
        user : req.userAuthId,
        message,
        rating
    });

    productFound.reviews.push(review?._id);
    await productFound.save();
    res.status(201).json({
        success : true,
        message : "Review created successfully",
    });
});
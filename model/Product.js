//product schema
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            ref: "Category",
            required: true,
        },
        sizes: {
            type: [String],
            enum: ["XS", "S", "M", "L", "XL", "XXL"],
            required: true,
        },
        colors: {
            type: [String],
            required: true,
        },
        user:{
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        images: [
            {
                type: String,
                required: true,
            }
        ],
        reviews: [
            {
                type: Schema.Types.ObjectId,
                ref: "Review",
            },
        ],
        price:{
            type: Number,
            required: true,
        },
        totalQty:{
            type: Number,
            required: true,
        },
        totalSold:{
            type: Number,
            required: true,
            default: 0,
        },
    },
    {   timestamps: true ,
        toJSON: { virtuals: true },
    }
);
//Virtuals
//Total rating
productSchema.virtual("leftQuality").get(function () {
    const product = this;
    return product?.totalQty - product?.totalSold;
});

productSchema.virtual("totalReviews").get(function () {
    const product = this;
    return product?.reviews?.length;
})
productSchema.virtual("averageRating").get(function () {
    let ratingsTotal = 0;
    const product = this;
    product?.reviews?.forEach((review) => {
        ratingsTotal += review?.rating;
    });

    const averageRating = Number(ratingsTotal / product?.reviews?.length).toFixed(1);
    return averageRating;

});


const Product = mongoose.model("Product", productSchema);
export default Product;

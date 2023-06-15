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
                default: "https://via.placeholder.com/150",
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

const Product = mongoose.model("Product", productSchema);
export default Product;
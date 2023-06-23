import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
    {
        name: {
            type: String,
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
        products: [
            {
                type: Schema.Types.ObjectId,
                ref: "Product",
            }
        ],
    },
    { timestamps: true }
);

const Category = mongoose.model("Category", CategorySchema);

export default Category;

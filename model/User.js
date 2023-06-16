import mongoose from 'mongoose';
const Schema = mongoose.Schema;



const UserSchema = new Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
        },
    ],
    wishLists: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'WishLists',
        },
    ],
    isAdmin: {
        type: Boolean,
        default: false,
    },
    hasShippingAddress: {
        type: Boolean,
        default: false,
    },
    shippingAddress: {
        firsName: { 
            type: String,
        },
        lastName: {
            type: String,
        },
        address: {
            type: String,
        },
        city: {
            type: String,
        },
        postalCode: {
            type: String,
        },
        province: {
            type: String,
        },
        county: {
            type: String,
        },
        phone: {
            type: String,
        },
    },
},{
    timestamps: true,
});


const User = mongoose.model('User', UserSchema);


export default User;
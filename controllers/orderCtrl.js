import Order from '../model/Order.js';
import asyncHandler from "express-async-handler";
import User from '../model/User.js';
import Product from '../model/Product.js';
//@desc create orders
//@route POST /api/v1/orders
//@access private

export const createOrderCtrl = asyncHandler(async (req, res) => {
    //Get the payload(customer,orderItems,shippingAddress,totalPrice)
    const{orderItems,shippingAddress,totalPrice} = req.body;

    //Find the user by id
    const user = await User.findById(req.userAuthId);

    //Check if user is has shipping address
    if(!user.hasShippingAddress){
        throw new Error("Please provide shipping address");
    }


    //Check if order is not empty
    if(orderItems?.length <= 0){
        throw new Error("No order items");
    }

    //place/create order - save into DB
    const order = await Order.create({
        user:req?.userAuthId,
        orderItems,
        shippingAddress,
        totalPrice,
    });


    //Update the product qty
    const products = await Product.find({ _id: { $in: orderItems } });

    orderItems?.map(async (order) => {
      const product = products?.find((product) => {
        return product?._id?.toString() === order?._id?.toString();
      });
      if (product) {
        product.totalSold += order.qty;
      }
      await product.save();
    });

    //push order into user
    user.orders.push(order?._id);
    await user.save();

    //make payment(stripe)
    //payment webhook
    //update the order status
    res.json({
        success:true,
        message:"Order placed successfully",
        order,
        user,
    });
    



});
import Order from '../model/Order.js';
import dotenv from 'dotenv';
dotenv.config();
import asyncHandler from "express-async-handler";
import User from '../model/User.js';
import Product from '../model/Product.js';
import Stripe from 'stripe';
//@desc create orders
//@route POST /api/v1/orders
//@access private

//stripe
const stripe = new Stripe(process.env.STRIPE_KEY);

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




  //make payment (stripe)
  //convert order items to have same structure that stripe need
  const convertedOrders = orderItems.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item?.name,
          description: item?.description,
        },
        unit_amount: item?.price * 100,
      },
      quantity: item?.qty,
    };
  });
  const session = await stripe.checkout.sessions.create({
    line_items: convertedOrders,
    metadata: {
      orderId: JSON.stringify(order?._id),
    },
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });
  res.send({ url: session.url });

});

//@desc get all orders
//@route GET /api/v1/orders
//@access private

export const getAllordersCtrl = asyncHandler(async (req, res) => {
  //find all orders
  const orders = await Order.find().populate("user");
  res.json({
    success: true,
    message: "All orders",
    orders,
  });
});

//@desc get single order
//@route GET /api/v1/orders/:id
//@access private/admin

export const getSingleOrderCtrl = asyncHandler(async (req, res) => {
  //get the id from params
  const id = req.params.id;
  const order = await Order.findById(id);
  //send response
  res.status(200).json({
    success: true,
    message: "Single order",
    order,
  });
});

//@desc update order to delivered
//@route PUT /api/v1/orders/update/:id
//@access private/admin

export const updateOrderCtrl = asyncHandler(async (req, res) => {
  //get the id from params
  const id = req.params.id;
  //update
  const updatedOrder = await Order.findByIdAndUpdate(
    id,
    {
      status: req.body.status,
    },
    {
      new: true,
    }
  );
  res.status(200).json({
    success: true,
    message: "Order updated",
    updatedOrder,
  });
});

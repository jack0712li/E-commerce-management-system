import dotenv from 'dotenv';
import Stripe from 'stripe';
import Order from '../model/Order.js';
dotenv.config();
import express from 'express';
import dbConnection from '../config/dbConnect.js';
import { globalErrHandler,notFoundHandler } from '../middlewares/globalErrHandler.js';  
import userRouter from '../routes/userRoute.js';
import productRouter from '../routes/productRoute.js';
import categoryRouter from '../routes/categoriesRouter.js';
import brandsRouter from '../routes/brandsRouter.js';
import colorRouter from '../routes/colorRouter.js';
import reviewRouter from '../routes/reviewRouter.js';
import orderRouter from '../routes/ordersRouter.js'; 

//db connection
dbConnection();
const app = express();

//Stripe webhook
//Stripe instance
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_740cb5ff5dc15f1d123930a305cb30967e79437a7bac2797a607b63b379e6b32";

app.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    async (request, response) => {
      const sig = request.headers["stripe-signature"];
  
      let event;
  
      try {
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
        console.log(event);
      } catch (err) {
        console.log("err", err.message);
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }
      if (event.type === "checkout.session.completed") {
        //update the order
        const session = event.data.object;
        const { orderId } = session.metadata;
        const paymentStatus = session.payment_status;
        const paymentMethod = session.payment_method_types[0];
        const totalAmount = session.amount_total;
        const currency = session.currency;
        //find the order
        const order = await Order.findByIdAndUpdate(
          JSON.parse(orderId),
          {
            totalPrice: totalAmount / 100,
            currency,
            paymentMethod,
            paymentStatus,
          },
          {
            new: true,
          }
        );
        console.log(order);
      } else {
        return;
      }

//   // Handle the event
//   switch (event.type) {
//     case 'payment_intent.succeeded':
//       const paymentIntentSucceeded = event.data.object;
//       // Then define and call a function to handle the event payment_intent.succeeded
//       break;
//     // ... handle other event types
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

//   // Return a 200 response to acknowledge receipt of the event
  response.send();
});


//pass incoming data
app.use(express.json());
//routes
app.use('/api/v1/users/',userRouter);
app.use('/api/v1/products/',productRouter);
app.use('/api/v1/categories/',categoryRouter);
app.use('/api/v1/brands/',brandsRouter);
app.use('/api/v1/colors/',colorRouter);
app.use('/api/v1/reviews/',reviewRouter);
app.use('/api/v1/orders/',orderRouter);




//err middlewar
app.use(notFoundHandler);
app.use(globalErrHandler);

export default app;
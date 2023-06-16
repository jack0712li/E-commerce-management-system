import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import dbConnection from '../config/dbConnect.js';
import { globalErrHandler,notFoundHandler } from '../middlewares/globalErrHandler.js';  
import userRouter from '../routes/userRoute.js';
import productRouter from '../routes/productRoute.js';
import categoryRouter from '../routes/categoriesRouter.js';

//db connection
dbConnection();
const app = express();

//pass incoming data
app.use(express.json());
//routes
app.use('/api/v1/users/',userRouter);
app.use('/api/v1/products/',productRouter);
app.use('/api/v1/categories/',categoryRouter);


//err middlewar
app.use(notFoundHandler);
app.use(globalErrHandler);

export default app;
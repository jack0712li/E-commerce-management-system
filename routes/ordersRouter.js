import exppress from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import {createOrderCtrl} from "../controllers/orderCtrl.js";


const orderRouter = exppress();

orderRouter.post("/", isLoggedIn, createOrderCtrl);

export default orderRouter;
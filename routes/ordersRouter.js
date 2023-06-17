import exppress from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import {createOrderCtrl , getAllordersCtrl, getSingleOrderCtrl, updateOrderCtrl} from "../controllers/orderCtrl.js";


const orderRouter = exppress();

orderRouter.post("/", isLoggedIn, createOrderCtrl);
orderRouter.get("/", isLoggedIn, getAllordersCtrl);
orderRouter.put("/update/:id", isLoggedIn, updateOrderCtrl);
orderRouter.get("/:id", isLoggedIn, getSingleOrderCtrl);




export default orderRouter;
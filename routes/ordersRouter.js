import exppress from "express";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import {createOrderCtrl , getAllordersCtrl, getSingleOrderCtrl, updateOrderCtrl, getOrderStatsCtrl } from "../controllers/orderCtrl.js";


const orderRouter = exppress();

orderRouter.post("/", isLoggedIn, createOrderCtrl);
orderRouter.get("/", isLoggedIn, getAllordersCtrl);
orderRouter.put("/update/:id", isLoggedIn, updateOrderCtrl);
orderRouter.get("/:id", isLoggedIn, getSingleOrderCtrl);
orderRouter.get("/sales/stats", isLoggedIn, getOrderStatsCtrl );





export default orderRouter;
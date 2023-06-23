import express from 'express';
import { createCouponCtrl,getAllCouponsCtrl,getCouponCtrl,updateCouponCtrl,deleteCouponCtrl } from '../controllers/couponsCtrl.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';




const couponsRouter = express.Router();

couponsRouter.post('/',isLoggedIn, createCouponCtrl);
couponsRouter.get('/',isLoggedIn, getAllCouponsCtrl);
couponsRouter.get('/:id',isLoggedIn, getCouponCtrl);
couponsRouter.put('/update/:id',isLoggedIn, updateCouponCtrl);
couponsRouter.delete('/delete/:id',isLoggedIn, deleteCouponCtrl);

export default couponsRouter;
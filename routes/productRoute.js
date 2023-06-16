import express from 'express';
import { createProductCtrl, getProductsCtrl,getProductCtrl, updateProductCtrl,deleteProductCtrl } from '../controllers/productsCtrl.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';


const productRouter = express.Router();

productRouter.post('/',isLoggedIn,createProductCtrl);
productRouter.get('/',getProductsCtrl);
productRouter.get('/:id',getProductCtrl);
productRouter.put('/:id',isLoggedIn,updateProductCtrl);
productRouter.delete('/:id',isLoggedIn,deleteProductCtrl);

export default productRouter;
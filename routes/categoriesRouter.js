import express from 'express';
import {createCategoryCtrl, getAllCategoriesCtrl, getSingleCategoryCtrl, updateCategoryCtrl, deleteCategoryCtrl} from '../controllers/categoryCtrl.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';

const categoryRouter = express.Router();

categoryRouter.post('/', isLoggedIn, createCategoryCtrl);
categoryRouter.get('/', getAllCategoriesCtrl);
categoryRouter.get('/:id', getSingleCategoryCtrl);
categoryRouter.put('/:id', isLoggedIn, updateCategoryCtrl);
categoryRouter.delete('/:id', isLoggedIn, deleteCategoryCtrl);




export default categoryRouter;

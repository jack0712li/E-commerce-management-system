import express from 'express';
import {createCategoryCtrl, getAllCategoriesCtrl, getSingleCategoryCtrl, updateCategoryCtrl, deleteCategoryCtrl} from '../controllers/categoryCtrl.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import catetgoryFileUpload from "../config/categoryUpload.js";

const categoryRouter = express.Router();

categoryRouter.post('/', isLoggedIn, catetgoryFileUpload.single("file"),createCategoryCtrl);
categoryRouter.get('/', getAllCategoriesCtrl);
categoryRouter.get('/:id', getSingleCategoryCtrl);
categoryRouter.put('/:id', isLoggedIn, updateCategoryCtrl);
categoryRouter.delete('/:id', isLoggedIn, deleteCategoryCtrl);




export default categoryRouter;

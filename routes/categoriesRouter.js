import express from 'express';
import {createCategoryCtrl} from '../controllers/categoryCtrl.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';

const categoryRouter = express.Router();

categoryRouter.post('/', isLoggedIn, createCategoryCtrl);



export default categoryRouter;

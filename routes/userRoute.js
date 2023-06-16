import express from 'express';
import { registerUserCtrl,loginUserCtrl,getUserProfileCtrl } from '../controllers/usersCtrl.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';

const userRouter = express.Router();

userRouter.post('/register',registerUserCtrl);
userRouter.post('/login',loginUserCtrl);
userRouter.get('/profile',isLoggedIn,getUserProfileCtrl);


export default userRouter;
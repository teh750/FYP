import express from 'express';
import { loginUser,registerUser,adminLogin } from '../controllers/userController.js';
import userModel from "../models/userModel.js";

const userRouter = express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)

// count users
userRouter.get('/count', async (req, res) => {
    try {
        const userCount = await userModel.countDocuments();
        res.json({ success: true, total: userCount });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
});

export default userRouter;
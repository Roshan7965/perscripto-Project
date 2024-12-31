import express from "express";
import { verifyRazorpay, getProfile, loginUser, register, updateUser,bookAppointment, listAppointment, cancelAppointment, paymentRazorpay } from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js"
import upload from "../middlewares/multer.js";


const userRouter=express.Router();

userRouter.post("/register",register);
userRouter.post("/login",loginUser);

userRouter.get('/get-profile',authUser,getProfile);
userRouter.post('/update-profile',upload.single('image'),authUser,updateUser);
userRouter.post('/book-appointment',authUser,bookAppointment);
userRouter.get('/appointments',authUser,listAppointment);
userRouter.post('/cancel-appointment',authUser,cancelAppointment);
userRouter.post('/payment-razorpay',authUser,paymentRazorpay);
userRouter.post('/verifyRazorpay',authUser,verifyRazorpay);

export default userRouter;
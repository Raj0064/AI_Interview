import express from "express";
import { googleAuth, LogOut } from "../controllers/auth.controller.js";

const authRouter=express.Router()

authRouter.post('/google',googleAuth)
authRouter.get('/logout',LogOut)


export default authRouter;
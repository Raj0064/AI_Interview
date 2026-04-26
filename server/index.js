import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/connectDb.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import interviewRouter from "./routes/interview.roue.js";
const app= express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials:true
  })
);

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);
app.use("/api/interview",interviewRouter);


const port=process.env.PORT||8000;
app.listen(port,()=>{
  console.log("Server is running on ",port);
  connectDB();
})
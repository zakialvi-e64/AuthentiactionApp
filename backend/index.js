import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/userModel.js";
import authRoutes from "./routes/authRoutes.js";
import guestRoutes from "./routes/guestRoutes.js";
import auth from "./middlewares/auth.js";


dotenv.config();

const app = express();
const port = process.env.PORT;
const mongoURL = process.env.MONGO_URL;

app.use(express.json());
app.use("/api",auth,authRoutes);
app.use("/api",guestRoutes);

mongoose.connect(mongoURL);

mongoose.connection.on("connected",()=>{
    console.log("Successfully connected to MongoDB")
});

mongoose.connection.on("error",()=>{
    console.log("Not connected to MongoDB")
});

app.listen(port,()=>{
    console.log("Server is running on port: "+port)
});
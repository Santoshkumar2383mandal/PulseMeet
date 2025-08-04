import express from "express"
// import dotenv from "dotenv"
import "dotenv/config"

import authRoutes from "./routes/auth.route.js"
import { connectDB } from "./lib/db.js";

const app = express()
const PORT = process.env.PORT;

// app.get("/api/auth/login",(req,res)=>{
//     res.send("Login ROute");
// })

// app.get("/api/auth/signup",(req,res)=>{
//     res.send("Signup Route");
// })

// app.get("/api/auth/logout",(req,res)=>{
//     res.send("Logout ROute");
// })

app.use("/api/auth", authRoutes);

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
    connectDB();
})
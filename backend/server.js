import express from "express";
import dotenv from "dotenv"
import connectMongoDB from "./db/connectMongoDB.js";
import cookieParser from "cookie-parser";
import cors from 'cors'

import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import userRoutes from "./routes/user.route.js"
import { app, server } from "./socket/socket.js";


app.use(cors({
    origin: "http://localhost:5173",  // Your React app URL
    credentials: true  // Allow cookies to be sent
}));
const PORT = process.env.PORT || 5000;

dotenv.config();

app.get("/", (req,res) => {
    res.send("Api is working")
})

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes)

server.listen(PORT,() => {
    connectMongoDB();
    console.log(`server running on port ${PORT}`)
});
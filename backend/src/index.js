
import dotenv from "dotenv"
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import cors from "cors"
import path from "path";
import express from "express"

import {app,server} from "./lib/socket.js"

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

const __dirname = path.resolve();

dotenv.config()


app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req,res)=>{
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}

server.listen(PORT, ()=>{
    console.log("hello there: "+ PORT)
    connectDB();
})
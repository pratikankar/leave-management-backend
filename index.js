import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import route from "./routes/employeeRoutes.js";
import { connection } from "./config/db.js";

dotenv.config();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL

connection();

const app = express();

app.use(cors());

// To parse JSON request
app.use(express.json());

// To parse url encoded
app.use(express.urlencoded({ extended: true }));

app.use("/api", route);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})


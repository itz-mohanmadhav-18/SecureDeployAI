// Description: Main entry point for the application.
import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import { MONGO_URI } from "./config/keys";

// Health check route
app.get("/health", (req, res) => {
    res.status(200).json({ message: "Server is running!" });
});

// Default route
app.get("/", (req, res) => {
    res.send("Hello, CI/CD Pipeline!");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

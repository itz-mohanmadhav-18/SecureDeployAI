// Description: Main entry point for the application.
import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;

// import fs from "fs";

// Health check route
app.get("/health", (req, res) => {
    res.status(200).json({ message: "Server is running!" });
});

// Set up environment variables

// API route
app.get("/api", (req, res) => {
    res.status(200).json({ message: "API route is working!" });
});

app.get("/hello", (req, res) => {
    res.send("Hello, CI/CD Pipeline!");
});


// Default route
app.get("/", (req, res) => {
    res.send("Hello, CI/CD Pipeline!");
});

app.listen(3000, '0.0.0.0', () => {
    console.log('Server running on port 3000');
  });
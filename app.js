// Description: Main entry point for the application.
import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;

import fs from "fs";

// my_api_key ="bjbjcbjbdcbjdbbjdbbcdcaabcdcd"cdd

// Middleware to log all requests/
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check route
app.get("/health", (req, res) => {
    console.log("Health check route accessed");
    res.status(200).json({ message: "Server is running!" });
});

// API route
app.get("/api", (req, res) => {
    console.log("API route accessed");//console.log(req
    res.status(200).json({ message: "API route is working!" });
});

// Hello route
app.get("/hello", (req, res) => { 
    console.log("Hello route accessed");
    res.send("Hello, CI/CD Pipeline!"); 
});

// Test routes
app.get("/test", (req, res) => {
    console.log("Test route accessed");
    res.status(200).json({ status: "success", message: "Test route is working!" });
});

// Echo route - returns whatever you send as query parameters
app.get("/echo", (req, res) => {
    console.log("Echo route accessed with query:", req.query);
    res.status(200).json({ 
        message: "Echo service", 
        query: req.query,
        timestamp: new Date().toISOString()
    });
});

// Route with parameters
app.get("/users/:userId", (req, res) => {
    const userId = req.params.userId;
    console.log(`User route accessed for ID: ${userId}`);
    res.status(200).json({ 
        message: `Fetched user data for ID: ${userId}`,
        userId: userId
    });
});

// POST route example\

app.post("/users", (req, res) => {
    console.log("POST request to /users route with body:", req.body);
    res.status(200).json({ 
        message: "User created",
        user: req.body,
        timestamp: new Date().toISOString(),
    });

    // Save user data to a file (for demonstration purposes only)
    // fs.writeFileSync("users.json", JSON.stringify(req.body, null, 2));
});

// Default route
app.get("/", (req, res) => {
    console.log("Root route accessed");
    res.send("Welcome to the test API server!");
});
//dk

// Wildcard route to catch undefined routes
app.use("*", (req, res) => {
    console.log(`Request to non-existent route: ${req.originalUrl}`);
    res.status(404).json({ 
        status: "error", 
        message: "Route not found",
        requestedPath: req.originalUrl
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running${PORT}`);
});
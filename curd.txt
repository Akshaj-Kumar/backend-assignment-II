const express = require("express");
const logger = require("./middleware/logger");
const studentRoutes = require("./routes/studentRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Built-in middleware to parse incoming JSON payloads
app.use(express.json());

// Custom Logger Middleware (Logs Method, URL, Time)
app.use(logger);

// Root Route - Welcome & API Documentation Summary
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Student Management REST API",
    endpoints: {
      "GET /students": "View all students",
      "GET /students/:id": "View student by ID",
      "POST /students": "Create a new student (Body: { name, course })",
      "PUT /students/:id": "Update student details (Body: { name?, course? })",
      "DELETE /students/:id": "Delete a student by ID"
    }
  });
});

// Modular Routing for Student Resources
app.use("/students", studentRoutes);

// 404 Handler for Undefined Routes
app.use((req, res) => {
  res.status(404).json({
    message: "Route Not Found"
  });
});

// Global Error Handling Middleware (500 Internal Server Error)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Internal Server Error",
    error: err.message
  });
});

// Start Server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API Base URL: http://localhost:${PORT}/students`);
  });
}

module.exports = app;

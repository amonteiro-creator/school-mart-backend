const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { addRoutersInApp } = require("./src/routes");
const errorHandler = require("./src/middleware/error-handler");

const app = express();

// Global Middlewares
app.use(helmet());
app.use(
  cors({
    origin: "*",
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register all API routes
addRoutersInApp(app);

// Global Error Handler Middleware
app.use(errorHandler);

module.exports = app;

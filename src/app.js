const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const contactRoutes = require("./routes/contactRoutes");
const errorHandler = require("./middlewares/errorMiddleware");

const app = express();

// 1. CORS Middleware (MUST COME FIRST)
const allowedOrigins = [process.env.CLIENT_URL];

// CORS Configuration
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g., mobile apps, Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "OPTIONS"], // Add OPTIONS for preflight
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
  maxAge: 86400,
};
// Only add credentials if needed
if (process.env.NEED_AUTH === "true") {
  corsOptions.credentials = true;
}
app.use(cors(corsOptions));

// 1. Security Headers Middleware (applied first)
app.use((req, res, next) => {
  res.header(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' https://apis.example.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self';"
  );
  res.header("X-Content-Type-Options", "nosniff");
  res.header("X-Frame-Options", "DENY");
  res.header(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains"
  );
  next();
});

// MiddlesWares
app.use(express.json());
app.use(bodyParser.json());

// Add this before your routes
app.options("/api/contact", (req, res) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://www.devkinesis.com",
    "https://devkinesis.com"
  );
  res.header("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.sendStatus(204);
});

// Routes
app.use("/api", contactRoutes);
<<<<<<< HEAD
app.get("/", (req, res) => {
  res.send("Hello from IVS!");
=======
app.get("/hi", (req, res) => {
  res.send("Hello from DevKinesis!");
>>>>>>> 3b3006ec45a9a6a173f3b920005577e0cc80ab82
});
// Error handling middleware
app.use(errorHandler);

// Serve static files
app.use(express.static("public"));

module.exports = app;

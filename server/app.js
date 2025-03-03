// app.js
require('dotenv').config();
const express = require("express");
const cors= require('cors');
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const emailRoutes = require('./routes/emailRoutes');
const aiRoutes = require('./routes/ai');
const cookieParser = require("cookie-parser");

const BACKEND_URL =
    process.env.NODE_APP_ENV === "Production"
        ? process.env.NODE_APP_PRODUCTION_BACKEND_URL
        : process.env.NODE_APP_LOCAL_BACKEND_URL;

        const FRONTEND_URL =
        process.env.NODE_APP_ENV === "Production"
            ? process.env.NODE_APP_PRODUCTION_FRONTEND_URL
            : process.env.NODE_APP_LOCAL_FRONTEND_URL;

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: `${FRONTEND_URL}`,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/", authRoutes);
app.use("/",emailRoutes);
app.use("/",aiRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on Port:${PORT}`);
});
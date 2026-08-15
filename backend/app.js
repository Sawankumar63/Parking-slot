const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const parkingRoutes = require("./routes/parkingRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "https://parking-slot1.netlify.app"
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("ParkEase Backend Running 🚗");
});

app.use("/api", userRoutes);
app.use("/api", authRoutes);
app.use("/api/parking", parkingRoutes);
app.use("/api/bookings", bookingRoutes);

app.use(errorHandler);

module.exports = app;

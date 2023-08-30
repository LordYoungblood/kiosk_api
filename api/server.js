require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const authRoutes = require("./routes/authRoutes");
const vehicleRoutes = require("./routes/visitorRoutes");
const authMiddleware = require("./middleware/authentication");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome to the Vehicle Tracking API");
});

app.use("/api/auth", authRoutes);
app.use("/api", authMiddleware, vehicleRoutes);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

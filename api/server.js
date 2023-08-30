require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const authRoutes = require("./routes/authRoutes");
const baseRoutes = require("./routes/basesRoutes");
const squadronRoutes = require("./routes/squadronsRoutes");
const userRoutes = require("./routes/usersRoutes");
const visitorRoutes = require("./routes/visitorsRoutes");
const { logger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(logger);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.use("/api/auth", authRoutes);
app.use("/api/bases", baseRoutes);
app.use("/api/squadrons", squadronRoutes);
app.use("/api/users", userRoutes);
app.use("/api/visitors", visitorRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

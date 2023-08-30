const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    console.error("Missing or Invalid Authorization Header Format");
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("JWT Verification Error:", err.message);
      return res.status(403).json({ message: "Forbidden" });
    }
    req.user = decoded.id;
    next();
  });
};

module.exports = verifyJWT;

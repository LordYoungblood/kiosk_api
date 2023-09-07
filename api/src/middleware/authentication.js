const jwt = require("jsonwebtoken");

// ----- Auth middleware to verify token and add user to req object -----------------////
const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  try {
    if (typeof bearerHeader !== "undefined") {
      return res
      .status(401)
      .json({ message: "No token, authorization denied" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid TOKENNNNNNNN!!!" });
  }
};

// function auth(req, res, next) {
//   const authHeader = req.headers.authorization; //checks the users token in the header
//   if (typeof authHeader !== "undefined") {
//     //if its not undefined then it splits the token at the first space and seperates the token from the bearer
//     const token = authHeader.split(" ")[1]; // this is the split
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);//grabs the next element in the array and sets it as the bearer token
//     req.user = decoded.id;//sets the bearer token to the request
//     next(); //built in function that allows the middleware to run
//   } else {
//     res.sendStatus(403); //sends a forbidden if there is no token
//   }
// }

module.exports = auth;

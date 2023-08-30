const client = require("../config/dbConn");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { user_name, password } = req.body;
  try {
    const user = await client.query(
      `SELECT * FROM users WHERE user_name = '${user_name}'`
    );
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.rows[0].password);
    if (isMatch) {
      const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
      });
      res.setHeader("Authorization", `Bearer ${token}`);
      res.cookie("auth", token, {
        maxAge: 28800000,
        domain:
          "http://kioskapp-env.eba-umdxbzym.us-gov-west-1.elasticbeanstalk.com",
        path: "/",
        SameSite: "None",
        Secure: false,
      });
      res.status(200).json({
        token,
        user: user.rows[0],
      });
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const client = require("../config/dbConn");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getUsers = async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error("Get Users Error:", err.message);
    res.status(500).send("Server error");
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error("Get All Users Error:", err.message);
    res.status(500).send("Server error");
  }
};

exports.getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await client.query(`SELECT * FROM users WHERE id = ${id}`);
    res.json(user.rows[0]);
  } catch (err) {
    console.error(`Get User Error (ID: ${id}):`, err.message);
    res.status(500).send("Server error");
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { user_name, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const updatedUser = await client.query(
      `UPDATE users SET user_name = '${user_name}', password = '${hashedPassword}' WHERE id = ${id} RETURNING *`
    );
    res.json(updatedUser.rows[0]);
  } catch (err) {
    console.error(`Update User Error (ID: ${id}):`, err.message);
    res.status(500).send("Server error");
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await client.query(`DELETE FROM users WHERE id = ${id}`);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(`Delete User Error (ID: ${id}):`, err.message);
    res.status(500).send("Server error");
  }
};

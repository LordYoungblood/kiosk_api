const { query } = require("express");
const client = require("../../db/client");

const getAllUsers = async (req, res) => {
  const base = req.headers.base;
  const sanitizedBase = base.replace(/"/g, ''); 
  try {
    const all = await client.query(`SELECT * FROM users WHERE user_base ->> 'name' = '${sanitizedBase}'`);
    res.status(200).send(all.rows);
  } catch (err) {
    // console.log(err);ssss
    res.status(500).send(err);
  }
};


const deleteUser = async (req, res) => {
  // const userID = req.body.userID;
  // console.log("userID", userID)
  try {
    const user = await client.query(
      `DELETE FROM Users WHERE id = '${userID}'`
    );
    res.status(200).send("User deleted");
  } catch {
    res.status(500).send(err);
    console.log("Problem deleting user")
  }
};

module.exports = { getAllUsers, deleteUser };

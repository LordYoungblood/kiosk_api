const client = require("../../db/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//------ Login functionallity with bcrypt and jwt ---------------------------------//
//----- user_name: password: admin: true/false -----=------------------------------//
const login = async (req, res) => {
  const { user_name, password } = req.body;
  // console.log("HITTING ADD")
// console.log("req.body in loging", req.body)
  try {
    const user = await client.query(
      `SELECT * FROM users WHERE user_name = '${user_name}'`
    );

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
      console.log("error")
    }

    const isMatch = await bcrypt.compare(password, user.rows[0].password);
    if (isMatch) {
      const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
      });
      res.setHeader("Authorization", `Bearer ${token}`);
      console.log("Welcome to Kiosk App!");
// console.log("cookie value", cookieValue)
      // console.log("req.body in login", req.body)
      res.status(200).json({
        token,
        user: user.rows[0],
      });
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

//----- Register functionallity with bcrypt *** must register with postman --------////
//----- user_name: password: admin: true/false -----=------------------------------////
const register = async (req, res) => {
  const objBase = req.body.user_base;
  const stringBase = JSON.stringify(req.body.user_base);
  if (req.body.admin === undefined) {
    req.body.admin = false;
  }
  const password = await bcrypt.hash(req.body.password, 10);
  const { user_name, admin } = req.body;
  try {
    if (!user_name || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }
    // console.log("USER_NAME", user_name)
    const user = await client.query(
      `INSERT INTO users (user_name, password, admin, user_base) VALUES ('${user_name}', '${password}', '${admin}', '{
        "name": ${stringBase}
      }')`
    );
    

    // await client.query(`CREATE TABLE IF NOT EXISTS ${objBase.name}
    //         (
    //           id uuid NOT NULL DEFAULT uuid_generate_v4(),
    //           first_name character varying(255) COLLATE pg_catalog."default",
    //           last_name character varying(255) COLLATE pg_catalog."default",
    //           drivers_license character varying(255) COLLATE pg_catalog."default",
    //           plate character varying(255) COLLATE pg_catalog."default",
    //           make character varying(255) COLLATE pg_catalog."default",
    //           model character varying(255) COLLATE pg_catalog."default",
    //           state character varying COLLATE pg_catalog."default",
    //           date timestamp
    //         );`);

    res.status(200).send({ user_name, admin });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

//logout///////////////////////////////////////////////////////////////////
const logout = async (req, res) => {
  res.clearCookie("auth");
  res.status(200).json({ message: "success" });
};

module.exports = { login, register, logout };

const client = require("../config/dbConn");

exports.getAllVisitors = async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM visitors");
    res.json(result.rows);
  } catch (err) {
    console.error("Get All Visitors Error:", err.message);
    res.status(500).send("Server error");
  }
};

exports.addVisitor = async (req, res) => {
  try {
    // Assuming the table columns match the body keys
    const {
      first_name,
      last_name,
      drivers_license,
      plate,
      make,
      model,
      state,
      visit_date,
    } = req.body;

    const result = await client.query(
      `INSERT INTO visitors (first_name, last_name, drivers_license, plate, make, model, state, visit_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [
        first_name,
        last_name,
        drivers_license,
        plate,
        make,
        model,
        state,
        visit_date,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Add Visitor Error:", err.message);
    res.status(500).send("Server error");
  }
};

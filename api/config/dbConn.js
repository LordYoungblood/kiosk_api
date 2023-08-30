const { Sequelize } = require("sequelize");

const PG_DB_USERNAME = process.env.PGUSER;
const PG_DB_PASSWORD = process.env.PGPASSWORD;
const PG_DB_URL = process.env.PGHOST;
const PG_DB_PORT = process.env.PGPORT;
const PG_DB_NAME = process.env.PGDATABASE;

const sequelize = new Sequelize(PG_DB_NAME, PG_DB_USERNAME, PG_DB_PASSWORD, {
  host: PG_DB_URL,
  port: PG_DB_PORT,
  dialect: "postgres",
  define: {
    timestamps: false,
  },
  logging: false, // This will prevent Sequelize from logging every SQL query (optional, but can make console output cleaner)
});

const connectToDatabase = async () => {
  let retries = 5;
  while (retries) {
    try {
      await sequelize.authenticate();
      console.log("Connected to database");
      return;
    } catch (err) {
      console.error("Unable to connect to database:", err);
      retries -= 1;
      console.log(`Retries left: ${retries}`);
      await new Promise((res) => setTimeout(res, 5000));
    }
  }
  console.error("Failed to connect to database after multiple retries.");
};

connectToDatabase();

module.exports = sequelize;

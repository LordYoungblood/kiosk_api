const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConn");
const Base = require("./base");
const Squadron = require("./squadron");

const Visitor = sequelize.define(
  "Visitor",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    drivers_license: DataTypes.STRING,
    plate: DataTypes.STRING,
    make: DataTypes.STRING,
    model: DataTypes.STRING,
    state: DataTypes.STRING,
    visit_date: DataTypes.DATE,
  },
  {
    tableName: "visitors",
  }
);

Visitor.belongsTo(Base, { foreignKey: "base_id" });
Visitor.belongsTo(Squadron, { foreignKey: "squadron_id" });

module.exports = Visitor;

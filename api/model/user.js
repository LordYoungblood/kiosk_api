const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConn");
const Base = require("./base");
const Squadron = require("./squadron"); // You'll need to create this model

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "users",
  }
);

User.belongsTo(Base, { foreignKey: "base_id" });
User.belongsTo(Squadron, { foreignKey: "squadron_id" });

module.exports = User;

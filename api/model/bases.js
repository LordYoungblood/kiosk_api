const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConn");

class Base extends Model {}

Base.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Base",
    tableName: "bases",
    timestamps: false,
  }
);

module.exports = Base;

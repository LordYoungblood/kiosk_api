const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConn");
const Base = require("./bases");

class Squadron extends Model {}

Squadron.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    base_id: {
      type: DataTypes.UUID,
      references: {
        model: Base,
        key: "id",
      },
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Squadron",
    tableName: "squadrons",
    timestamps: false,
  }
);

module.exports = Squadron;

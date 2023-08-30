const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConn");
const Base = require("./bases");
const Squadron = require("./squadrons");

class Visitor extends Model {}

Visitor.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    drivers_license: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    plate: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    make: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    visit_date: {
      type: DataTypes.DATE,
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
    squadron_id: {
      type: DataTypes.UUID,
      references: {
        model: Squadron,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "Visitor",
    tableName: "visitors",
    timestamps: false,
  }
);

module.exports = Visitor;

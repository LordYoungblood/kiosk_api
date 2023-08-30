const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConn");
const Base = require("./bases");
const Squadron = require("./squadrons");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
    modelName: "User",
    tableName: "users",
    timestamps: false,
  }
);

module.exports = User;

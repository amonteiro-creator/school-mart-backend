const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class School extends Model {
    static associate(models) {
      School.hasMany(models.Uniform, { foreignKey: "school_id" });
      School.hasMany(models.Order, { foreignKey: "school_id" });
    }
  }

  School.init(
    {
      school_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      contact_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      is_archive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "School",
      tableName: "schools",
      underscored: true,
    },
  );

  return School;
};

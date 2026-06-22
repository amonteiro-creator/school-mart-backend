const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Uniform extends Model {
    static associate(models) {
      Uniform.belongsTo(models.School, { foreignKey: "school_id" });
      Uniform.hasMany(models.CartItem, { foreignKey: "uniform_id" });
      Uniform.hasMany(models.OrderItem, { foreignKey: "uniform_id" });
    }
  }

  Uniform.init(
    {
      uniform_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      school_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      sizes: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      is_archive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Uniform",
      tableName: "uniforms",
      underscored: true,
    },
  );

  return Uniform;
};

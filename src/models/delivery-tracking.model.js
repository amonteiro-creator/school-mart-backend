const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class DeliveryTracking extends Model {
    static associate(models) {
      DeliveryTracking.belongsTo(models.Order, { foreignKey: "order_id" });
    }
  }

  DeliveryTracking.init(
    {
      tracking_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      order_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tracking_link: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "DeliveryTracking",
      tableName: "delivery_tracking",
      underscored: true,
      createdAt: false,
    },
  );

  return DeliveryTracking;
};

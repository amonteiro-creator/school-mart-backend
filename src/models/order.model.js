const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, { foreignKey: "user_id" });
      Order.belongsTo(models.School, { foreignKey: "school_id" });
      Order.hasMany(models.OrderItem, { foreignKey: "order_id" });
      Order.hasOne(models.DeliveryTracking, { foreignKey: "order_id" });
    }
  }

  Order.init(
    {
      order_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      school_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(
          "PENDING",
          "CONFIRMED",
          "SHIPPED",
          "DELIVERED",
          "CANCELLED",
        ),
        allowNull: false,
      },
      payment_status: {
        type: DataTypes.ENUM("PENDING", "SUCCESS", "FAILED"),
        allowNull: false,
      },
      payment_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      is_archive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Order",
      tableName: "orders",
      underscored: true,
    },
  );

  return Order;
};

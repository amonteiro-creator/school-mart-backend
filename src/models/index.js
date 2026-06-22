const sequelize = require("../config/db.config");

const User = require("./user.model")(sequelize);
const School = require("./school.model")(sequelize);
const Uniform = require("./uniform.model")(sequelize);
const Cart = require("./cart.model")(sequelize);
const CartItem = require("./cart-item.model")(sequelize);
const Order = require("./order.model")(sequelize);
const OrderItem = require("./order-item.model")(sequelize);
const DeliveryTracking = require("./delivery-tracking.model")(sequelize);
const UserToken = require("./user-token.model")(sequelize);

// Associations

// School and Uniform
School.hasMany(Uniform, { foreignKey: "school_id" });
Uniform.belongsTo(School, { foreignKey: "school_id" });

// Cart
User.hasOne(Cart, { foreignKey: "user_id" });
Cart.belongsTo(User, { foreignKey: "user_id" });

Cart.hasMany(CartItem, { foreignKey: "cart_id" });
CartItem.belongsTo(Cart, { foreignKey: "cart_id" });

Uniform.hasMany(CartItem, { foreignKey: "uniform_id" });
CartItem.belongsTo(Uniform, { foreignKey: "uniform_id" });

// Order
School.hasMany(Order, { foreignKey: "school_id" });
Order.belongsTo(School, { foreignKey: "school_id" });

User.hasMany(Order, { foreignKey: "user_id" });
Order.belongsTo(User, { foreignKey: "user_id" });

Order.hasMany(OrderItem, { foreignKey: "order_id" });
OrderItem.belongsTo(Order, { foreignKey: "order_id" });

Uniform.hasMany(OrderItem, { foreignKey: "uniform_id" });
OrderItem.belongsTo(Uniform, { foreignKey: "uniform_id" });

// Delivery Tracking
Order.hasOne(DeliveryTracking, { foreignKey: "order_id" });
DeliveryTracking.belongsTo(Order, { foreignKey: "order_id" });

// User Token
User.hasMany(UserToken, { foreignKey: "user_id" });
UserToken.belongsTo(User, { foreignKey: "user_id" });

module.exports = {
  sequelize,
  User,
  School,
  Uniform,
  Cart,
  CartItem,
  Order,
  OrderItem,
  DeliveryTracking,
  UserToken,
};

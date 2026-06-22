const pingRoutes = require("./ping.routes");
const authRoutes = require("./auth.routes");
const schoolRoutes = require("./school.routes");
const uniformRoutes = require("./uniform.routes");
const cartRoutes = require("./cart.routes"); // Placeholder for future
const orderRoutes = require("./order.routes");
const deliveryRoutes = require("./delivery.routes");

const addRoutersInApp = (app) => {
  app.use("/api/ping", pingRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/schools", schoolRoutes);
  app.use("/api/uniforms", uniformRoutes);
  app.use("/api/cart", cartRoutes);
  app.use("/api/orders", orderRoutes);
  app.use("/api/delivery", deliveryRoutes);
};

module.exports = { addRoutersInApp };

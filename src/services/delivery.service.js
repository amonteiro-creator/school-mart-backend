const { DeliveryTracking, Order } = require("../models");
require("dotenv").config();

const assignTracking = async (order_id, status) => {
  const order = await Order.findOne({ where: { order_id, is_archive: false } });
  if (!order) throw new Error("e-order-1");

  // Generate a mock tracking link
  const tracking_link = `${process.env.FRONTEND_URL}/track/${order_id}`;

  const tracking = await DeliveryTracking.upsert({
    order_id,
    status,
    tracking_link,
  });

  return { rid: "s-delivery-1", data: tracking[0] };
};

const updateTracking = async (order_id, status, location) => {
  const tracking = await DeliveryTracking.findOne({ where: { order_id } });
  if (!tracking) throw new Error("e-delivery-1");

  await tracking.update({ status, location });
  return { rid: "s-delivery-2", data: tracking };
};

const getTracking = async (order_id) => {
  const tracking = await DeliveryTracking.findOne({ where: { order_id } });
  if (!tracking) throw new Error("e-delivery-1");
  return { rid: "s-delivery-3", data: tracking };
};

module.exports = {
  assignTracking,
  updateTracking,
  getTracking,
};

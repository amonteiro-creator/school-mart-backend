const { Order, OrderItem, Cart, CartItem, sequelize } = require("../models");
const { ORDER_STATUS, PAYMENT_STATUS } = require("../constants");
const { Op } = require("sequelize");

const createOrderFromCart = async (user_id) => {
  const transaction = await sequelize.transaction();

  try {
    const cart = await Cart.findOne({
      where: { user_id },
      include: [CartItem],
      transaction,
    });

    if (!cart || !cart.CartItems || cart.CartItems.length === 0) {
      throw new Error("e-cart-3"); // Cart is empty
    }

    // Determine school_id from the first item (assuming all items must belong to same school if required,
    // but the schema says order has a school_id. If items are from different schools, we might need a different logic.
    // For now, let's assume we take school_id from the first uniform).
    const firstItem = cart.CartItems[0];
    const uniform = await firstItem.getUniform({ transaction });
    const school_id = uniform.school_id;

    const total_amount = cart.CartItems.reduce((sum, item) => {
      return sum + parseFloat(item.price) * item.quantity;
    }, 0);

    const order = await Order.create(
      {
        user_id,
        school_id,
        status: ORDER_STATUS.PENDING,
        payment_status: PAYMENT_STATUS.PENDING,
        total_amount,
      },
      { transaction },
    );

    const orderItems = cart.CartItems.map((item) => ({
      order_id: order.order_id,
      uniform_id: item.uniform_id,
      quantity: item.quantity,
      size: item.size,
      price: item.price,
    }));

    await OrderItem.bulkCreate(orderItems, { transaction });

    // Clear cart
    await CartItem.destroy({
      where: { cart_id: cart.cart_id },
      transaction,
    });

    await transaction.commit();

    return { rid: "s-order-1", data: order };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const getOrders = async (user_id, role, body, query) => {
  const { page = 1, limit = 10 } = query;
  const { status, school_id, ...filters } = body;

  const offset = (page - 1) * limit;

  const where = {
    is_archive: false,
    ...filters,
  };

  if (role === "PARENT") {
    where.user_id = user_id;
  }

  if (status) where.status = status;
  if (school_id) where.school_id = school_id;

  const { count, rows } = await Order.findAndCountAll({
    where,
    limit,
    offset,
    include: [{ model: OrderItem }],
    order: [["created_at", "DESC"]],
  });

  return {
    rid: "s-order-2",
    data: {
      count,
      rows,
      page: parseInt(page),
      limit: parseInt(limit),
    },
  };
};

const getOrderById = async (order_id, user_id, role) => {
  const where = { order_id, is_archive: false };
  if (role === "PARENT") {
    where.user_id = user_id;
  }

  const order = await Order.findOne({
    where,
    include: [{ model: OrderItem }],
  });
  if (!order) throw new Error("e-order-1");
  return { rid: "s-order-3", data: order };
};

const updateOrderStatus = async (order_id, status) => {
  const order = await Order.findOne({ where: { order_id, is_archive: false } });
  if (!order) throw new Error("e-order-1");

  await order.update({ status });
  return { rid: "s-order-4", data: order };
};

const cancelOrder = async (order_id, user_id, role) => {
  const where = { order_id, is_archive: false };
  if (role === "PARENT") {
    where.user_id = user_id;
  }

  const order = await Order.findOne({ where });
  if (!order) throw new Error("e-order-1");

  if (order.status !== ORDER_STATUS.PENDING && role === "PARENT") {
    throw new Error("e-order-2"); // Cannot cancel order if not pending (assuming this rule)
  }

  await order.update({ status: ORDER_STATUS.CANCELLED });
  return {
    rid: "s-order-5",
    data: null,
  };
};

module.exports = {
  createOrderFromCart,
  getOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
};

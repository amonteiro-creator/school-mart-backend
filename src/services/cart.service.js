const { Cart, CartItem, Uniform } = require("../models");

const getActiveCartByUserId = async (user_id) => {
  let cart = await Cart.findOne({
    where: { user_id },
    include: [
      {
        model: CartItem,
        include: [
          {
            model: Uniform,
            attributes: ["name", "category", "school_id"],
          },
        ],
      },
    ],
  });

  if (!cart) {
    cart = await Cart.create({ user_id });
    cart = await Cart.findOne({
      where: { user_id },
      include: [{ model: CartItem }],
    });
  }

  return { rid: "s-cart-2", data: cart };
};

const addItemToCart = async (user_id, itemData) => {
  const { uniform_id, quantity, size } = itemData;

  const uniform = await Uniform.findOne({
    where: { uniform_id, is_archive: false },
  });
  if (!uniform) throw new Error("e-uniform-1");

  let cart = await Cart.findOne({ where: { user_id } });
  if (!cart) {
    cart = await Cart.create({ user_id });
  }

  // Check if item already exists in cart with same size
  let cartItem = await CartItem.findOne({
    where: { cart_id: cart.cart_id, uniform_id, size },
  });

  if (cartItem) {
    await cartItem.update({
      quantity: cartItem.quantity + quantity,
      price: uniform.price, // Update price in case it changed
    });
  } else {
    cartItem = await CartItem.create({
      cart_id: cart.cart_id,
      uniform_id,
      quantity,
      size,
      price: uniform.price,
    });
  }

  return { rid: "s-cart-1", data: cartItem };
};

const updateCartItem = async (user_id, cart_item_id, updateData) => {
  const cart = await Cart.findOne({ where: { user_id } });
  if (!cart) throw new Error("e-cart-1");

  const cartItem = await CartItem.findOne({
    where: { cart_item_id, cart_id: cart.cart_id },
  });
  if (!cartItem) throw new Error("e-cart-2");

  await cartItem.update(updateData);
  return { rid: "s-cart-3", data: cartItem };
};

const removeCartItem = async (user_id, cart_item_id) => {
  const cart = await Cart.findOne({ where: { user_id } });
  if (!cart) throw new Error("e-cart-1");

  const cartItem = await CartItem.findOne({
    where: { cart_item_id, cart_id: cart.cart_id },
  });
  if (!cartItem) throw new Error("e-cart-2");

  await cartItem.destroy(); // Hard delete for cart items is fine, or update it
  return { rid: "s-cart-4", data: null };
};

module.exports = {
  getActiveCartByUserId,
  addItemToCart,
  updateCartItem,
  removeCartItem,
};

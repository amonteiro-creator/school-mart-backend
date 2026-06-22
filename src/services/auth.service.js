const { User, UserToken } = require("../models");
const { hash, compare } = require("../helpers/bcrypt.helper");
const { sign } = require("../helpers/jwt.helper");
const { ROLES } = require("../constants");

const registerUser = async (name, email, password) => {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("e-auth-1"); // Email already exists
  }

  const hashedPassword = await hash(password);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: ROLES.PARENT, // Default to PARENT for public registration
  });

  return {
    rid: "s-auth-1",
    data: {
      user_id: user.user_id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email, is_archive: false } });
  if (!user) {
    throw new Error("e-auth-2"); // Invalid credentials
  }

  const isMatch = await compare(password, user.password);
  if (!isMatch) {
    throw new Error("e-auth-2"); // Invalid credentials
  }

  const token = sign({ user_id: user.user_id, role: user.role });

  // Calculate expiry date (matched with jwt_expiry)
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 8); // Assuming 8h

  await UserToken.create({
    user_id: user.user_id,
    token,
    expires_at: expiresAt,
  });

  return {
    rid: "s-auth-2",
    data: {
      token,
      user: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    },
  };
};

module.exports = {
  registerUser,
  loginUser,
};

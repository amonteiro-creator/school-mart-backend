"use strict";
const bcrypt = require("bcryptjs");
const { randomUUID } = require("crypto");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("Admin@1234", 10);
    await queryInterface.bulkInsert(
      "users",
      [
        {
          user_id: randomUUID(),
          name: "Admin User",
          email: "admin@schoolmart.com",
          password: hashedPassword,
          role: "ADMIN",
          is_archive: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      "users",
      { email: "admin@schoolmart.com" },
      {},
    );
  },
};

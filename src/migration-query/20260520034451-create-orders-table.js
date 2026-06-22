"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("orders", {
      order_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        primaryKey: true,
      },
      school_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "schools",
          key: "school_id",
        },
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      status: {
        type: Sequelize.ENUM(
          "PENDING",
          "CONFIRMED",
          "SHIPPED",
          "DELIVERED",
          "CANCELLED",
        ),
        allowNull: false,
      },
      payment_status: {
        type: Sequelize.ENUM("PENDING", "SUCCESS", "FAILED"),
        allowNull: false,
      },
      payment_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      total_amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      is_archive: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    await queryInterface.addIndex("orders", ["user_id"]);
    await queryInterface.addIndex("orders", ["status"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("orders");
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_orders_status";',
    );
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_orders_payment_status";',
    );
  },
};

"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("uniforms", {
      uniform_id: {
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
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      sizes: {
        type: Sequelize.JSON,
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

    await queryInterface.addIndex("uniforms", ["school_id"]);
    await queryInterface.addIndex("uniforms", ["category"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("uniforms");
  },
};

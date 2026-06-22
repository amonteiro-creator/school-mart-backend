const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class UserToken extends Model {
    static associate(models) {
      UserToken.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }

  UserToken.init(
    {
      token_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      token: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      expires_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "UserToken",
      tableName: "user_tokens",
      underscored: true,
      updatedAt: false,
    },
  );

  return UserToken;
};

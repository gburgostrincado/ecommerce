export default (sequelize, DataTypes) => {
  const Refund = sequelize.define('Refund', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'refunds',
    timestamps: true
  });

  Refund.associate = (models) => {
    Refund.belongsTo(models.Order, { foreignKey: 'orderId' });
    Refund.hasMany(models.RefundDetail, { foreignKey: 'refundId' });
    Refund.hasMany(models.RefundDetail, { foreignKey: 'refundId' });
  }

  return Refund;
}
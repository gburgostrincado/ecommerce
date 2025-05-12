export default (sequelize, DataTypes) => {
  const RefundDetail = sequelize.define('RefundDetail', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    refundId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    orderDetailId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'refund_details',
    timestamps: true
  });

  RefundDetail.associate = (models) => {
    RefundDetail.belongsTo(models.Refund, { foreignKey: 'refundId' });
    RefundDetail.belongsTo(models.OrderDetail, { foreignKey: 'orderDetailId' });
  };

  return RefundDetail;
}
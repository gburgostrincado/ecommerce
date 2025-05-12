export default (sequelize, DataTypes) => {
  const OrderDetail = sequelize.define('OrderDetail', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productId: {
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
    tableName: 'order_details',
    timestamps: true
  });
  OrderDetail.associate = (models) => {
    OrderDetail.belongsTo(models.Order, { foreignKey: 'orderId' });
    OrderDetail.belongsTo(models.Product, { foreignKey: 'productId' });
    OrderDetail.hasMany(models.RefundDetail, { foreignKey: 'orderDetailId' });
  };
  return OrderDetail;
}
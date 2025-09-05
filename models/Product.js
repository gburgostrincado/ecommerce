export default (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      get() {
        const rawValue = this.getDataValue('imageUrl');
        return rawValue && rawValue.trim() !== ''
          ? rawValue
          : 'https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg';
      },
      set(value) {
        // Si es un string vacío o undefined/null, guardamos null en DB
        if (!value || value.trim() === '') {
          this.setDataValue('imageUrl', null);
        } else {
          this.setDataValue('imageUrl', value);
        }
      }
    }
  }, {
    tableName: 'products',
    timestamps: true
  });

  return Product;
}
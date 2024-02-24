// models/orderItemModel.js
module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define('OrderItem', {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false
      }
      // You might add additional fields, like individual product total
    });
  
    return OrderItem;
  };
  
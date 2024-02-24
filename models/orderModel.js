// models/orderModel.js
module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
      // Additional fields like status, payment details can be added here
      status: {
        type: DataTypes.STRING,
        defaultValue: 'pending' // e.g., 'pending', 'completed', 'shipped'
      },
      total: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0.00
      }
      // Consider adding timestamps or user references if needed
    });
  
    return Order;
  };
  
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define("Cart", {}, { timestamps: true });
  return Cart;
};

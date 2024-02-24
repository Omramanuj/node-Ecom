const db = require('../database/index');
const sequelize = db.sequelize;

exports.placeOrder = async (req, res) => {
    const userId = req.user.id;
  
    // Transaction ensures atomicity
    const result = await sequelize.transaction(async (t) => {
      const cart = await db.cart.findOne({ where: { userId }, include: 'products' });
      
      // Create the order
      const order = await db.orders.create({ userId, status: 'pending' }, { transaction: t });
  
      // Add products from cart to order
      for (let product of cart.products) {
        await db.orderItems.create({
          orderId: order.id,
          productId: product.id,
          quantity: 1, // Adjust based on your cart model
          price: product.price
        }, { transaction: t });
      }
  
      // Clear the cart
      await cart.setProducts([], { transaction: t });
  
      return order;
    });
  
    res.status(201).json(result);
  };
  
  exports.orderHistory = async (req, res) => {
    const userId = req.user.id;
    const orders = await db.orders.findAll({ where: { userId }, include: 'orderItems' });
    res.json(orders);
  };

  exports.orderDetails = async (req, res) => {
    const orderId = req.params.orderId;
    const order = await db.orders.findOne({ where: { id: orderId }, include: 'orderItems' });
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }
    res.json(order);
  };
  
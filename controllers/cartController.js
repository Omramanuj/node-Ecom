const db= require('../database/index');
const Cart = db.cart;

exports.addToCart = async (req, res, next) => {
    try {
        const userId = req.user.id; 
        const productId = req.params.productId; // The product ID to add
  
        // Find the user's cart or create one if it doesn't exist
        let cart = await Cart.findOne({ where: { userId } });
        if (!cart) {
            cart = await Cart.create({ userId });
        }
  
        // Check if the product is already in the cart
        const products = await cart.getProducts({
            where: { id: productId }
        });
  
        if (products.length === 0) {
            // If the product is not in the cart, add it
            await cart.addProduct(productId);
            res.status(201).send({ message: "Product added to cart." });
        } else {
            // Product is already in the cart
            res.status(409).send({ message: "Product is already in the cart." });
        }
    } catch (error) {
        next(error); // Pass any errors to the error middleware
    }
};

exports.viewCart = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const cart = await Cart.findOne({
            where: { userId },
            include: [{
                model: db.products,
                as: 'products',
                through: { attributes: [] }
            }]
        });
  
        if (!cart) {
            return res.status(404).send({ message: "Cart not found." });
        }
  
        res.status(200).json(cart.products);
    } catch (error) {
        next(error); // Pass any errors to the error middleware
    }
};

exports.removeFromCart = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const productId = req.params.productId;
  
        const cart = await Cart.findOne({ where: { userId } });
        if (!cart) {
            return res.status(404).send({ message: "Cart not found." });
        }
  
     
        await cart.removeProduct(productId);
        res.status(200).send({ message: "Product removed from cart." });
    } catch (error) {
        next(error); 
    }
};

const db = require('../database/index'); // Update this path according to your project structure
const Product = db.products;

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).send({
            message: "Error retrieving products: " + error.message
        });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { name, price, description, imageUrl,categoryId } = req.body;
        const newProduct = await Product.create({
            name,
            price,
            description,
            imageUrl,
            categoryId
        });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).send({
            message: "Error creating product: " + error.message
        });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const { name, price, description, imageUrl } = req.body;

        const updated = await Product.update({
            name,
            price,
            description,
            imageUrl
        }, {
            where: { id: productId }
        });

        if (updated) {
            const updatedProduct = await Product.findByPk(productId);
            res.status(200).json(updatedProduct);
        } else {
            res.status(404).send({
                message: `Cannot find product with id=${productId}.`
            });
        }
    } catch (error) {
        res.status(500).send({
            message: "Error updating product: " + error.message
        });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const deleted = await Product.destroy({
            where: { id: productId }
        });

        if (deleted) {
            res.status(200).send({
                message: "Product was deleted successfully."
            });
        } else {
            res.status(404).send({
                message: `Cannot delete product with id=${productId}. Maybe product was not found.`
            });
        }
    } catch (error) {
        res.status(500).send({
            message: "Could not delete product: " + error.message
        });
    }
};

exports.findProductsByCategory = async (req, res) => {
    try {
      const { categoryName } = req.params; 
      const category = await db.Category.findOne({
        where: { name: categoryName },
        include: [{
          model: db.products,
          as: 'products'
        }]
      });
  
      if (!category) {
        return res.status(404).send({ message: 'Category not found' });
      }
  
      res.status(200).json(category.products);
    } catch (error) {
      res.status(500).send({ message: 'Error fetching products by category' });
    }
  };
  
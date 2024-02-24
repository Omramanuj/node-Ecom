const db = require('../database/index');
const Category = db.Category;

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).send({ message: "Error creating category" });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).send({ message: "Error fetching categories" });
  }
};

exports.updateCategory = async (req, res) => {
    try {
      const { categoryId } = req.params;
      const { name, description } = req.body;
  
      const category = await Category.findByPk(categoryId);
      if (!category) {
        return res.status(404).send({ message: "Category not found." });
      }
  
      await category.update({ name, description });
      res.status(200).json(category);
    } catch (error) {
      res.status(500).send({ message: "Error updating category" });
    }
  };

  
  exports.deleteCategory = async (req, res) => {
    try {
      const { categoryId } = req.params;
      
      const deleteCount = await Category.destroy({
        where: { id: categoryId }
      });
  
      if (deleteCount === 0) {
        return res.status(404).send({ message: "Category not found." });
      }
  
      res.status(200).send({ message: "Category deleted successfully." });
    } catch (error) {
      res.status(500).send({ message: "Error deleting category" });
    }
  };
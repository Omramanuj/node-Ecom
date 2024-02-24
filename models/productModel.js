module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {

      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.DECIMAL(10, 2), // Adjust as needed for your pricing precision
        allowNull: false
      },
      categoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'categories', // Name of the table
          key: 'id',
        }, 
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true 
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true // Allowing null if an image is not required
      }
      // You can add more attributes as needed
    }, {
      // Model options go here
      tableName: 'products', // Optional: specify table name if different from model name
      timestamps: true // Adds createdAt and updatedAt timestamps
    });
  
    return Product;
  };
  
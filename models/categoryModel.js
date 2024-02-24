module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
      // Define model attributes
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true // Assuming category names should be unique
      }

    }, {
      tableName: 'categories', // Optional: specify table name if different from model name
      timestamps: true // Adds createdAt and updatedAt timestamps
    });
  
    return Category;
  };
  
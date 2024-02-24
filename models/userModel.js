module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define( "user", {
      userName: {
          type: DataTypes.STRING,
          allowNull: false
      },
      email: {
          type: DataTypes.STRING,
          unique: true,
          isEmail: true, //checks for email format
          allowNull: false
      },
      password: {
          type: DataTypes.STRING,
          allowNull: false
      },
      role: {
        type: DataTypes.STRING, // Default role is 'user'
        allowNull: false
      }
  }, {timestamps: true}, )
  return User
}
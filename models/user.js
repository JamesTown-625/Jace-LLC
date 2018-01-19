module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // Giving the User model a name of type STRING
    firstName: {
      type: DataTypes.STRING,
      // allowNull: false,
      validate: {
        len: [1]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      // allowNull: false,
      validate: {
        len: [1]
      }
    },
    userId: {
      type: DataTypes.STRING,
      // allowNull: false,
      validate: {
        len: [5]
      }
    },
    email: {
      type: DataTypes.STRING,
      // allowNull: false,
      validate: {
        len: [8]
      }
    },
    password: {
      type: DataTypes.STRING,
      // allowNull: false,
      validate: {
        len: [8]
      }
    }
  });


  User.associate = function(models) {
    // Associating User with Gear
    // When an User is deleted, also delete any associated Gear
    User.hasMany(models.Gear, {
      onDelete: "cascade"
    });
  };

  return User;
};

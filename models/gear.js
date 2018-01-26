module.exports = function(sequelize, DataTypes) {
  var Gear = sequelize.define("Gear", {
    title: {
      type: DataTypes.STRING,
      // allowNull: false,
      validate: {
        len: [1]
      }
    },
    category: {
      type: DataTypes.STRING,
      // allowNull: false,
      validate: {
        len: [1]
      }  
    },
    description: {
      type: DataTypes.STRING,
      // allowNull: false,
      // validate: {
      //   len: [10, 200]
      // }
    },
    price: {
      type: DataTypes.DECIMAL(13,2),
      // allowNull: false,
      validate:{
        len: [1]
      } 
    },
    picture: {
      type: DataTypes.STRING,
      // allowNull: false,
      validate: {
        len: [1]
      }
    },
    location: {
      type: DataTypes.STRING,
      // allowNull: false,
      validate: {
        len: [1]
      }
    },
    time: {
      type: DataTypes.STRING,
      // allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Gear.associate = function(models) {
    // We're saying that Gear should belong to a User
    // A Gear can't be created without an User due to the foreign key constraint
    Gear.belongsTo(models.User, {
      foreignKey: {
        allowNull: true
      }
    });
  };

  return Gear;
};


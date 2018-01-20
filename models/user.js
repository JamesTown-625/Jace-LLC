module.exports = function(sequelize, DataTypes){
  var User = sequelize.define("User", {
    
    routeName: DataTypes.STRING,
    
    user_id: DataTypes.INTEGER,
    
    first_name: DataTypes.STRING,
  
    last_name: DataTypes.STRING,
    
    email: DataTypes.STRING,
    
    phone: DataTypes.INTEGER,
  
    location: DataTypes.STRING,
    // userRating allows users the opportunity to rate working with each other.
    userRating: DataTypes.INTEGER,
  
    createdAt: DataTypes.DATE,
    
    updatedAt: DataTypes.DATE
  
  
  }, {
    timestamps: true
  });

  return User;
}
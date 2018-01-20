module.exports = function(sequelize, DataTypes){

// Creates a "User" model that matches up with DB

var Gear = sequelize.define("gear", {
 
  routeName: DataTypes.INTEGER,
  
  user_id: DataTypes.INTEGER,

  user_name: DataTypes.STRING,
  
  date_in: DataTypes.DATE,
  
  date_out: DataTypes.DATE,
  
  rented: DataTypes.BOOLEAN,

  price: DataTypes.INTEGER,

  category: DataTypes.STRING,

  description: DataTypes.STRING,
// allows rentee the opportunity to rate the quality or condition of the gear
  gearRating: DataTypes.INTEGER,

  createdAt: DataTypes.DATE,

  updatedAt: DataTypes.DATE


}, {
  timestamps: true
});
 return Gear;
}
//  Syncs with DB
//  Gear.sync();

// Makes the Character Model available for other files (will also create a table)
//  module.exports = Gear;
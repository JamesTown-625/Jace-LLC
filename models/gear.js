var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "User" model that matches up with DB
var Gear = sequelize.define("gear", {
 
  routeName: Sequelize.STRING,
  
  user_id: Sequelize.INTEGER,

  name: Sequelize.STRING,
  
  date_in: Sequelize.DATE,
  
  date_out: Sequelize.DATE,
  
  rented: Sequelize.BOOLEAN,

  price: Sequelize.INTEGER,

  category: Sequelize.STRING,

  description: Sequelize.STRING,
// allows rentee the opportunity to rate the quality or condition of the gear
  gearRating: Sequelize.INTEGER,

  createdAt: Sequelize.DATE,

  updatedAt: Sequelize.DATE


}, {
  timestamps: true;
});

// Syncs with DB
Gear.sync();

// Makes the Character Model available for other files (will also create a table)
module.exports = Gear;
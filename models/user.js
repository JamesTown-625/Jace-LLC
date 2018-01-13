var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "User" model that matches up with DB
var User = sequelize.define("user", {
  
  routeName: Sequelize.STRING,
  
  user_id: Sequelize.INTEGER,
  
  first_name: Sequelize.STRING,

  last_name: Sequelize.STRING,
  
  email: Sequelize.STRING,
  
  phone: Sequelize.INTEGER,

  location: Sequelize.STRING,
  // userRating allows users the opportunity to rate working with each other.
  userRating: Sequelize.INGTEGER,

  createdAt: Sequelize.DATE,
  
  updatedAt: Sequelize.DATE


}, {
  timestamps: true;
});

// Syncs with DB
User.sync();

// Makes the Character Model available for other files (will also create a table)
module.exports = User;
// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var User = require("../models/user.js");
var Gear = require("../models/gear.js");

// Routes
// =============================================================
module.exports = function(app) {
  // Search for Specific user (or all users) then provides JSON
  app.get("/api/:user?", function(req, res) {
    // If the user provides a specific user in the URL...
    if (req.params.user) {
      // Then display the JSON for ONLY that user.
      // (Note how we're using the ORM here to run our searches)
      User.findOne({
        where: {
          routeName: req.params.users
        }
      }).then(function(result) {
        return res.json(result);
      });
    }
    else {
      
      User.findAll({}).then(function(result) {
        return res.json(result);
      });
    }
  });

    app.post("/api/new", function(req, res) {
    // Take the request...
    var user = req.body;

    // Create a routeName for a user bio page ??******************************************************

    
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    var routeName = user.name.replace(/\s+/g, "").toLowerCase();
      // *********************************************************************************************


    // Then add the user to the database using sequelize
    User.create({
      routeName: routeName,
      user_id: user.user_id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
      location: user.location,
      userRating: user.userRating

    });
  });

module.exports = function(app) {
  // Search for Specific user (or all users) then provides JSON
  app.get("/api/:gear?", function(req, res) {
    // If the user provides a specific user in the URL...
    if (req.params.gear) {
      // Then display the JSON for ONLY that user.
      // (Note how we're using the ORM here to run our searches)
      User.findOne({
        where: {
          routeName: req.params.users
        }
      }).then(function(result) {
        return res.json(result);
      });
    }
    else {
      
      User.findAll({}).then(function(result) {
        return res.json(result);
      });
    }
  });
  
  app.post("/api/new", function(req, res) {
    // Take the request...
    var gear = req.body;

    // Create a routeName for a user bio page ??******************************************************

    
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    var routeName = gear.name.replace(/\s+/g, "").toLowerCase();
      // *********************************************************************************************

      
    // Then add the user to the database using sequelize
    Gear.create({
      routeName: routeName,
      user_id: user.user_id,
      name: gear.name,
      date_in: gear.date_in,
      date_out: gear.date_out,
      rented: gear.rented,
      price: gear.price,
      category:gear.category,
      description: gear.description,
      gearRating: gear.gearRating

    });
  });

};
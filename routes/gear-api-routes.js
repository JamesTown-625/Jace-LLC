// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the gear
  app.get("/api/gear", function(req, res) {
    var query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.User
    db.Gear.findAll({
      where: query,
      include: [db.User]
    }).then(function(dbGear) {
      res.json(dbGear);
    });
  });

  // Get rotue for retrieving a single gear
  app.get("/api/gear/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.User
    db.Gear.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function(dbGear) {
      res.json(dbGear);
    });
  });

  // POST route for saving a new gear
  app.post("/api/gear", function(req, res) {
   console.log(req.body);
   db.Gear.create({
     title: req.body.title,
     category: req.body.category,
     description: req.body.description,
     price: req.body.price,
     picture: req.body.picture,
     location: req.body.location,
     time: req.body.time,
     UserId: req.body.userId,
   })
   .then(function(dbPost) {
     res.json(dbPost);
   });
 });

  // DELETE route for deleting gear
  app.delete("/api/gear/:id", function(req, res) {
    db.Gear.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbGear) {
      res.json(dbGear);
    });
  });

  // PUT route for updating gear
  app.put("/api/gear", function(req, res) {
    db.Gear.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbGear) {
        res.json(dbGear);
      });
  });
};

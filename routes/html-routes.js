// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

  //  add gear route loads addGear.html
  app.get("/add", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/addGear.html"));
  });

  // blog route loads gear.html
  app.get("/gear", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/gear.html"));
  });

  // authors route loads user-manager.html
  app.get("/users", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/user-manager.html"));
  });
  
  app.get("/payment", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/stripePayment.html"));
  });

};

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

  // root route loads home.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/home.html"));
  });

  //  add gear route loads addGear.html
  app.get("/add", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/addGear.html"));
  });

  // gear route loads gear.html
  app.get("/gear", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/gear.html"));
  });

  // users route loads user-manager.html
  app.get("/users", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/user-manager.html"));
  });

  // signin route loads user.html
  app.get("/create", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/user.html"));
  });
  
  app.get("/payment", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/html/stripePayment.html"));
  });

};

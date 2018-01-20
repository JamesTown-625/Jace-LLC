var path = require("path");


// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads home.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/home.html"));
  });

// Add new user to the database
  app.get("/add", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/addUser.html"));
  });

  // all route loads the all.html page,
  // where all gear list in the db are displayed
  app.get("/all", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/gear.html"));
  });

};
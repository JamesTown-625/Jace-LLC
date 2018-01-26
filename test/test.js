var Nightmare = require("nightmare");

var nightmare = Nightmare({ show: true });

nightmare
 .goto("https://jace-llc.herokuapp.com/add")
 .type("#title", "pugs")
 .type("#category", "Winter")
 .type("#price", "1")
 .type("#time", "May")
 .type("#picture", "1234")
 .type("#description", "will this work?")
 .type("#userId", "testit")
 .click("#submit-btn")
 .wait("#links a")
 .evaluate(function() {
   return document.querySelector("#links a").href;
 })
 
 .then(function(result) {
   console.log(result);
 })
 .catch(function(error) {
   console.error("Search failed:", error);
 });
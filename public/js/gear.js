$(document).ready(function() {
  /* global moment */

  // gearContainer holds all of our gear
  var gearContainer = $(".gear-container");
  var gearCategorySelect = $("#category");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handleGearDelete);
  $(document).on("click", "button.edit", handleGearEdit);
  // Variable to hold our gear
  var gear;

  // The code below handles the case where we want to get gear listings for a specific user
  // Looks for a query param in the url for user_id
  var url = window.location.search;
  var userId;
  if (url.indexOf("?user_id=") !== -1) {
    userId = url.split("=")[1];
    getGear(userId);
  }
  // If there's no userId we just get all gear as usual
  else {
    getGear();
  }


  // This function grabs gear from the database and updates the view
  function getGear(user) {
    userId = user || "";
    if (userId) {
      userId = "/?user_id=" + userId;
    }
    $.get("/api/gear" + userId, function(data) {
      console.log("gear", data);
      gear = data;
      if (!gear || !gear.length) {
        displayEmpty(user);
      }
      else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete gear
  function deleteGear(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/gear/" + id
    })
    .then(function() {
      getGear(gearCategorySelect.val());
    });
  }

  // InitializeRows handles appending all of our constructed gear HTML inside gearContainer
  function initializeRows() {
    gearContainer.empty();
    var gearToAdd = [];
    for (var i = 0; i < gear.length; i++) {
      gearToAdd.push(createNewRow(gear[i]));
    }
    gearContainer.append(gearToAdd);
  }

  // This function constructs a gear's HTML
  function createNewRow(gear) {
    console.log("New gear created: ");
    console.log(gear);
    var formattedDate = new Date(gear.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    var newGearPanel = $("<div>");
    newGearPanel.addClass("panel panel-default");
    var newGearPanelHeading = $("<div>");
    newGearPanelHeading.addClass("panel-heading");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-info");
    var newGearTitle = $("<h2>");
    var newGearDate = $("<small>");
    var newGearUser = $("<h5>");
    newGearUser.text("Rented by: " + gear.id);
    newGearUser.css({
      float: "right",
      color: "blue",
      "margin-top":
      "-10px"
    });
    var newGearPanelDescription = $("<div>");
    newGearPanelDescription.addClass("panel-body");
    var newGearPanelDescription = $("<p>");
    newGearTitle.text(gear.title + " ");
    newGearBody.text(gear.description);
    newGearDate.text(formattedDate);
    newGearTitle.append(newGearDate);
    newGearPanelHeading.append(deleteBtn);
    newGearPanelHeading.append(editBtn);
    newGearPanelHeading.append(newGearTitle);
    newGearPanelHeading.append(newGearUser);
    newGearPanelBody.append(newGearDescription);
    newGearPanel.append(newGearPanelHeading);
    newGearPanel.append(newGearPanelBody);
    newGearPanel.data("gear", gear);
    return newGearPanel;
  }

  // This function figures out which gear we want to delete and then calls deleteGear
  function handleGearDelete() {
    var currentGear = $(this)
      .parent()
      .parent()
      .data("gear");
    deleteGear(currentGear.id);
  }

  // This function figures out which gear we want to edit and takes it to the appropriate url
  function handleGearEdit() {
    var currentGear = $(this)
      .parent()
      .parent()
      .data("gear");
    window.location.href = "/cms?gear_id=" + currentGear.id;
  }

  // This function displays a message when there is no gear
  function displayEmpty(id) {
    var query = window.location.search;
    var partial = "";
    if (id) {
      partial = " for User #" + id;
    }
    gearContainer.empty();
    var messageh2 = $("<h2>");
    messageh2.css({ "text-align": "center", "margin-top": "50px" });
    messageh2.html("You haven't added any gear yet" + partial + ", navigate <a href='/cms" + query +
    "'>here</a> in order to get started.");
    gearContainer.append(messageh2);
  }

});

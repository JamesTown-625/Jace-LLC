$(document).ready(function() {
	
	var firstName = $('#firstName'); 
	var lastName = $('#lastName');
	var userSelect = $('#userName');
	var email = $('#userEmail');
	var password = $('#userPassword');
	var userForm = $('#createUser');

	// Adding an event listener for when the form is submitted
  $(userForm).on("submit", handleFormSubmit);
  // Gets the part of the url that comes after the "?" (which we have if we're updating a gear)
  var url = window.location.search;
  console.log(url);
  var gearId;
  var userId;
  // Sets a flag for whether or not we're updating a gear to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the gear id from the url
  // In '?gear_id=1', gearId is 1
  if (url.indexOf("?user_id=") !== -1) {
    userId = url.split("=")[1];
    getGearData(userId, "user");
  }
  // Otherwise if we have an user_id in our url, preset the user select box to be our user
  else if (url.indexOf("?user_id=") !== -1) {
    userId = url.split("=")[1];
  }

  // Getting the users, and their gear
  getUsers();

  // A function for handling what happens when the form to create a new gear is submitted
  function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the gear if we are missing a description, title, price, category, time, location, pictures, 
    if (!firstName.val().trim() || !lastName.val().trim() || !userSelect.val().trim() || !email.val().trim() || !password.val().trim() || !userSelect.val()) {
      return;
    }
    // Constructing a newGear object to hand to the database
    var newUser = {
      firstName: firstName
        .val()
        .trim(),
      lastName: lastName
        .val()
        .trim(),
      email: email
      	.val()
      	.trim(),
      password: password
      	.val()
      	.trim(),
      userId: userSelect.val()
    };

    console.log(newUser);

    // If we're updating gear run updateGear to update gear
    // Otherwise run submitGear to create a whole new gear posting
    if (updating) {
      console.log("This is the newGear and gearId: ")
      console.log(newGear);
      console.log(gearId);

      newGear.id = userId;
      updateGear(newUser);
    }
    else {
      console.log("This is the newUser and userId: ")
      console.log(newUser);
      console.log(userId);
       console.log("userID")
      console.log(userId)
      submitUser(newUser);

    }
  }

  // Submits a new user and brings user to home page upon completion
  function submitUser(user) {
  	console.log("This is what I'm looking for");
    console.log(user);
    $.post("/api/users", user, function() {
      window.location.href = "/";
    });
  }

  // Gets posted gear data for the current gear if we're editing, or if we're adding to an user's existing gear
  function getGearData(id, type) {
    var queryUrl;
    switch (type) {
      case "gear":
        queryUrl = "/api/gear/" + id;
        break;
      case "user":
        queryUrl = "/api/user/" + id;
        break;
      default:
        return;
    }

    $.get(queryUrl, function(data) {
      if (data) {
        console.log(data.userId || data.id);
        // If this gear exists, prefill our cms forms with its data
        firstName.val(data.firstName);
        lastName.val(data.lastName);
        userSelect.val(data.userSelect);
        email.val(data.email);
        password.val(data.password);
        userId = data.userId || data.id;
        // If we have gear with this id, set a flag for us to know to update the posted gear
        // when we hit submit
        updating = true;
      }
    });
  }


  // A function to get Users and then render our list of Users
  function getUsers() {
    $.get("/api/users", renderUserList);
  }
  // Function to either render a list of users, or if there are none, direct the user to the page
  // to create an user first
  function renderUserList(data) {
    if (!data.length) {
      window.location.href = "/users";
    }
    $(".hidden").removeClass("hidden");
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createUserRow(data[i]));
    }
    userSelect.empty();
    console.log(rowsToAdd);
    console.log(userSelect);
    userSelect.append(rowsToAdd);
    userSelect.val(userId);
  }

  // Creates the user options in the dropdown
  function createUserRow(user) {
    var listOption = $("<option>");
    listOption.attr("value", user.id);
    listOption.text(user.userId);
    return listOption;
  }

  // Update a given posted gear, bring user to the gear page when done
  function updateGear(gear) {
    $.ajax({
      method: "PUT",
      url: "/api/gear",
      data: gear
    })
    .then(function() {
      window.location.href = "/gear";
    });
  }

});
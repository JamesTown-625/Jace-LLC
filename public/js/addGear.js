$(document).ready(function() {
  // Getting jQuery references to the gear title, category, price, time, location, picture, description, form, and user select
  var titleInput = $("#title");
  var categoryInput = $("#category");
  var priceInput = $("#price");
  var timeInput = $("#time");
  var locationInput = $("#location");
  var pictureInput = $("#picture");
  var descriptionInput = $("#description");
  var gearForm = $("#addGear");
  var userSelect = $("#userId");
  
// ============== CLOUDINARY CODE BELOW =============================
  var CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/jace-llc/upload'
  var CLOUDINARY_UPLOAD_PRESET = 'eyxxnu6l';
  var imgPreview = document.getElementById('img-preview')
  var fileUpload = document.getElementById('file-upload');
  var imgURL;

    function updateURL() {
      $("#picture").val(imgURL);
      console.log("Done!")
    };

  fileUpload.addEventListener('change', function() {
      //console.log(event);
      var file = event.target.files[0];
      var formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
 
      axios({
          url: CLOUDINARY_URL,
          method: "POST",
          headers: {
             'Content-Type': 'application/x-www-form-urlencoded'
          },
          data: formData
             
          }).then(function(res){
             console.log(res);
             //console.log(res.data.secure_url)
           imgURL = res.data.secure_url
             console.log(imgURL)
             updateURL();
             
          }).catch(function(err){
             console.error(err);
          });
         
      });
// ====================== CLOUDINARY CODE ABOVE ========================

  // Adding an event listener for when the form is submitted
  $(gearForm).on("submit", handleFormSubmit);
  // Gets the part of the url that comes after the "?" (which we have if we're updating a gear)
  var url = window.location.search;
  // console.log(url);
  var gearId;
  var userId;
  // Sets a flag for whether or not we're updating a gear to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the gear id from the url
  // In '?gear_id=1', gearId is 1
  if (url.indexOf("?gear_id=") !== -1) {
    gearId = url.split("=")[1];
    getGearData(gearId, "gear");
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
    if (!titleInput.val().trim() || !categoryInput.val().trim() || !priceInput.val().trim() || !timeInput.val().trim() || !locationInput.val().trim() || !pictureInput.val().trim() || !descriptionInput.val().trim() || !userSelect.val()) {
      return;
    }
    // Constructing a newGear object to hand to the database
    var newGear = {
      title: titleInput
        .val()
        .trim(),
      category: categoryInput
        .val()
        .trim(),
      price: priceInput
        .val()
        .trim(),
      time: timeInput
        .val()
        .trim(),
      location: locationInput
        .val()
        .trim(),
      picture: pictureInput
        .val()
        .trim(),
      description: descriptionInput
        .val()
        .trim(),
      userId: userSelect.val()
    };

    // If we're updating gear run updateGear to update gear
    // Otherwise run submitGear to create a whole new gear posting
    if (updating) {
      console.log("This is the newGear and gearId: ")
      console.log(newGear);
      console.log(gearId);

      newGear.id = userId;
      updateGear(newGear);
    }
    else {
      console.log("This is the newGear and gearId: ")
      console.log(newGear);
      console.log(gearId);
       console.log("userID")
      console.log(userId)
      submitGear(newGear);

    }
  }

  // Submits a new gear post and brings user to home page upon completion
  function submitGear(gear) {
    console.log(gear);
    $.post("/api/gear", gear, function() {
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
        // If this gear exists, prefill our gear forms with its data
        titleInput.val(data.title);
        categoryInput.val(data.category);
        priceInput.val(data.price);
        timeInput.val(data.time);
        locationInput.val(data.location);
        pictureInput.val(data.picture);
        descriptionInput.val(data.description);
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

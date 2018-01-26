function getGear() {
	$.get("/api/gear").then(function(data) {
		for (var i = 0; i < data.length; i++) {
			// console.log(data[i]);
			renderGear(data[i]);
		}
	});
};

function renderGear(data) {
	// console.log(data);
	var newCol = $('<div class="col-md-4 col-sm-6 thumbnail"></div>');
	var gearTitle = $('<h3 id="title">' + data.title + '</h3>');
	var gearPic = $('<img class="img-responsive center-block caption" src="' + data.picture + '"></img>');
	// var gearDes = $('<p id="description">' + data.description + '</p>');
	var gearLoc	= $('<p id="location">' + data.location + '</p>');
	var gearPrice = $('<h4 id="price">   $ ' + data.price + '</h4>');
	// var moreInfo = $('<button onclick="document.getElementById("id02").style.display="block"" id="moreInfoButton" class="btn btn-primary">More Info</button>');
	var addToCart = $('<a href="/payment" class="btn btn-primary disabled cart" role="button">Add to Cart</a>');
	newCol.append(gearTitle, gearPic, gearLoc, gearPrice, addToCart);
	$('#newGear').append(newCol);
};

getGear();

    // $("#category").on("click", function(snapshot){
    //     $('#sel1').text(snapshot.val().option);
    //   var newThumbnail = $('<div>');
    //   newRow.append(newThumbnail);
    //    $('#gear').append(newRow);
    //  }, function(errorObject) {
    //   console.log("The read failed: " + errorObject.code);
    // });
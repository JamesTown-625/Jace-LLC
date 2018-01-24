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
	var newCol = $('<div class="col-md-4 col-sm-6 thumbnail"></div>')
	var gearPic = $('<img class="img-responsive center-block caption" src="' + data.picture + '"></img>');
	var gearTitle = $('<h1 id="title">' + data.title + '</h1>');
	var gearPrice = $('<p id="price">   $ ' + data.price + '</p>');
	var moreInfo = $('<button onclick="document.getElementById("id02").style.display="block"" id="moreInfoButton" class="btn btn-primary">More Info</button>');
	var addToCart = $('<a href="/payment" class="btn btn-primary" role="button">Add to Cart</a>');
	newCol.append(gearPic, gearTitle, gearPrice, moreInfo, addToCart);
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
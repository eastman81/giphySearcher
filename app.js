var topics = ["dogs", "cats", "bats", "bears", "cars", "football", "basketball", "futurama", "dancing", "batman"];

function displayGifs() {

	// Get the gifs
	var topic = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=d77361223e3b4c39983e2eff1043af04&rating=pg&limit=10";

	    $.ajax({
	      url: queryURL,
	      method: 'GET'
	    }).done(function(response) {
	      console.log(response);

	      $("#gif-view").empty();

	      for (var i = 0; i < 10; i++) {
	      	// Creating a div to hold the gif
	        var gifDiv = $("<div class='gif col-md-3'>");

	        // Storing the rating data
	        var rating = response.data[i].rating;

	        // Creating an element to have the rating displayed
	        var pOne = $("<p>").text("Rating: " + rating);

	        // Displaying the rating
	        gifDiv.append(pOne);

	        // Retrieving the URL for the animated gif
	        var animatedGif = response.data[i].images.fixed_width.url;

	        // Still gif
	        var mainGif = response.data[i].images.fixed_width_still.url;
	        var stillGif = response.data[i].images.fixed_width_still.url;

	        // Creating an element to hold the gif
	        var gif = $("<img>").attr("src", mainGif);
	        gif.attr("data-still", stillGif);
	        gif.attr("data-animate", animatedGif);
	        gif.attr("data-state", "still");
	        gif.addClass("imageState");
	        
	        // Appending the gif
	        gifDiv.append(gif);

	        $("#gif-view").append(gifDiv);
	      }

	      // Animate the gifs
	      $(".imageState").on("click", function() {
		      var state = $(this).attr("data-state");
		      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
		      // Then, set the image's data-state to animate
		      // Else set src to the data-still value
		      if (state === "still") {
		        $(this).attr("src", $(this).attr("data-animate"));
		        $(this).attr("data-state", "animate");
		      } else {
		        $(this).attr("src", $(this).attr("data-still"));
		        $(this).attr("data-state", "still");
		      }
		  });
        });
}

// Function for displaying topics
function renderButtons() {

	$("#viewTopics").empty();

	for (var i = 0; i < topics.length; i++) {
		var topicsTag = $("<button>");
		topicsTag.addClass("topic");
		topicsTag.attr("data-name", topics[i]);
		topicsTag.text(topics[i]);
		$("#viewTopics").append(topicsTag);
	}
}

// This function handles events where a topic button is clicked
$("#add-gif").on("click", function(event) {
	event.preventDefault();

	// This line grabs the input from the textbox
	var topic = $("#gif-input").val().trim();
	topics.push(topic);
	$("#gif-input").val("");
	renderButtons();
});

// Adding a click event listener to all elements with a class of "topic"
$(document).on("click", ".topic", displayGifs);

// Calling the renderButtons function to display the intial buttons
renderButtons();

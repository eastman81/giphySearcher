var topics = ["dogs", "cats", "bats", "bears", "cars", "football", "basketball", "futurama", "dancing", "batman"];

function displayGifs() {

	// Get the gifs
	var topic = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&rating=pg&limit=10";

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

	        // Retrieving the URL for the gif
	        var gifURL = response.data[i].images.fixed_width.url;

	        // Creating an element to hold the gif
	        var gif = $("<img>").attr("src", gifURL);

	        // Appending the gif
	        gifDiv.append(gif);

	        // Putting the entire movie above the previous movies
	        $("#gif-view").prepend(gifDiv);
	      }

	      	// $("#gif-view").addClass("col-md-12");
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
	renderButtons();
});

// Adding a click event listener to all elements with a class of "topic"
$(document).on("click", ".topic", displayGifs);

// Calling the renderButtons function to display the intial buttons
renderButtons();

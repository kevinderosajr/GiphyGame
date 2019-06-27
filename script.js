const movies = ["Cat", "Dog", "Horse", "Cow"];


$("button").on("click", function() {
    const movie = $(this).attr("data-person");
    const queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      movie + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        const results = response.data;

        for (let i = 0; i < results.length; i++) {
          const gifDiv = $("<div>");

          const rating = results[i].rating;

          const p = $("<p>").text("Rating: " + rating);

          const personImage = $("<img>");
          personImage.attr("src", results[i].images.fixed_height.url);

         
          gifDiv.prepend(personImage);

          $("#gifs-appear-here").prepend(gifDiv);
        }
      });
  });

//_-

function renderButtons() {

$("#buttons").empty();

for (let i = 0; i < movies.length; i++) {

const a = $("<button>");
// Adding a class of movie to our button
a.addClass("movie");
// Adding a data-attribute
a.attr("data-name", movies[i]);
// Providing the initial button text
a.text(movies[i]);
// Adding the button to the buttons-view div
$("#buttons").append(a);
}
}

// This function handles events where one button is clicked
$("#add-movie").on("click", function(event) {
event.preventDefault();

// This line grabs the input from the textbox
let movie = $("#movie-input").val().trim();

// The movie from the textbox is then added to our array
movies.push(movie);

// Calling renderButtons which handles the processing of our movie array
renderButtons();

});

// Generic function for displaying the movieInfo
$(document).on("click", ".movie", displayMovieInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();
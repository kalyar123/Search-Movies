$(document).ready(function() {
    $("#searchInput").on("input", function() {
      const searchKeyword = $(this).val();
      fetchMovies(searchKeyword);
    });
  
    function fetchMovies(searchKeyword) {
      const apiKey = "ce74bfbe";
      const apiURL = `http://www.omdbapi.com/?s=${searchKeyword}&apikey=${apiKey}`;
  
      $.ajax({
        url: apiURL,
        type: "GET",
        dataType: "json",
        success: function(data) {
          console.log(data); 
          if (data.Response === "True") {
            const movieData = data.Search.map(movie => {
              return {
                title: movie.Title,
                releaseDate: movie.Year,
                poster: movie.Poster,
                imdbRating: movie.imdbRating,
              };
            });
            displayMovieData(movieData);
          } else if (data.Response === "False" && data.Error === "Too many results.") {
            displayTooManyResults();
          } else {
            displayNoResults();
          }
        },
        error: function() {
          displayError();
        },
      });
    }
  
    function displayMovieData(movieData) {
      const movieResultsDiv = $("#movieResults");
      movieResultsDiv.empty();
  
      movieData.forEach((movie, index) => {
        if (index < 10) {
          const movieDataDiv = $("<div></div>").addClass("movie-data");
          const posterImage = $("<img>").addClass("poster-image").attr("src", movie.poster);
          const movieInfoDiv = $("<div></div>");
          const movieTitle = $("<div></div>").addClass("movie-title").text(movie.title);
          const releaseDate = $("<div></div>").addClass("release-date").text(`Release Year: ${movie.releaseDate}`);
          const imdbRating = $("<div></div>").addClass("imdb-rating").text(`IMDb Rating: ${movie.imdbRating}`);
  
          movieInfoDiv.append(movieTitle, releaseDate, imdbRating);
          movieDataDiv.append(posterImage, movieInfoDiv);
          movieResultsDiv.append(movieDataDiv);
        }
      });
  
      movieResultsDiv.prepend("<h2>Search Results:</h2>");
    }
  
    function displayNoResults() {
      const movieResultsDiv = $("#movieResults");
      movieResultsDiv.html("<p>No results found.</p>");
    }
  
    function displayTooManyResults() {
      const movieResultsDiv = $("#movieResults");
      movieResultsDiv.html("<p>Too many results. Please refine your search.</p>");
    }
  
    function displayError() {
      const movieResultsDiv = $("#movieResults");
      movieResultsDiv.html("<p>An error occurred while fetching data.</p>");
    }
  });
  
// Get the query string into a JSON object
const queryObj = queryStringToJson(window.location.search);
const movieName = queryObj.query;

const idInput = document.getElementById("id-text");
const findButton = document.getElementById("find-button");

const movieDiv = document.getElementById("movies");

document.getElementById("search-text").placeholder = movieName;
if (movieName !== undefined && movieName !== "") {
    document.getElementById("movies-header").innerHTML = `Movies : ${movieName}`;
    document.title = `Movies : ${movieName}`;
}

if (movieName === "") {
    const movies = moviePopular()
        .then(result => {
            for (i in result.results) {
                createCard("movie", 200, result.results[i], movieDiv);
            }
        })
        .catch(error => console.log(error));
} else {
    movieSearch(movieName)
        .then(result => {
            for (i in result.results) {
                createCard("movie", 200, result.results[i], movieDiv);
            }
        })
        .catch(error => console.log(error));
}
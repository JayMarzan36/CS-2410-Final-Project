const queryObj = queryStringToJson(window.location.search);
const queryValue = queryObj.query;

const main = document.getElementById("main-content");
const trendingMovies = document.getElementById("trending-movies");
const trendingTv = document.getElementById("trending-tv");
const trendingPeople = document.getElementById("trending-people");

const navBtn = document.getElementById("menu-btn");

const trendingMovieHeader = document.getElementById("trending-movies-h");
const trendingTvHeader = document.getElementById("trending-tv-h");
const trendingPeopleHeader = document.getElementById("trending-people-h");

if (queryValue !== "" && queryValue !== undefined) {
    searchbyType = "all";
    searchValue = queryValue;
    docType = "index";
    search(false, 1);
} else {

    const movies = moviePopular()
        .then(result => {
            for (i in result.results) {
                createCard("movie", 200, result.results[i], trendingMovies);
            }
        })
        .catch(error => console.log(error));

    const people = peoplePopular()
        .then(result => {
            for (i in result.results) {
                createCard("people", 200, result.results[i], trendingPeople)
            }
        })
        .catch(error => console.log(error));

    const tv = tvPopular()
        .then(result => {
            for (i in result.results) {
                createCard("tv", 200, result.results[i], trendingTv);
            }
        })
        .catch(error => console.log(error));
}


// Navigate with a query string
function searchEventListeners(element) {
    element.addEventListener("click", e => {
        console.log(searchInput.value);
        e.preventDefault();
        window.location.href = `${element.href}?query=${searchInput.value}`;
    })
}




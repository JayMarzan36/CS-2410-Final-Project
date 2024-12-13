const apiKey = "you will have to get an api key";

// Base URL
const api = "https://api.themoviedb.org/3/";

// Image URL
// Read docs here to get full info: https://developer.themoviedb.org/docs/image-basics
const imgUrl = "https://image.tmdb.org/t/p/";


// Don't need to touch this
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
    }
};

// This is a generic API call that will customize based on the parameters
// The query needs to be a string that includes '&' to separate parameters
async function makeAPICall(urlExtension, query) {
    const newURL = `${api}${urlExtension}?api_key=${apiKey}&${query}`;
    const result = await fetch(newURL, options);
    return result.json();
}

// Function to get popular movies
async function moviePopular(page) {
    const pageNum = page || 1;
    const urlExtension = "movie/popular";
    const requiredQuery = `include_adult=false&language=en-US&page=${pageNum}`;

    return await makeAPICall(urlExtension, `${requiredQuery}`);
}

// Function to get popular people
async function peoplePopular(page) {
    const pageNum = page || 1;
    const urlExtension = "person/popular";
    const requiredQuery = `include_adult=false&language=en-US&page=${pageNum}`;

    return await makeAPICall(urlExtension, `${requiredQuery}`);
}

// Function to get trending tv shows
async function tvPopular(page) {
    const pageNum = page || 1;
    const urlExtension = "tv/popular";
    const requiredQuery = `include_adult=false&language=en-US&page=${pageNum}`;

    const res1 = await makeAPICall(urlExtension, `${requiredQuery}`);
    return res1;
}

// Function to get details for the specific movie
async function movieDetails(movieId) {
    const urlExtension = `movie/${movieId}`;
    const requiredQuery = "language=en-US";

    const res1 = await makeAPICall(urlExtension, `${requiredQuery}`);
    return res1;
}

// Function to get list of images for the movie
async function movieImages(movieId) {
    const urlExtension = `movie/${movieId}/images`;

    return await makeAPICall(urlExtension, "");
}

// Function for searching for movies
async function movieSearch(searchTerm, page) {
    const pageNum = page || 1;
    const urlExtension = "search/movie";
    const requiredQuery = `include_adult=false&language=en-US&page=${pageNum}`;
    const query = `query=${searchTerm}`;

    return await makeAPICall(urlExtension, `${requiredQuery}&${query}`);
}

// Function for searching for people
async function peopleSearch(searchTerm, page) {
    const pageNum = page || 1;
    const urlExtension = "search/person";
    const requiredQuery = `include_adult=false&language=en-US&page=${pageNum}`;
    const query = `query=${searchTerm}`;

    return await makeAPICall(urlExtension, `${requiredQuery}&${query}`);
}

// Function for searching for tv show
async function tvSearch(searchTerm, page) {
    const pageNum = page || 1;
    const urlExtension = "search/tv";
    const requiredQuery = `include_adult=false&language=en-US&page=${pageNum}`;
    const query = `query=${searchTerm}`;

    return await makeAPICall(urlExtension, `${requiredQuery}&${query}`);
}

// Function to get details for the specific person
async function personDetails(personId) {
    const urlExtension = `person/${personId}`;
    const requiredQuery = "language=en-US";

    return await makeAPICall(urlExtension, `${requiredQuery}`);
}

// Function to get list of images for a person
async function personImages(personId) {
    const urlExtension = `person/${personId}/images`;

    return await makeAPICall(urlExtension, "");
}

// Function to get details for the specific tv show
async function tvDetails(tvId) {
    const urlExtension = `tv/${tvId}`;
    const requiredQuery = "language=en-US";

    return await makeAPICall(urlExtension, `${requiredQuery}`);
}

// Function to get list of images for the movie
async function tvImages(seriesId) {
    const urlExtension = `tv/${seriesId}/images`;

    const res1 = await makeAPICall(urlExtension, "");
    return res1;
}

// Utility function to process a query string into a JSON object
function queryStringToJson(queryString) {
    // Remove the leading '?'
    if (queryString.startsWith("?")) {
        queryString = queryString.substring(1);
    }
    // Split the query string up into an array
    const pairs = queryString.split('&');

    // Reduce into an object of key value pairs
    const result = pairs.reduce((acc, pair) => {
        const queryPair = pair.split("=");
        acc[queryPair[0]] = queryPair[1];
        return acc;
    }, {});

    return result;
}

function createCard(type, imgWidth, object, parent) {
    const cardAnchor = document.createElement("a");
    const cardBase = document.createElement("div");
    const cardAnchorChild = document.createElement("div");
    const cardImg = document.createElement("img");
    const cardInfoHolder = document.createElement("div");
    const cardInfoName = document.createElement("div");
    const cardInfoRelease = document.createElement("div");
    const cardInfoRating = document.createElement("div");
    const anchorLabel = document.createElement("label");

    if (type === "movie") {
        cardAnchor.href =  `movie.html?id=${object.id}`;
        cardImg.src = `${imgUrl}w${imgWidth}${object.poster_path}`;
        cardInfoName.innerHTML = object.original_title;
        cardInfoRelease.innerHTML = `Release : ${object.release_date}`;
        cardInfoRating.innerHTML = `Rating : ${object.vote_average}`;
        cardBase.id = "movie";
    } else if (type === "tv") {
        cardAnchor.href =  `series.html?id=${object.id}`;
        cardImg.src = `${imgUrl}w${imgWidth}${object.poster_path}`;
        cardInfoName.innerHTML = object.original_name;
        cardInfoRelease.innerHTML = `Air Date : ${object.first_air_date}`;
        cardInfoRating.innerHTML = `Rating : ${object.vote_average}`;
        cardBase.id = "tv";
    } else if (type == "people") {
        cardAnchor.href =  `person.html?id=${object.id}`;
        cardImg.src = `${imgUrl}w${imgWidth}${object.profile_path}`;
        cardInfoName.innerHTML = object.original_name;
        cardInfoRelease.innerHTML = "";
        cardInfoRating.innerHTML = "";

        try {
            if (parent === castDiv) {
                const actorCharacter = document.createElement("div");
                actorCharacter.innerHTML = object.character;
                cardInfoHolder.appendChild(actorCharacter);
            }
        } catch {
            
        }
        



        cardBase.id = "people";
    }

    cardBase.className = "card";

    cardInfoHolder.appendChild(cardInfoName);
    cardInfoHolder.appendChild(cardInfoRelease);
    cardInfoHolder.appendChild(cardInfoRating);


    
    cardAnchorChild.appendChild(cardImg);
    cardAnchorChild.appendChild(cardInfoHolder);
    cardAnchor.appendChild(cardAnchorChild);
    
    



    cardBase.appendChild(cardAnchor);
    parent.appendChild(cardBase);
}
setTimeout(() => {
    const card = document.getElementsByClassName('card');
    for (i of card) {
        i.addEventListener("click", e => {
            e.preventDefault();
            console.log(e.target.offsetParent);
            e.target.offsetParent.dataset.click = true;
        setTimeout(() => {
            window.location.href = e.target.parentElement.parentElement.href;
        }, 1500);
        });
    }}, 1000);



const searchInput = document.getElementById("search-text");
const searchType = document.getElementById("search-type");
const searchBtn = document.getElementById("search-btn");

let searchbyType = "all";
let searchValue = null;
let currentPage = 2;
let docType = null;



searchType.addEventListener("change", e => {
    searchbyType = e.target.value;
});

searchInput.addEventListener("change", e => {
    searchValue = e.target.value;
});

searchInput.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        docType = null;
        search(false, 1);
    }
});

searchBtn.addEventListener("click", () => {
    docType = null;
    search(false, 1);
});


function search(update, page) {
    if (searchbyType !== null && searchValue !== null) {
        console.log(searchbyType);
        console.log(searchValue);

        if (searchbyType === "all") {

            if (docType !== "index") {
                window.location.href = `index.html?query=${searchValue}`;
            }

            if (!update) {
                trendingMovies.replaceChildren();
                trendingTv.replaceChildren();
                trendingPeople.replaceChildren();
            }

            trendingMovieHeader.innerHTML = `Movies : ${searchValue}`;
            trendingTvHeader.innerHTML = `Tv : ${searchValue}`;
            trendingPeopleHeader.innerHTML = `People : ${searchValue}`;

            const movieSearchResult = movieSearch(searchValue, page).then(result => {
                for (i in result.results) {
                    createCard("movie", 200, result.results[i], trendingMovies);
                }
            })
                .catch(error => console.log(error));

            const tvSearchResult = tvSearch(searchValue, page).then(result => {
                for (i in result.results) {
                    createCard("tv", 200, result.results[i], trendingTv);
                }
            })
                .catch(error => console.log(error));

            const peopleSearchResult = peopleSearch(searchValue, page).then(result => {
                for (i in result.results) {
                    createCard("people", 200, result.results[i], trendingPeople);
                }
            })
                .catch(error => console.log(error));

        } else if (docType === "movies") {

            if (!update) {
                trendingMovies.replaceChildren();
            } else if (searchValue === "") {
                const movies = moviePopular(page)
                    .then(result => {
                        for (i in result.results) {
                            createCard("movie", 200, result.results[i], movieDiv);
                        }
                    })
                    .catch(error => console.log(error));
            } else {
                const movieSearchResult = movieSearch(searchValue, page).then(result => {
                    for (i in result.results) {
                        createCard("movie", 200, result.results[i], movieDiv);
                    }
                })
                    .catch(error => console.log(error));
            }

        } else if (docType === "tv") {
            if (!update) {
                trendingTv.replaceChildren();
            } else if (searchValue === "") {
                const tv = tvPopular(page)
                .then(result => {
                    for (i in result.results) {
                        createCard("tv", 200, result.results[i], tvDiv);
                    }
                })
                .catch(error => console.log(error));
            } else {
                const tvSearchResult = tvSearch(searchValue, page).then(result => {
                    for (i in result.results) {
                        createCard("tv", 200, result.results[i], tvDiv);
                    }
                })
                    .catch(error => console.log(error));
            }

        } else if (docType === "people") {
            if (!update) {
                trendingPeople.replaceChildren();
            } else if (searchValue === "") {
                const people = peoplePopular(page)
                .then(result => {
                    for (i in result.results) {
                        createCard("people", 200, result.results[i], peopleDiv);
                    }
                })
                .catch(error => console.log(error));
            } else {
                const peopleSearchResult = peopleSearch(searchValue, page).then(result => {
                    for (i in result.results) {
                        createCard("people", 200, result.results[i], peopleDiv);
                    }
                })
                    .catch(error => console.log(error));
            }

        } else {
            window.location.href = `${searchbyType}.html?query=${searchValue}`;
        }
    }
}



try {
    const showMore = document.getElementById("more-results-btn");
    showMore.addEventListener("click", e => {
        if (currentPage === 5) {
            document.removeChild(document.getElementById("more-btn-div"));
        }

        if (e.target.name === "movies") {
            searchbyType = "movies";
            searchValue = movieName;
            docType = "movies";
            search(true, currentPage);
        } else if (e.target.name === "tv") {
            searchbyType = "tv";
            searchValue = tvName;
            docType = "tv";
            search(true, currentPage);
        } else if (e.target.name === "people") {
            searchbyType = "people";
            searchValue = peopleName;
            docType = "people";
            search(true, currentPage);
        } else {
            docType = "index";
        }
        currentPage++;
    });
} catch (error) {

}

let menuOpen = false;
document.getElementById("menu-btn").addEventListener("click", e => {
    menuOpen = !menuOpen;
    document.getElementById("nav-contents").dataset.open = menuOpen;
});


// Get the query string into a JSON object
const queryObj = queryStringToJson(window.location.search);
const movieId = queryObj.id;

const idInput = document.getElementById("url-text");
const findButton = document.getElementById("image-button");
const slider = document.getElementById("carousel-slider");

const backdropDiv = document.getElementById("image-div");
const castDiv = document.getElementById("cast-list");


let detailsResult = null;
let detailsImg = null;

// Make the call to get the info based on the id
movieDetails(movieId)
    .then(result => {
        detailsResult = result;
        console.log(detailsResult);
        updateCard(400);

    })
    .catch(error => console.log(error));

// Make the call to get the info based on the id
movieImages(movieId)
    .then(result => {
        detailsImg = result;
        makeImageCarousel(result.posters, 200); // Leaving this here as a hint for making a scrolling gallery
    })
    .catch(error => console.log(error));

//movie/movie_id/credits?language=en-US

movieCast = makeAPICall(`movie/${movieId}/credits`, "language=en-US")
    .then(result => {
        console.log(result)
        for (i of result.cast) {
            createCard("people", 200, i, castDiv);

        }
    })
    .catch(error => console.log(error));

function updateCard(width) {
    if (detailsResult !== null) {
        document.getElementById("image-div").innerHTML =
            `<img src=${imgUrl}w${width}/${detailsResult.backdrop_path}></img>`;

        document.body.title = `${detailsResult.title}`;

        document.getElementById("movie-title").innerHTML = `Title : ${detailsResult.title}`;
        document.getElementById("movie-release").innerHTML = `Release Date : ${detailsResult.release_date}`;
        document.getElementById("movie-overview").innerHTML = `Overview : ${detailsResult.overview}`;
        document.getElementById("movie-runtime").innerHTML = `Runtime : ${detailsResult.runtime} Minutes`;
        document.getElementById("movie-vote").innerHTML = `Vote average : ${detailsResult.vote_average}`;
        document.getElementById("movie-id").innerHTML = `Movie ID : ${detailsResult.id}`;
    }
}


let posterElements = [];

let posterIndex = 0;
let posterEnd = 4;

let posterMax = 0;

function makeImageCarousel(posters, width) {
    for (i of posters) {


        const posterImg = document.createElement("img");
        posterImg.src = `${imgUrl}w${width}/${i.file_path}`;
        posterElements.push(posterImg);
    }

    posterMax = posterElements.length;

    updateCarousel();


}

function updateCarousel() {
    document.getElementById("carousel-slider").replaceChildren();

    if (posterIndex < 0) {
        posterIndex = posterMax - 1;
    } else if (posterIndex >= posterMax) {
        posterIndex = 0;
    }

    // console.log(range);
    document.getElementById("carousel-slider").appendChild(posterElements[posterIndex]);

}

document.getElementById("carousel-forward").addEventListener("click", () => {
    posterIndex += 1;
    updateCarousel();
});

document.getElementById("carousel-backward").addEventListener("click", () => {
    posterIndex -= 1;
    updateCarousel();
});


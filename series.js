// Get the query string into a JSON object
const queryObj = queryStringToJson(window.location.search);
const seriesId = queryObj.id;

const idInput = document.getElementById("url-text");
const findButton = document.getElementById("image-button");

const castDiv = document.getElementById("credits");


let numOfSeasons = 0;
let actorList = [];
// Make the call to get the info based on the id
tvDetails(seriesId)
    .then(result => {
        console.log(result);
        document.getElementById("image-div").innerHTML = `<img src=${imgUrl}w${200}/${result.poster_path}></img>`;;
        document.getElementById("series-title").innerHTML = result.name;
        document.getElementById("running-time").innerHTML = `Run Time : ${result.first_air_date} - ${result.last_air_date}`;
        document.getElementById("num-of-seasons").innerHTML = `Number of Seasons : ${result.number_of_seasons}`;
        numOfSeasons = `${result.number_of_seasons}`;
        document.getElementById("num-of-episode").innerHTML = `Number of Episodes : ${result.number_of_episodes}`;
        document.getElementById("rating").innerHTML = `Rating : ${result.vote_average}`;
        document.getElementById("overview").innerHTML = `Overview : ${result.overview}`;
        document.getElementById("series-id").innerHTML = `Series ID : ${result.id}`;
    })
    .catch(error => console.log(error));

// Make the call to get the info based on the id
makeAPICall(`tv/${seriesId}/season/${1}/credits`, "language=en-US")
    .then(result => {
        for (j of result.cast) {
            console.log(j);
            createCard("people", 200, j, castDiv);
        }
    })
    .catch(error => console.log(error));
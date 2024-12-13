// Get the query string into a JSON object
const queryObj = queryStringToJson(window.location.search);
const personId = queryObj.id;

const idInput = document.getElementById("url-text");
const findButton = document.getElementById("image-button");


const movieCredits = document.getElementById("combined-credits-movie");
const tvCredits = document.getElementById("combined-credits-tv");
// Show the images based on the id


// Make the call to get the info based on the id
personDetails(personId)
    .then(result => {
        document.getElementById("image-div").innerHTML = `<img src=${imgUrl}w${200}/${result.profile_path}></img>`;
        document.getElementById("actor-name").innerHTML = `Actor : ${result.name}`;
        let actorDeath = result.deathday;
        if (actorDeath === null) {
            actorDeath = "present day";
        }
        document.getElementById("actor-life").innerHTML = `Life : ${result.birthday} -- ${actorDeath}`;
        document.getElementById("actor-birth-place").innerHTML = `Birth Place : ${result.place_of_birth}`;
        document.getElementById("actor-biography").innerHTML = `Actor Bio : ${result.biography}`;
        document.getElementById("actor-id").innerHTML = `Actor ID : ${result.id}`;
    })
    .catch(error => console.log(error));

makeAPICall(`person/${personId}/movie_credits`, "include_adult=false&language=en-US")
    .then(result => {
        for (i of result.cast) {
            createCard("movie", 200, i, movieCredits);
        }
    })
    .catch(error => console.log(error));

makeAPICall(`person/${personId}/tv_credits`, "include_adult=false&language=en-US")
    .then(result => {
        for (i of result.cast) {
            createCard("tv", 200, i, tvCredits);
        }
    })
    .catch(error => console.log(error));
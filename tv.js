// Get the query string into a JSON object
const queryObj = queryStringToJson(window.location.search);
const tvName = queryObj.query;

const idInput = document.getElementById("id-text");
const findButton = document.getElementById("find-button");

const tvDiv = document.getElementById("tv");





if (tvName !== undefined && tvName !== "") {
    document.getElementById("tv-header").innerHTML = `TV : ${tvName}`;
    document.title = `TV : ${tvName}`;
}

document.getElementById("search-text").placeholder = tvName;



if (tvName === "") {
    const tvs = tvPopular()
        .then(result => {
            for (i in result.results) {
                createCard("tv", 200, result.results[i], tvDiv);
            }
        })
        .catch(error => console.log(error));
} else {
    tvSearch(tvName)
        .then(result => {
            for (i in result.results) {
                createCard("tv", 200, result.results[i], tvDiv);
            }
        })
        .catch(error => console.log(error));
}
// Get the query string into a JSON object
const queryObj = queryStringToJson(window.location.search);
const peopleName = queryObj.query;

const idInput = document.getElementById("id-text");
const findButton = document.getElementById("find-button");

const peopleDiv = document.getElementById("peoples");

document.getElementById("search-text").placeholder = peopleName;
if (peopleName !== undefined && peopleName !== "") {
    document.getElementById("people-header").innerHTML = `People : ${peopleName}`;
    document.title = `People : ${peopleName}`;
}

if (peopleName === "") {
    const peoples = peoplePopular()
        .then(result => {
            for (i in result.results) {
                createCard("people", 200, result.results[i], peopleDiv);
            }
        })
        .catch(error => console.log(error));
} else {
    peopleSearch(peopleName)
        .then(result => {
            for (i in result.results) {
                createCard("people", 200, result.results[i], peopleDiv);
            }
        })
        .catch(error => console.log(error));
}
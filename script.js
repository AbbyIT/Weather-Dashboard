
// API Key


// DOM elements
let searchButton = document.querySelector("#search-button");
let searchInput = document.querySelector("#search-input");
let cityNames = document.querySelector(".city-names");

// addEventListener on search button
searchButton.addEventListener("click", function (event) {
  event.preventDefault();
  // store searchInput into variable
  let city = searchInput.value;
  console.log(city);

  // let city = "London";

  // URL 1 build
  let queryURL1 =
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=4b5226a044e9f4f13782e7bc67c0437d` 

  // We need this data first in order to make the 2nd request
  fetch(queryURL1)
    .then((response) => response.json())
    .then((citiesFound) => {
      let firstCity = citiesFound[0];
      console.log(firstCity.lat);
      console.log(firstCity.lon);

      // 2nd URL data request chained onto 1st URL data request
      let queryURL2 =
        `https://api.openweathermap.org/data/2.5/forecast?lat=${firstCity.lat}&lon=${firstCity.lon}&appid=4b5226a044e9f4f13782e7bc67c0437d` 

      return fetch(queryURL2);
    })

    .then((response) => response.json())
    .then((cityData) => {
      // the below is the data from return fetch (queryURL2)
      console.log(cityData);
    });

  // Create elements for all cities that was searched e.g London, Berlin etc
  let cityButton = document.createElement("li");

  // Assign text value
  cityButton.innerHTML = city;

  // Prepend every city entred to city list
  cityNames.prepend(cityButton);

  // Empty array to store cities in localStorage
  let cities = [];
  // Push cities searched into this array
  cities.push(city);

  // Function to save the list of all cities stores to localStorage
  function storeCityNames() {
    localStorage.setItem("cities", JSON.stringify(cities));
    console.log(localStorage);
  }
  storeCityNames();

  // Function to retrieve cities from localStorage

});
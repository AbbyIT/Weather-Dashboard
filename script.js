
// API Key


// Elements 
let searchButton = document.querySelector("#search-button");
let searchInput = document.querySelector("#search-input");
let cityName = document.querySelector(".city-names");
let weatherToday = document.querySelector("#today");
// let Day1Forecast= document.querySelector("#forecastTitle1")
// let Day2Forecast= document.querySelector("#forecastTitle2")
// let Day3Forecast= document.querySelector("#forecastTitle3")
// let Day4Forecast= document.querySelector("#forecastTitle4")
// let Day5Forecast= document.querySelector("#forecastTitle5")




// Empty array to store cities in localStorage
let cities = [];

// Runs when the page loads
init();

// check the local storage
function init() {
  // check if there are any stored cities
  let storedCities = JSON.parse(localStorage.getItem("cities"));

  // If cities are stored, update the cities array to it
  if (storedCities) {
    cities = storedCities;
  }

  // Function to render cities on the left
  renderCities(cities);
}

function renderCities(cities) {
  // Empty cityNames
  cityName.innerHTML = "";

  for (let i = 0; i < cities.length; i++) {
    const city = cities[i];

    // Create elements for every city searched
    let cityButton = document.createElement("li");

    // Assign text value
    cityButton.innerHTML = city;

    // Prepend every city searched 
    cityName.prepend(cityButton);
  }
}

// Render data 

// render data function obtain from localstorage

// addEventListener on search button
  searchButton.addEventListener("click", function (event) {
  event.preventDefault();

  let city = searchInput.value;

  cityWeatherSearch(city);

  // Push cities searched into the array, only push if city has not already been added
  if (!cities.includes(city)) {
    cities.push(city);
    storeCityNames();
  }
  // This Function save cities to localStorage
  function storeCityNames() {
    localStorage.setItem("cities", JSON.stringify(cities));
    console.log(localStorage);
  }

  // Function to retrieve cities from localStorage
  renderCities(cities);
});

// event delegation for city buttons
cityName.addEventListener("click", function (event) {
  if (event.target.matches("li")) {
    console.log(event.target);
    let cityName = event.target.textContent;
    console.log(cityName);
    cityWeatherSearch(cityName);
  }
});

function cityWeatherSearch(cityName) {

  // URL 1 build
  let queryURL1 =
    `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=4b5226a044e9f4f13782e7bc67c0437d`

  // We need this data first in order to make the 2nd request
  fetch(queryURL1)
    .then((response) => response.json())
    .then((citiesFound) => {
      let firstCity = citiesFound[0];
      console.log(firstCity);
      console.log(firstCity.lat);
      console.log(firstCity.lon);

      // 2nd URL data request chained onto 1st URL data request
      let queryURL2 =
        `https://api.openweathermap.org/data/2.5/forecast?lat=${firstCity.lat}&lon=${firstCity.lon}&units=metric&appid=4b5226a044e9f4f13782e7bc67c0437d` 
      return fetch(queryURL2);
    })

    .then((response) => response.json())
    .then((cityData) => {
      // the below is the data from return fetch (queryURL2)
      console.log(cityData);
      renderWeather(cityData);
    });
}

function renderWeather(weatherData) {
  
  let cityTitle = weatherData.city.name;
  let iconCode = weatherData.list[0].weather[0].icon;
  let iconURL = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  let day2Weather = document.querySelector("#forecastTitle1");
  let day3Weather = document.querySelector("#forecastTitle2");
  let day4Weather = document.querySelector("#forecastTitle3");
  let day5Weather = document.querySelector("#forecastTitle4");

  console.log(cityTitle);

  // current Weather
  let html = `<h1>${cityTitle} (${moment(weatherData.list[0].dt_txt).format(
    "DD/MM/YYYY"
  )}) <img src='${iconURL}'></h1>
  <p>Temp: ${Math.floor(weatherData.list[0].main.temp)} &#8451</p>
  <p>Wind: ${weatherData.list[0].wind.speed}</p>
  <p>Humidity: ${weatherData.list[0].main.humidity} </p>`;

  console.log(weatherData.list[0])

  weatherToday.innerHTML = html;

// Weather for day 2

let iconCode2 = weatherData.list[9].weather[0].icon;
let iconURL2 = `http://openweathermap.org/img/wn/${iconCode2}@2x.png`;
let Day2html = `<h1>${cityTitle} (${moment(weatherData.list[9].dt_txt).format(
  "DD/MM/YYYY"
)}) <img src='${iconURL2}'></h1>
<p>Temp: ${Math.floor(weatherData.list[9].main.temp)} &#8451</p>
<p>Wind: ${weatherData.list[9].wind.speed}</p>
<p>Humidity: ${weatherData.list[9].main.humidity} </p>`;

day2Weather.innerHTML= Day2html;


// Weather for day 3 

let iconCode3 = weatherData.list[18].weather[0].icon;
let iconURL3 = `http://openweathermap.org/img/wn/${iconCode3}@2x.png`;
let Day3html = `<h1>${cityTitle} (${moment(weatherData.list[18].dt_txt).format(
  "DD/MM/YYYY"
)}) <img src='${iconURL2}'></h1>
<p>Temp: ${Math.floor(weatherData.list[18].main.temp)} &#8451</p>
<p>Wind: ${weatherData.list[18].wind.speed}</p>
<p>Humidity: ${weatherData.list[18].main.humidity} </p>`;

day3Weather.innerHTML= Day3html;


// Weather for Day 3

}















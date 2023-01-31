
// API Key

// Elements 
let searchButton = document.querySelector("#search-button");
let searchInput = document.querySelector("#search-input");
let cityName = document.querySelector(".city-names");
let weatherToday = document.querySelector("#today");


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

  let day1Weather = document.querySelector("#forecastTitle1");
  let day2Weather = document.querySelector("#forecastTitle2");
  let day3Weather = document.querySelector("#forecastTitle3");
  let day4Weather = document.querySelector("#forecastTitle4");
  let day5Weather = document.querySelector("#forecastTitle5");

  console.log(cityTitle);

  // current Weather (Today)
  let html = `<h1>${cityTitle} (${moment(weatherData.list[0].dt_txt).format(
    "DD/MM/YYYY"
  )}) <img src='${iconURL}'></h1>
  <p>Temp: ${Math.floor(weatherData.list[0].main.temp)} &#8451</p>
  <p>Wind: ${weatherData.list[0].wind.speed}</p>
  <p>Humidity: ${weatherData.list[0].main.humidity} </p>`;

  console.log(weatherData.list[0])

  weatherToday.innerHTML = html;

  // Weather forecast Day 1 - NextDay

  let iconCode1 = weatherData.list[8].weather[0].icon;
  let iconURL1 = `http://openweathermap.org/img/wn/${iconCode1}@2x.png`;
  let Day1html = `<h1>${cityTitle} (${moment(weatherData.list[9].dt_txt).format(
    "DD/MM/YYYY"
  )}) <img src='${iconURL1}'></h1>
  <p>Temp: ${Math.floor(weatherData.list[8].main.temp)} &#8451</p>
  <p>Wind: ${weatherData.list[8].wind.speed}</p>
  <p>Humidity: ${weatherData.list[8].main.humidity} </p>`;
  
  day1Weather.innerHTML= Day1html;


// Weather forecast day 2

let iconCode2 = weatherData.list[16].weather[0].icon;
let iconURL2 = `http://openweathermap.org/img/wn/${iconCode2}@2x.png`;
let Day2html = `<h1>${cityTitle} (${moment(weatherData.list[16].dt_txt).format(
  "DD/MM/YYYY"
)}) <img src='${iconURL2}'></h1>
<p>Temp: ${Math.floor(weatherData.list[16].main.temp)} &#8451</p>
<p>Wind: ${weatherData.list[16].wind.speed}</p>
<p>Humidity: ${weatherData.list[16].main.humidity} </p>`;

day2Weather.innerHTML= Day2html;


// Weather forecast day 3 

let iconCode3 = weatherData.list[24].weather[0].icon;
// let iconCode3 = {weatherData.list[24].weather[0].icon}@2x.png;
let iconURL3 = `http://openweathermap.org/img/wn/${iconCode3}@2x.png`;
let Day3html = `<h1>${cityTitle} (${moment(weatherData.list[24].dt_txt).format(
  "DD/MM/YYYY"
)}) <img src='${iconURL3}'></h1>
<p>Temp: ${Math.floor(weatherData.list[24].main.temp)} &#8451</p>
<p>Wind: ${weatherData.list[24].wind.speed}</p>
<p>Humidity: ${weatherData.list[24].main.humidity} </p>`;

day3Weather.innerHTML= Day3html;


// Weather for Day 4

let iconCode4 = weatherData.list[32].weather[0].icon;
let iconURL4 = `http://openweathermap.org/img/wn/${iconCode4}@2x.png`;
let Day4html = `<h1>${cityTitle} (${moment(weatherData.list[32].dt_txt).format(
  "DD/MM/YYYY"
)}) <img src='${iconURL4}'></h1>
<p>Temp: ${Math.floor(weatherData.list[32].main.temp)} &#8451</p>
<p>Wind: ${weatherData.list[32].wind.speed}</p>
<p>Humidity: ${weatherData.list[32].main.humidity} </p>`;

day4Weather.innerHTML= Day4html;

// Weather for Day 5

let iconCode5 = weatherData.list[40].weather[0].icon;
let iconURL5 = `http://openweathermap.org/img/wn/${iconCode5}@2x.png`;
let Day5html = `<h1>${cityTitle} (${moment(weatherData.list[40].dt_txt).format(
  "DD/MM/YYYY"
)}) <img src='${iconURL5}'></h1>
<p>Temp: ${Math.floor(weatherData.list[40].main.temp)} &#8451</p>
<p>Wind: ${weatherData.list[40].wind.speed}</p>
<p>Humidity: ${weatherData.list[40].main.humidity} </p>`;

day5Weather.innerHTML= Day5html;




}















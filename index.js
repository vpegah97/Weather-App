let time = new Date();

let dayTime = document.querySelector("#dayTime");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[time.getDay()];

let currentHour = time.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}

let currentMinute = time.getMinutes();
if (currentMinute < 10) {
  currentMinute = `0${currentMinute}`;
}

dayTime.innerHTML = `Last updated: ${currentDay} ${currentHour}:${currentMinute}`;

function currentCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
}

let theForm = document.querySelector(".search-form");
theForm.addEventListener("submit", currentCity);

function showTemperature(response) {
  let tempOfCity = document.querySelector("#tempWeather");
  let temperatureTown = Math.round(response.data.main.temp);
  tempOfCity.innerHTML = `${temperatureTown}°`;

  let currentCity = document.querySelector("#nameOfCity");
  currentCity.innerHTML = `${response.data.name}`;

  let description = document.querySelector("#description");
  description.innerHTML = `${response.data.weather[0].description}`;
  description.innerHTML =
    description.innerHTML.charAt(0).toUpperCase() +
    description.innerHTML.slice(1);

  let tempMax = document.querySelector("#tempMax");
  tempMax.innerHTML = `${Math.round(
    response.data.main.feels_like
  )}°C<br><strong>Feels like</strong>`;

  let wind = document.querySelector("#wind");
  wind.innerHTML = `${Math.round(
    response.data.wind.speed
  )} km/h<br><strong>Wind</strong>`;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.main.humidity}%<br><strong>Humidity</strong>`;

  let weatherIcon = document.querySelector("#theIcon");
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}

function findCityOfButton(city) {
  let apiKey = "be60748992fab0f5da8162563fb21245";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function submitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input").value;
  findCityOfButton(city);
}

let submitCityOfButton = document.querySelector("form");
submitCityOfButton.addEventListener("submit", submitCity);

findCityOfButton("London");

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="47"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° |  </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

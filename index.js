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
  currentCity.innerHTML = `${response.data.name},`;

  let description = document.querySelector("#description");
  description.innerHTML = `${response.data.weather[0].description}`;

  let tempMax = document.querySelector("#tempMax");
  tempMax.innerHTML = `${Math.round(
    response.data.main.temp_max
  )}°C<br><strong>Maximum</strong>`;

  let wind = document.querySelector("#wind");
  wind.innerHTML = `${Math.round(
    response.data.wind.speed
  )} km/h<br><strong>Wind</strong>`;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.main.humidity}%<br><strong>Humidity</strong>`;

  let weatherIcon = document.querySelector("#icon");
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
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

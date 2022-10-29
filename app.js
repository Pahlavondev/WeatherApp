const api = {
  key: "6d635c78136d2e997035bda7e3d6f6f5",
  baseUrl: "https://api.openweathermap.org/data/2.5/",
};

const searchInput = document.querySelector(".search-input");

searchInput.addEventListener("keypress", setQuery);

function setQuery(e) {
  if (e.keyCode == 13) {
    getResults(searchInput.value);
    console.log(searchInput.value);
  }
}

function getResults(query) {
  fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  console.log(weather);

  let cityEl = document.querySelector(".location .city");
  cityEl.innerHTML = `
   ${weather.name}, ${weather.sys.country}
  `;

  let now = new Date();
  let dateEl = document.querySelector(".location .date");
  dateEl.innerHTML = dateBuilder(now);

  let tempEl = document.querySelector(".temp");
  tempEl.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

  let weatherEl = document.querySelector(".weather");
  weatherEl.innerHTML = weather.weather[0].main;

  let hiLow = document.querySelector(".hi-low");
  hiLow.innerHTML = `${Math.round(weather.main.temp_min)}°C /   
  ${Math.round(weather.main.temp_max)}°C`;
}

function dateBuilder(monthWeek) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = dayNames[monthWeek.getDay()];
  let date = monthWeek.getDate();
  let month = months[monthWeek.getMonth()];
  let year = monthWeek.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

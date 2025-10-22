const apiKey = "24ef3a748d53c664b2adb4855eba0427";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    const data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    const now = new Date();
    document.querySelector(".date-time").innerHTML = now.toLocaleString();

    // Dynamic weather icon
    const weather = data.weather[0].main.toLowerCase();
    if (weather.includes("cloud")) weatherIcon.src = "images/clouds.png";
    else if (weather.includes("rain")) weatherIcon.src = "images/rain.png";
    else if (weather.includes("clear")) weatherIcon.src = "images/clear.png";
    else if (weather.includes("drizzle")) weatherIcon.src = "images/drizzle.png";
    else if (weather.includes("snow")) weatherIcon.src = "images/snow.png";
    else weatherIcon.src = "images/mist.png";

    // Dynamic background color
    const card = document.querySelector(".card");
    const bgColors = {
      clear: "linear-gradient(135deg, #00feba, #5b548a)",
      rain: "linear-gradient(135deg, #4b79a1, #283e51)",
      clouds: "linear-gradient(135deg, #757f9a, #d7dde8)",
      drizzle: "linear-gradient(135deg, #74ebd5, #ACB6E5)",
      snow: "linear-gradient(135deg, #83a4d4, #b6fbff)",
      mist: "linear-gradient(135deg, #606c88, #3f4c6b)"
    };
    card.style.background = bgColors[weather] || bgColors.clear;

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

// Button click
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value.trim());
});

// Enter key press
searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") checkWeather(searchBox.value.trim());
});

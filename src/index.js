"use strict";

const API_KEY = "c04335fcdbd9697f8ad67a9671b27356";

const cityName = document.getElementById("city-name");
const cityId = document.getElementById("city-id");

const choiceCity = document.getElementById("city-name-choise");
const choiceId = document.getElementById("city-id-choise");

const temperture = document.getElementById("temperature");
const windSpeed = document.getElementById("wind-speed");
const humidity = document.getElementById("humidity");

async function getWeather() {
  let url;

  if (choiceCity.checked) {
    const city = cityName.value.trim();
    if (!city) {
      throw new Error("Enter a city name");
    }
    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=en`;
  } else if (choiceId.checked) {
    const id = cityId.value.trim();
    if (!id) {
      throw new Error("Enter an id");
    }
    url = `https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${API_KEY}&units=metric&lang=en`;
  } else {
    throw new Error("Radio buttons are not selected");
  }

  try {
    const response = await fetch(url);

    const data = await response.json();

    temperture.innerHTML = `${Math.round(data.main.temp)} °C`;
    windSpeed.innerHTML = `${data.wind.speed} m/s`;
    humidity.innerHTML = `${data.main.humidity}`;
    console.log("City:", data.name, "| ID:", data.id);
  } catch (error) {
    throw new Error(error);
  }
}

function clearInfo() {
  cityName.value = "";
  cityId.value = "";

  choiceCity.checked = false;
  choiceId.checked = false;

  temperture.innerHTML = "";
  windSpeed.innerHTML = "";
  humidity.innerHTML = "";
}

const weatherButton = document.getElementById("weather-button");
const cancelButton = document.getElementById("cancel-button");

weatherButton.addEventListener("click", getWeather);
cancelButton.addEventListener("click", clearInfo);

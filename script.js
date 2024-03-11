document.addEventListener("DOMContentLoaded", function() {
    const apiKey = "d2585fdd007251469ff2d3b8fc95280f";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

    const searchBox = document.querySelector(".search input");
    const searchBtn = document.querySelector(".search button");
    const weatherContainer = document.querySelector(".weather");
    const weatherIcon = document.querySelector(".weather-icon");
    const errorContainer = document.querySelector(".error-container");

    let debounceTimer;

    async function checkWeather(city) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(async () => {
            const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
            const data = await response.json();

            const errorMessage = document.querySelector(".error-message");

            if (data.cod === "404") {
                errorMessage.textContent = "Invalid city name entered. Please try again.";
                errorMessage.style.display = "block";
                weatherContainer.style.display = "none";
            } else {
                errorMessage.style.display = "none";
                weatherContainer.style.display = "block";

                document.querySelector(".city").textContent = data.name;
                document.querySelector(".temp").textContent = Math.round(data.main.temp) + "°c";
                document.querySelector(".humidity").textContent = data.main.humidity + "%";
                document.querySelector(".wind").textContent = data.wind.speed + " Km/h";
                document.querySelector(".feelslike").textContent = data.main.feels_like + "°";
                document.querySelector(".pressure").textContent = "↓ " + data.main.pressure + " mb";

                if (data.weather[0].main == "Clouds") {
                    weatherIcon.src = "images/clouds.png";
                } else if (data.weather[0].main == "Clear") {
                    weatherIcon.src = "images/clear.png";
                } else if (data.weather[0].main == "Rain") {
                    weatherIcon.src = "images/rain.png";
                } else if (data.weather[0].main == "Drizzle") {
                    weatherIcon.src = "images/drizzle.png";
                } else if (data.weather[0].main == "Mist") {
                    weatherIcon.src = "images/mist.png";
                }
            }
        }, 300); // Wait for 300 milliseconds before making the API call
    }

    searchBtn.addEventListener("click", () => {
        checkWeather(searchBox.value);
    });

});
document.addEventListener("DOMContentLoaded", function() {
    // Function to get the greeting message based on time of day
    function getGreeting() {
        const hour = new Date().getHours();
        let greeting;
        if (hour >= 5 && hour < 12) {
            greeting = "Good morning ! Welcome to AtmosAlly";
        } else if (hour >= 12 && hour < 18) {
            greeting = "Good afternoon ! Enjoy the weather with AtmosAlly";
        } else if (hour >= 18 && hour < 22) {
            greeting = "Good evening ! Stay informed with AtmosAlly";
        } else {
            greeting = "Good night ! Rest well and plan your day with AtmosAlly";
        }
        return greeting;
    }
    // Function to display date, time, and greeting
    function displayDateTime() {
        const dateElem = document.getElementById("date-time");
        const currentDate = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
        const dateTimeString = currentDate.toLocaleString('en-US', options);
        const greeting = getGreeting();
        dateElem.textContent = `${greeting} It's ${dateTimeString}`;
    }

    // Call the function to display date, time, and greeting
    displayDateTime();

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
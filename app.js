const input = document.querySelector('input');
const searchBtn = document.querySelector('button');
const weatherImg = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.querySelector('#humidity');
const windSpeed = document.querySelector('#wind-speed');

const locationNotFound = document.querySelector(".location-not-found");
const weatherBody = document.querySelector(".weather-body");

async function checkWeather(city) {
    const apiKey = 'cd6c0bcb56331e0468af2ddd070a3ff1'
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const weatherData = await fetch(`${url}`)
    .then(response => response.json());

    if(weatherData.cod === `404`) {
        locationNotFound.style.display = "flex";
        weatherBody.style.display = "none";
        console.log("error");
        return;
    }

    locationNotFound.style.display = "none";
    weatherBody.style.display = "flex";
    temperature.innerHTML = `${Math.round(weatherData.main.temp - 273.15)}°C`;
    description.innerHTML = `${weatherData.weather[0].description}`;

    humidity.innerHTML = `${weatherData.main.humidity}%`;
    windSpeed.innerHTML = `${weatherData.wind.speed}Km/H`;

    switch (weatherData.weather[0].main) {
        case 'Clouds' :
            weatherImg.src="cloud.png";
            break;
            case 'Clear' :
            weatherImg.src="clear.png";
            break;
            case 'Rain' :
            weatherImg.src="rain.png";
            break;
            case 'Mist' :
            weatherImg.src="mist.png";
            break;
            case 'Snow' :
            weatherImg.src="snow.png";
            break;
    }
    console.log(weatherData);
}
searchBtn.addEventListener('click', () => {
    checkWeather(input.value);
})
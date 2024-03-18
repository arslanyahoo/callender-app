const searchButton = document.querySelector('.search-box button');

searchButton.addEventListener('click', () => {
    const APIKey = '371c86eb69baa606ff6e3bd04741e7d8';
    const city = document.querySelector('.search-box input').value;

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(data => {
            const weatherBox = document.querySelector('.weather-box');
            const weatherDetails = document.querySelector('.weather-details');
            const weatherImage = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const windSpeed = document.querySelector('.weather-details .wind span');

            // Check if the response contains weather data
            if (!data || !data.weather || !data.weather[0]) {
                console.error('Invalid response from the weather API');
                return;
            }

            const weather = data.weather[0];
            const main = data.main;
            const wind = data.wind;

            // Set the weather image based on weather condition
            switch (weather.main) {
                case 'Clear':
                    weatherImage.src = 'https://cdn2.iconfinder.com/data/icons/hobbies-misc-1/512/weather___cloudy_partly_forecast_sunny_season_sun_day.png';
                    break;
                case 'Clouds':
                    weatherImage.src = 'https://www.transparentpng.com/thumb/weather/png-photo-weather-hd-9.png';
                    break;
                case 'Mist':
                    weatherImage.src = 'https://cdn0.iconfinder.com/data/icons/weather-347/64/fog-weather-mist-512.png';
                    break;
                case 'Haze':
                    weatherImage.src = 'https://www.freepnglogos.com/uploads/cloud-png/clouds-picture-free-png-images-26.png';
                    break;
                case 'Snow':
                    weatherImage.src = 'https://cdn2.iconfinder.com/data/icons/weather-24/256/Snow_Day-1024.png';
                    break;
                default:
                    weatherImage.src = 'https://cdn0.iconfinder.com/data/icons/hotel-and-travel-2-1/52/56-512.png';
            }

            // Set temperature, description, humidity, and wind speed
            temperature.textContent = `${main.temp} °C`;
            description.textContent = weather.description;
            humidity.textContent = `${main.humidity}%`;
            windSpeed.textContent = `${wind.speed} km/s`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
});

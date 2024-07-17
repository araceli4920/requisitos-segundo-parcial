let cityInput = document.getElementById('city_input'),
    searchBtn = document.getElementById('searchBtn'),
    locationBtn = document.getElementById('locationBtn'),
    api_key = '70df831975a7b2014b2c3937384bc5e0',
    currentWeatherCard = document.querySelectorAll('.weather-left .card')[0],
    fiveDaysForecastCard = document.querySelector('.day-forecast'),
    sunriseCard = document.querySelectorAll('.rightcard .card')[0],
    humidityVal = document.getElementById('humidityVal'),
    pressureVal = document.getElementById('pressureVal'),
    visibilityVal = document.getElementById('visibilityVal'),
    windSpeedVal = document.getElementById('windSpeedVal'),
    feelsVal = document.getElementById('feelsVal');

function clearWeatherDetails() {
    currentWeatherCard.innerHTML = '';
    fiveDaysForecastCard.innerHTML = '';
    sunriseCard.innerHTML = '';
    humidityVal.innerHTML = '';
    pressureVal.innerHTML = '';
    visibilityVal.innerHTML = '';
    windSpeedVal.innerHTML = '';
    feelsVal.innerHTML = '';
}

function getWeatherDetails(name, lat, lon, country, state) {
    clearWeatherDetails();
    let FORECAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`,
        WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`,
        days = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ],
        months = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ];

    fetch(WEATHER_API_URL).then(res => res.json()).then(data => {
        let date = new Date();
        currentWeatherCard.innerHTML = `
            <div class="current-weather">
                <div class="details">
                    <p>Now</p>
                    <h2>${(data.main.temp - 273.15).toFixed(2)}&deg;C</h2>
                    <p>${data.weather[0].description}</p>
                </div>
                <div class="weather-icon">
                    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
                </div>
            </div>
            <hr>
            <div class="card-footer">
                <p><i class="fa-regular fa-calendar"></i> ${days[date.getDay()]}, ${date.getDate()}, ${months[date.getMonth()]} ${date.getFullYear()}</p>
                <p><i class="fa-regular fa-location-dot"></i> ${name}, <a id="country-link" href="#"> ${country}</a></p>
            </div>
        `;
        document.getElementById('country-link').setAttribute('href', `paises_individual.html?country=${country}`);
        let { sunrise, sunset } = data.sys,
            { timezone, visibility } = data,
            { humidity, pressure, feels_like } = data.main,
            { speed } = data.wind,
            sRiseTime = moment.utc(sunrise, 'X').add(timezone, 'seconds').format('hh:mm A'),
            sSetTime = moment.utc(sunset, 'X').add(timezone, 'seconds').format('hh:mm A');
        sunriseCard.innerHTML = `
            <div class="card-head">
                <h2 class="todayshighlights">Today's Highlights</h2>
                <p>Sunrise & Sunset</p>
            </div>
            <div class="sunries-sunset">
                <div class="item">
                    <div class="icon">
                        <i class="fa light fa-sunrise fa-4x"></i>
                    </div>
                    <div>
                        <p>Sunrise</p>
                        <p>${sRiseTime}</p>
                    </div>
                </div>
                <div class="item">
                    <div class="icon">
                        <i class="fa light fa-sunset fa-4x"></i>
                    </div>
                    <div>
                        <p>Sunset</p>
                        <p>${sSetTime}</p>
                    </div>
                </div>
            </div>    
        `;
        humidityVal.innerHTML = `${humidity}%`;
        pressureVal.innerHTML = `${pressure}hPa`;
        visibilityVal.innerHTML = `${visibility / 1000}km`;
        windSpeedVal.innerHTML = `${speed}m/s`;
        feelsVal.innerHTML = `${(feels_like - 273.15).toFixed(2)}&deg;C`;
    }).catch(() => {
        alert('Failed to fetch current weather');
    });

    fetch(FORECAST_API_URL).then(res => res.json()).then(data => {
        let uniqueForecastDays = [];
        let fiveDaysForecast = data.list.filter(forecast => {
            let forecastDate = new Date(forecast.dt_txt).getDate();
            if (!uniqueForecastDays.includes(forecastDate)) {
                return uniqueForecastDays.push(forecastDate);
            }
        });
        fiveDaysForecastCard.innerHTML = '';
        for (let i = 0; i < fiveDaysForecast.length; i++) {
            let date = new Date(fiveDaysForecast[i].dt_txt);
            fiveDaysForecastCard.innerHTML += `
                <div class="forecast-item"> 
                    <div class="icon-wrapper">
                        <img src="https://openweathermap.org/img/wn/${fiveDaysForecast[i].weather[0].icon}.png" alt="">
                        <span>${(fiveDaysForecast[i].main.temp - 273.15).toFixed(2)}&deg;C</span>
                    </div>
                    <p>${date.getDate()} ${months[date.getMonth()]}</p>
                    <p>${days[date.getDay()]}</p>
                </div>
            `;
        }
    }).catch(() => {
        alert('Failed to fetch weather forecast');
    });
}

function getCityCoordinates(cityName) {
    if (!cityName) return;
    let GEOCODING_API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${api_key}`;
    fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {
        if (data.length === 0) {
            alert(`No coordinates found for ${cityName}`);
            return;
        }
        let { name, lat, lon, country, state } = data[0];
        getWeatherDetails(name, lat, lon, country, state);
        cityInput.value = ''; // Limpia el campo de entrada después de la búsqueda
    }).catch(() => {
        alert(`Failed to fetch coordinates of ${cityName}`);
    });
}

function getUserCoordinates() {
    navigator.geolocation.getCurrentPosition(position => {
        let { latitude, longitude } = position.coords;
        getReverseGeocoding(latitude, longitude);
    }, error => {
        if (error.code === error.PERMISSION_DENIED) {
            alert('Geolocation permission denied. Please reset location permission to grant access again');
        }
    });
}

function getCoordinatesFromInput(input) {
    const coordinates = input.split(',').map(coord => coord.trim());
    if (coordinates.length !== 2 || isNaN(coordinates[0]) || isNaN(coordinates[1])) {
        alert('Invalid coordinates format. Please enter in "latitude, longitude" format.');
        return;
    }
    const [lat, lon] = coordinates;
    getReverseGeocoding(lat, lon);
    cityInput.value = ''; // Limpia el campo de entrada después de la búsqueda
}

function getReverseGeocoding(lat, lon) {
    let REVERSE_GEOCODING_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${api_key}`;
    fetch(REVERSE_GEOCODING_URL).then(res => res.json()).then(data => {
        if (data.length === 0) {
            alert(`No data found for coordinates (${lat}, ${lon})`);
            return;
        }
        let bestMatch = data.find(location => location.name && location.country) || data[0];
        let { name, country, state } = bestMatch;
        getWeatherDetails(name || 'Unknown', lat, lon, country || 'Unknown', state || 'Unknown');
    }).catch(() => {
        alert(`Failed to fetch location data for coordinates (${lat}, ${lon})`);
    });
}

const urlParams = new URLSearchParams(window.location.search);
const stateParam = urlParams.get('state');
const capitalParam = urlParams.get('capital');
const latParam = urlParams.get('lat');
const lonParam = urlParams.get('lon');
const countryParam = urlParams.get('country');

if (latParam && lonParam) {
    getReverseGeocoding(latParam, lonParam);
} else if (countryParam) {
    document.getElementById('city_input').value = countryParam;
    getCityCoordinates(countryParam);
} else if (stateParam && capitalParam) {
    getCityCoordinates(capitalParam);
} else {
    searchBtn.removeEventListener('click', handleSearch);  // Remove existing listener if any
    searchBtn.addEventListener('click', handleSearch);
    locationBtn.removeEventListener('click', getUserCoordinates);  // Remove existing listener if any
    locationBtn.addEventListener('click', getUserCoordinates);
    cityInput.removeEventListener('keyup', handleKeyUp);  // Remove existing listener if any
    cityInput.addEventListener('keyup', handleKeyUp);
    window.removeEventListener('load', getUserCoordinates);  // Remove existing listener if any
    window.addEventListener('load', getUserCoordinates);
}

function handleSearch() {
    const input = cityInput.value;
    if (input.includes(',')) {
        getCoordinatesFromInput(input);
    } else {
        getCityCoordinates(input);
    }
}

function handleKeyUp(e) {
    if (e.key === 'Enter') {
        const input = cityInput.value;
        if (input.includes(',')) {
            getCoordinatesFromInput(input);
        } else {
            getCityCoordinates(input);
        }
    }
}

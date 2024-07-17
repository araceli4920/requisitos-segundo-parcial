const urlParams = new URLSearchParams(window.location.search);
const countryCode = urlParams.get('country');
const lat = urlParams.get('lat');
const lon = urlParams.get('lon');
const detailsContainer = document.querySelector('#country-details');

if (countryCode) {
    const url = `https://restcountries.com/v3.1/alpha/${countryCode}`;

    fetch(url)
        .then(response => response.json())
        .then(countryData => {
            const country = countryData[0];
            const detailsTemplate = `
                <h1>${country.name.common}</h1>
                <div class="card">
                    <img src="${country.flags.png}" alt="Bandera de ${country.name.common}">
                    <div class="contenedor">
                        <p><strong>Otros nombres:</strong> ${country.altSpellings.join(', ')}</p>
                        <p><strong>Capital:</strong> ${country.capital ? `<a href="weather.html?state=${country.name.common}&capital=${country.capital[0]}">${country.capital[0]}</a>` : 'N/A'} (Para más información favor de entrar al link)</p>
                        <p><strong>Continentes:</strong> ${country.continents.join(', ')}</p>
                    </div>
                    <div class="contenedor1">
                        <p><strong>Idiomas:</strong> ${Object.values(country.languages).join(', ')}</p>
                        <p><strong>Zonas Horarias: </strong> ${country.timezones.join(', ')}</p>
                        <p><strong>Coordenadas:</strong> Latitud ${country.latlng[0]}, Longitud ${country.latlng[1]}</p>
                        <p><strong>Símbolo de la Moneda:</strong> ${Object.values(country.currencies)[0].symbol}</p>
                    </div>
                </div>
                <div class="boton">
                    <p><strong></strong> <a href="${country.maps.googleMaps}" class="button">Ver en Google Maps</a></p>
                    <p><strong></strong> <a href="${country.maps.openStreetMaps}" class="butto">Ver en OpenStreetMaps</a></p>
                </div>
            `;
            detailsContainer.innerHTML = detailsTemplate;
        })
        .catch(error => {
            console.error('Error fetching country data:', error);
            detailsContainer.innerHTML = `<p>Error al cargar los datos del país.</p>`;
        });
} else if (lat && lon) {
    const REVERSE_GEOCODING_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=70df831975a7b2014b2c3937384bc5e0`;
    
    fetch(REVERSE_GEOCODING_URL)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                throw new Error('No data found for the given coordinates.');
            }
            const location = data[0];
            const detailsTemplate = `
                <h1>Detalles de la Ubicación</h1>
                <div class="card">
                    <div class="contenedor">
                        <p><strong>Latitud:</strong> ${lat}</p>
                        <p><strong>Longitud:</strong> ${lon}</p>
                    </div>
                </div>
            `;
            detailsContainer.innerHTML = detailsTemplate;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            detailsContainer.innerHTML = `<p>Error al cargar los datos de la ubicación.</p>`;
        });
} else {
    detailsContainer.innerHTML = `<p>Error: No se proporcionaron datos válidos.</p>`;
}


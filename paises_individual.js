const urlParams = new URLSearchParams(window.location.search);
const countryCode = urlParams.get('country'); // Obtener el código CCA2 del parámetro de la URL
const detailsContainer = document.querySelector('#country-details');

const url = `https://restcountries.com/v3.1/alpha/${countryCode}`; // Construir la URL de la API usando CCA2

fetch(url)
    .then(response => response.json())
    .then(countryData => {
        const country = countryData[0]; // La API devuelve un array con un solo elemento
        const detailsTemplate = `
            <h1>${country.name.common}</h1>
            <div class="card">
            <img src="${country.flags.png}" alt="Bandera de ${country.name.common}">
            <div class="contenedor">
            <p><strong>Otros nombres:</strong> ${country.altSpellings.join(', ')}</p>
            <p><strong>Capital:</strong> ${country.capital}</p>
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

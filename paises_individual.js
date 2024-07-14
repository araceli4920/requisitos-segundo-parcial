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
            <img src="${country.flags.png}" alt="Bandera de ${country.name.common}">
            <p><strong>Otros nombres:</strong> ${country.altSpellings.join(', ')}</p>
            <p><strong>Capital:</strong> ${country.capital}</p>
            <p><strong>Continentes:</strong> ${country.continents.join(', ')}</p>
            <p><strong>Idiomas:</strong> ${Object.values(country.languages).join(', ')}</p>
            <p><strong>Google Maps:</strong> <a href="${country.maps.googleMaps}">Ver en Google Maps</a></p>
            <p><strong>OpenStreetMaps:</strong> <a href="${country.maps.openStreetMaps}">Ver en OpenStreetMaps</a></p>
            <p><strong>Zonas Horarias: </strong> ${country.timezones.join(', ')}</p>
            <p><strong>Coordenadas:</strong> Latitud ${country.latlng[0]}, Longitud ${country.latlng[1]}</p>
            <p><strong>Símbolo de la Moneda:</strong> ${Object.values(country.currencies)[0].symbol}</p>
        `;
        detailsContainer.innerHTML = detailsTemplate;
    })
    .catch(error => {
        console.error('Error fetching country data:', error);
        detailsContainer.innerHTML = `<p>Error al cargar los datos del país.</p>`;
    });

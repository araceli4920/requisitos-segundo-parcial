const Container = document.querySelector("#Container");
const searchButton = document.querySelector("#searchButton");
const card = document.querySelector("#card");//selecciona el contenedor de searchForm

searchButton.addEventListener("click", () => {
    const countryName = document.querySelector("#countryInput").value;
    const url = `https://restcountries.com/v3.1/name/${countryName}`;

    fetch(url)
        .then(response => response.json())
        .then(countries => {
            Container.innerHTML = ""; // Limpiar o resetear el buscador, el buscador vuelve a reaparecer al hacer refresh pues todos los cambios de javascript se han reestablecido al basicamente limpiar la pantalla
            card.classList.add("hidden"); //Ocultar el buscador al mostrar el resultado, el  classlist add crea una clase hidden para que en el css podamos ocultarla al momento de haberle pedido informacion a la api
            countries.forEach(country => {
                const countryTemplate = `
            <h1>${country.name.common}</h1>
            <div class="card">
            <img src="${country.flags.png}" alt="Bandera de ${country.name.common}">
            <div class="contenedor">
            <p><strong>Otros nombres:</strong> ${country.altSpellings}</p>
            <p class="weater">
            <strong>Capital:</strong> 
            ${country.capital && country.capital.length > 0 ? 
                `<a href="weather.html?state=${encodeURIComponent(country.name.common)}&capital=${encodeURIComponent(country.capital[0])}">${country.capital[0]}</a>` : 
                'N/A'} 
            (Para más información favor de entrar al link)
            </p>
            <p><strong>Continentes:</strong> ${country.continents}</p>
            </div>
            <div class="contenedor1">
            <p><strong>Idiomas:</strong> ${Object.values(country.languages)}</p>
            <p><strong>Zonas Horarias: </strong> ${country.timezones}</p>
            <p><strong>Coordenadas:</strong> Latitud ${country.latlng[0]}, Longitud ${country.latlng[1]}</p>
            <p><strong>Símbolo de la Moneda:</strong> ${Object.values(country.currencies)[0].symbol}</p>
            </div>
            </div>
            <div class="boton">
            <p><strong></strong> <a href="${country.maps.googleMaps}" class="button">Ver en Google Maps</a></p>
            <p><strong></strong> <a href="${country.maps.openStreetMaps}" class="butto">Ver en OpenStreetMaps</a></p>
            </div>
                `;
                Container.innerHTML += countryTemplate;
            });
        })
        .catch(error => {
            Container.innerHTML = `<p>País no encontrado.</p>`;
        });
});

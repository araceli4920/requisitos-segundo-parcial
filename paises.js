const Container = document.querySelector("#Container"); // Seleccionar el contenedor donde se van a agregar las tarjetas de país
const url = "https://restcountries.com/v3.1/all";

fetch(url)
    .then(response => response.json()) // Convertir la respuesta en formato JSON
    .then(countries => {
        countries.forEach(country => {
            const countryTemplate = `
            <div class="country">
                <div class="img"><a href="paises_individual.html?country=${country.cca2}">
                    <img src="${country.flags.png}" alt="Bandera de ${country.name.common}">
                    <div class="tit">
                    <h2>${country.name.common}</h2></a>
                </div>
            </div>
                    <div class="card">
                    <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
                    <p><strong>Región:</strong> ${country.region}</p>
                    <p><strong>Subregión:</strong> ${country.subregion}</p>
                    <p><strong>Población:</strong> ${country.population.toLocaleString()}</p>
                </div>
                </div>
            `;
            Container.innerHTML += countryTemplate; // Agregar cada tarjeta de país al contenedor
        });
    })

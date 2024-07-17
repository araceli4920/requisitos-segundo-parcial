const boton = document.querySelector("#boton");
const foto = document.querySelector('#foto');
const nombre = document.querySelector('#nombre');
const correo = document.querySelector('#correo');
const ubicacion = document.querySelector('#ubicacion');
const ubicacionLink = document.querySelector('#ubicacionLink');
const ciudad = document.querySelector('#ciudad');
const ciudadLink = document.querySelector('#ciudadLink');
const zonaHoraria = document.querySelector('#zona-horaria');
const zonaHorariaLink = document.querySelector('#zonaHorariaLink');
const idiomas = document.querySelector('#idiomas');
const idiomasLink = document.querySelector('#idiomasLink');
const coordenadas = document.querySelector('#coordenadas');
const coordenadasLink = document.querySelector('#coordenadasLink');
const continente = document.querySelector('#continente');
const continenteLink = document.querySelector('#continenteLink');
const nacionalidad = document.querySelector('#nacionalidad');
const nacionalidadLink = document.querySelector('#nacionalidadLink');

const generarUsuario = async () => {
    try {
        const url = 'https://randomuser.me/api/';
        const respuesta = await fetch(url);
        const { results } = await respuesta.json();
        const usuarioAPI = results[0];

        console.log(usuarioAPI);

        foto.src = usuarioAPI.picture.medium;
        nombre.textContent = `${usuarioAPI.name.first} ${usuarioAPI.name.last}`;
        correo.textContent = usuarioAPI.email;
        ubicacion.textContent = `${usuarioAPI.location.city}, ${usuarioAPI.location.country}`;
        ciudad.textContent = usuarioAPI.location.city;
        zonaHoraria.textContent = usuarioAPI.location.timezone.offset;
        nacionalidad.textContent = usuarioAPI.nat;
        
        // Asignar nuevos datos y enlaces
        idiomas.textContent = usuarioAPI.location.country; // No se proveen idiomas en la API, puedes adaptar según el caso
        coordenadas.textContent = `Latitud ${usuarioAPI.location.coordinates.latitude}, Longitud ${usuarioAPI.location.coordinates.longitude}`;
        continente.textContent = getContinentByCountry(usuarioAPI.location.country);
        
        // Enlaces
        ubicacionLink.href = `paises_individual.html?country=${usuarioAPI.nat}`;
        zonaHorariaLink.href = `paises_individual.html?country=${usuarioAPI.nat}`;
        idiomasLink.href = `paises_individual.html?country=${usuarioAPI.nat}`;
        continenteLink.href = `paises_individual.html?country=${usuarioAPI.nat}`;
        coordenadasLink.href = `weather.html?lat=${usuarioAPI.location.coordinates.latitude}&lon=${usuarioAPI.location.coordinates.longitude}`;
        nacionalidadLink.href = `weather.html?country=${usuarioAPI.location.country}`;
        ciudadLink.href = `weather.html?state=${usuarioAPI.location.state}&capital=${usuarioAPI.location.city}`;
        
    } catch (error) {
        console.error('Error al obtener datos del usuario', error);
    }
}

const getContinentByCountry = (country) => {
    // Mapea países a continentes, puedes mejorar esta función con un mapeo más preciso
    const continents = {
        "Africa": ["Algeria", "Nigeria", "Egypt"],
        "Asia": ["China", "India", "Japan"],
        "Europe": ["France", "Germany", "United Kingdom"],
        "North America": ["United States", "Canada", "Mexico"],
        "South America": ["Brazil", "Argentina", "Colombia"],
        "Oceania": ["Australia", "New Zealand", "Fiji"]
    };
    
    for (let continent in continents) {
        if (continents[continent].includes(country)) {
            return continent;
        }
    }
    return "Unknown"; // Devuelve "Desconocido" si no encuentra el país
};

boton.addEventListener('click', generarUsuario);
document.addEventListener('DOMContentLoaded', generarUsuario);

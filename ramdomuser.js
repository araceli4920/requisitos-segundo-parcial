const boton = document.querySelector("#boton");
const foto = document.querySelector('#foto');
const nombre = document.querySelector('#nombre');
const correo = document.querySelector('#correo');
const ubicacion = document.querySelector('#ubicacion');
const ubicacionLink = document.querySelector('#ubicacionLink');
const ciudad = document.querySelector('#ciudad');
const ciudadLink = document.querySelector('#ciudadLink');
const zonaHoraria = document.querySelector('#zona-horaria');
const Phone = document.querySelector('#Phone');
const coordenadas = document.querySelector('#coordenadas');
const Registdate = document.querySelector('#Registdate');
const nacionalidad = document.querySelector('#nacionalidad');


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
        Phone.textContent = usuarioAPI.phone;
        coordenadas.textContent = `Latitud ${usuarioAPI.location.coordinates.latitude}, Longitud ${usuarioAPI.location.coordinates.longitude}`;
        Registdate.textContent = usuarioAPI.registered.date
        
        // Enlaces
        ubicacionLink.href = `paises_individual.html?country=${usuarioAPI.nat}`;
        ciudadLink.href = `weather.html?state=${usuarioAPI.location.state}&capital=${usuarioAPI.location.city}`;
        
    } catch (error) {
        console.error('Error al obtener datos del usuario', error);
    }
}

boton.addEventListener('click', generarUsuario);
document.addEventListener('DOMContentLoaded', generarUsuario);

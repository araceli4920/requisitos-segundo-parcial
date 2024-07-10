const boton = document.querySelector("#boton");
const foto = document.querySelector('#foto');
const nombre = document.querySelector('#nombre');
const correo = document.querySelector('#correo');
const telefono = document.querySelector('#telefono');
const ubicacion = document.querySelector('#ubicacion');
const linkNacionalidad = document.querySelector('#linkNacionalidad');
const contrasena = document.querySelector('#contrasena');
const fechaNacimiento = document.querySelector('#fecha-nacimiento');
const edad = document.querySelector('#edad');
const usuario = document.querySelector('#usuario');
const zonaHoraria = document.querySelector('#zona-horaria');
const latitud = document.querySelector('#latitud');
const longitud = document.querySelector('#longitud');

// Función para manejar el clic en el enlace de Nacionalidad
const handleNacionalidadClick = () => {
    const nat = nacionalidad.textContent.toLowerCase(); // Obtener la nacionalidad y convertirla a minúsculas
    const url = `paises.php?nat=${nat}`; // Construir la URL con el parámetro de nacionalidad

    // Redirigir a la página de países con la nacionalidad como parámetro
    window.location.href = url;
};

// Agregar evento de clic al enlace de Nacionalidad
linkNacionalidad.addEventListener('click', handleNacionalidadClick);

const generarContrasena = () => {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let contraseña = '';
    for (let i = 0; i < 10; i++) {
        contraseña += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return contraseña;
}

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
        telefono.textContent = usuarioAPI.phone;
        ubicacion.textContent = `${usuarioAPI.location.city}, ${usuarioAPI.location.country}`;
        nacionalidad.textContent = usuarioAPI.nat;
        usuario.textContent = usuarioAPI.login.username;
        zonaHoraria.textContent = usuarioAPI.location.timezone.offset;
        latitud.textContent = usuarioAPI.location.coordinates.latitude;
        longitud.textContent = usuarioAPI.location.coordinates.longitude;
        
        // Generar y mostrar contraseña
        const nuevaContrasena = generarContrasena();
        contrasena.textContent = nuevaContrasena;
        
        // Obtener fecha de nacimiento y calcular edad
        const fechaNac = new Date(usuarioAPI.dob.date);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        fechaNacimiento.textContent = fechaNac.toLocaleDateString('es-ES', options);

        const hoy = new Date();
        const edadUsuario = hoy.getFullYear() - fechaNac.getFullYear();
        // Verificar si ya cumplió años en el año actual
        if (hoy.getMonth() < fechaNac.getMonth() ||
            (hoy.getMonth() === fechaNac.getMonth() && hoy.getDate() < fechaNac.getDate())) {
            edad.textContent = edadUsuario - 1;
        } else {
            edad.textContent = edadUsuario;
        }
        
    } catch (error) {
        console.error('Error al obtener datos del usuario', error);
    }
}

boton.addEventListener('click', generarUsuario);
document.addEventListener('DOMContentLoaded', generarUsuario);


// Contador de visitas
let visitas = localStorage.getItem('visitas') || 0;
visitas = parseInt(visitas) + 1;
localStorage.setItem('visitas', visitas);

// Mostrar contador de visitas
document.getElementById('contador').textContent = visitas;

// Función para iniciar la galería con transición
document.querySelector('.entrar').addEventListener('click', function () {
    const portada = document.getElementById('portada');
    const galeria = document.getElementById('galeria');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const clickSound = document.getElementById('clickSound');

    // Reproducir sonido de transición
    clickSound.currentTime = 0;
    clickSound.play();

    // Ocultar portada y mostrar galería con transición
    portada.style.display = 'none';
    galeria.style.display = 'flex';
    setTimeout(() => {
        galeria.classList.add('visible');
    }, 10);

    // Reproducir música de fondo (volumen bajo)
    backgroundMusic.volume = 0.3;
    backgroundMusic.play();
});

// Reloj digital
function actualizarReloj() {
    const ahora = new Date();
    const horas = ahora.getHours().toString().padStart(2, '0');
    const minutos = ahora.getMinutes().toString().padStart(2, '0');
    const segundos = ahora.getSeconds().toString().padStart(2, '0');
    document.getElementById('reloj').textContent = `${horas}:${minutos}:${segundos}`;
}

setInterval(actualizarReloj, 1000);
actualizarReloj(); // Mostrar el reloj inmediatamente

// Ocultar/mostrar música
document.getElementById('toggleMusic').addEventListener('click', function () {
    const backgroundMusic = document.getElementById('backgroundMusic');
    const toggleButton = document.getElementById('toggleMusic');

    if (backgroundMusic.paused) {
        backgroundMusic.play();
        toggleButton.textContent = 'Ocultar Música';
    } else {
        backgroundMusic.pause();
        toggleButton.textContent = 'Mostrar Música';
    }
});

// Variables globales para la galería
let indiceImagenActual = 0;
const imagenesGaleria = document.querySelectorAll('.imagen-galeria');

// Funcionalidad de zoom
function mostrarZoom(imagen) {
    const overlay = document.getElementById('overlay');
    const imagenZoom = document.getElementById('imagenZoom');

    // Asignar la fuente de la imagen
    imagenZoom.src = imagen.src;

    // Guardar el índice de la imagen actual
    indiceImagenActual = Array.from(imagenesGaleria).indexOf(imagen);

    // Mostrar el overlay
    overlay.style.display = 'flex';

    // Hacer visible la imagen después de un breve retraso
    setTimeout(() => {
        imagenZoom.classList.add('visible');
    }, 10);

    // Habilitar el desplazamiento con teclas
    document.addEventListener('keydown', manejarTeclas);
}

// Ocultar el zoom
function ocultarZoom(event) {
    if (event.target === document.getElementById('overlay')) {
        const overlay = document.getElementById('overlay');
        const imagenZoom = document.getElementById('imagenZoom');

        // Ocultar la imagen antes de cerrar el overlay
        imagenZoom.classList.remove('visible');
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 500); // Esperar a que termine la transición

        // Deshabilitar el desplazamiento con teclas
        document.removeEventListener('keydown', manejarTeclas);
    }
}

// Cambiar imagen en el zoom
function cambiarImagen(direccion, event) {
    event.stopPropagation(); // Evitar que el clic cierre el overlay

    // Ocultar la imagen actual
    const imagenZoom = document.getElementById('imagenZoom');
    imagenZoom.classList.remove('visible');

    // Calcular el nuevo índice después de un breve retraso
    setTimeout(() => {
        indiceImagenActual += direccion;

        // Asegurarse de que el índice esté dentro de los límites
        if (indiceImagenActual < 0) {
            indiceImagenActual = imagenesGaleria.length - 1;
        } else if (indiceImagenActual >= imagenesGaleria.length) {
            indiceImagenActual = 0;
        }

        // Mostrar la nueva imagen
        imagenZoom.src = imagenesGaleria[indiceImagenActual].src;
        imagenZoom.classList.add('visible');
    }, 500); // Esperar a que termine la transición
}

// Manejar teclas de flecha
function manejarTeclas(event) {
    if (event.key === 'ArrowLeft') {
        cambiarImagen(-1, event);
    } else if (event.key === 'ArrowRight') {
        cambiarImagen(1, event);
    }
}

// Event listeners para las imágenes
imagenesGaleria.forEach(img => {
    img.addEventListener('click', () => mostrarZoom(img));
});

// Event listener para cerrar el zoom al hacer clic fuera de la imagen
document.getElementById('overlay').addEventListener('click', ocultarZoom);

// Event listeners para los botones de desplazamiento
document.querySelector('.boton-desplazar.izquierda').addEventListener('click', (event) => cambiarImagen(-1, event));
document.querySelector('.boton-desplazar.derecha').addEventListener('click', (event) => cambiarImagen(1, event));

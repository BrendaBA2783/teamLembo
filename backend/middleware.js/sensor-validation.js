// Se realiza un objeto con los campos del formulario
const sensorData = {
    idSensor: '',
    unidadMedida: '',
    tipoSensor: '',
    tiempoEscaneo: '',
    nombre: '',
    estado: '',
    imagen: '',
    descripcion: ''
};

// Seleccionando los elementos del formulario
const idSensor = document.querySelector('.id-sensor');
const unidadMedida = document.querySelector('.unidad-medida');
const tipoSensor = document.querySelector('.tipo-sensor');
const tiempoEscaneo = document.querySelector('.tiempo-escaneo');
const nombre = document.querySelector('.nombre');
const estado = document.querySelector('.estado');
const imagen = document.querySelector('.imagen-sensor');
const descripcion = document.querySelector('.descripcion');
const botonActualizar = document.querySelector('.main__form-button');
const mainContainer = document.querySelector('.main__container');

// Agregando event listeners a cada campo
idSensor.addEventListener('input', readText);
unidadMedida.addEventListener('input', readText);
tipoSensor.addEventListener('input', readText);
tiempoEscaneo.addEventListener('input', readText);
nombre.addEventListener('input', readText);
estado.addEventListener('input', readText);
imagen.addEventListener('input', readText);
descripcion.addEventListener('input', readText);

// Event listener para el botón de actualizar
botonActualizar.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('Intentando actualizar sensor');
    
    const { idSensor, unidadMedida, tipoSensor, tiempoEscaneo, nombre, estado, imagen, descripcion } = sensorData;
    
    // Validar que todos los campos estén completos
    if (idSensor === '' || unidadMedida === '' || tipoSensor === '' || tiempoEscaneo === '' || 
        nombre === '' || estado === '' || imagen === '' || descripcion === '') {
        showError('Todos los campos son obligatorios');
        return;
    }
    
    // Validación específica para tiempo de escaneo (asegurando que sea numérico)
    if (isNaN(tiempoEscaneo)) {
        showError('El tiempo de escaneo debe ser un valor numérico');
        return;
    }
    
    showSuccess('Sensor actualizado satisfactoriamente');
});

// Función para mostrar mensajes de error
function showError(message) {
    console.log(message);
    const error = document.createElement('P');
    error.textContent = message;
    error.classList.add('error');
    
    mainContainer.appendChild(error);
    
    setTimeout(() => {
        error.remove();
    }, 4000);
}

// Función para mostrar mensajes de éxito
function showSuccess(message) {
    const goodData = document.createElement('P');
    goodData.textContent = message;
    goodData.classList.add('correct');
    
    mainContainer.appendChild(goodData);
    
    // Elimina el mensaje después de 1 segundo
    setTimeout(() => {
        goodData.remove();
        
        // Redirige a otra vista después de que se quite el mensaje
        window.location.href = 'confirm-update-register-enable-disable.html';
    }, 1000);
}

// Función callback para leer el texto de los inputs
function readText(e) {
    // Determinamos qué campo se está modificando basado en su posición
    const index = Array.from(document.querySelectorAll('.main__form-field')).indexOf(e.target);
    
    if (index === 0) {
        sensorData.idSensor = e.target.value;
    } 
    else if (index === 1) {
        sensorData.unidadMedida = e.target.value;
    } 
    else if (index === 2) {
        sensorData.tipoSensor = e.target.value;
    } 
    else if (index === 3) {
        sensorData.tiempoEscaneo = e.target.value;
    } 
    else if (index === 4) {
        sensorData.nombre = e.target.value;
    } 
    else if (index === 5) {
        sensorData.estado = e.target.value;
    } 
    else if (index === 6) {
        sensorData.imagen = e.target.value;
    } 
    else if (e.target.classList.contains('main__form-field--description')) {
        sensorData.descripcion = e.target.value;
    }
}
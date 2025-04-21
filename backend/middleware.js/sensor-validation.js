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
const idSensor = document.querySelector('.main__form-field--sensor-id');
const unidadMedida = document.querySelector('.main__form-field--unit-measure');
const tipoSensor = document.querySelector('.main__form-field--sensor-type');
const tiempoEscaneo = document.querySelector('.main__form-field--scan-time');
const nombre = document.querySelector('.main__form-field--name');
const estado = document.querySelector('.main__form-field--state');
const imagen = document.querySelector('.main__form-field--sensor-image');
const descripcion = document.querySelector('.main__form-field--description');
const botonActualizar = document.querySelector('.main__form-button');
const mainContainer = document.querySelector('.main__container');

// Agregando event listeners a cada campo
idSensor.addEventListener('input', readText);
unidadMedida.addEventListener('input', readText);
tipoSensor.addEventListener('input', readText);
tiempoEscaneo.addEventListener('input', readText);
nombre.addEventListener('input', readText);
estado.addEventListener('input', readText);
imagen.addEventListener('change', readText); 
descripcion.addEventListener('input', readText);

// Validaciones adicionales para campos específicos
idSensor.addEventListener('input', function(e) {
    if (isNaN(e.target.value)) {
        e.preventDefault();
        showError('El ID del sensor debe contener solo números');
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    }
});

unidadMedida.addEventListener('input', function(e) {
    if (isNaN(e.target.value)) {
        e.preventDefault();
        showError('La unidad de medida debe contener solo números');
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    }
});

// Validación para tipoSensor - no permitir caracteres especiales
tipoSensor.addEventListener('input', function(e) {
    // Expresión regular que permite solo letras y números
    const regex = /[^a-zA-Z0-9\s]/;
    
    if (regex.test(e.target.value)) {
        e.preventDefault();
        showError('El tipo de sensor no puede contener caracteres especiales');
        e.target.value = e.target.value.replace(regex, '');
    }
});

// Validación para tiempo de escaneo - no permitir caracteres especiales
tiempoEscaneo.addEventListener('input', function(e) {
    // Expresión regular que permite solo letras y números
    const regex = /[^a-zA-Z0-9\s]/;
    
    if (regex.test(e.target.value)) {
        e.preventDefault();
        showError('El tiempo de escaneo no puede contener caracteres especiales');
        e.target.value = e.target.value.replace(regex, '');
    }
});

// Event listener para el botón de actualizar
botonActualizar.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('Intentando actualizar sensor');
    
    // Validar que todos los campos estén completos
    if (sensorData.idSensor === '' || sensorData.unidadMedida === '' || sensorData.tipoSensor === '' || 
        sensorData.tiempoEscaneo === '' || sensorData.nombre === '' || sensorData.estado === '' || 
        sensorData.imagen === '' || sensorData.descripcion === '') {
        showError('Todos los campos son obligatorios');
        return;
    }
    
    // Validación específica para imagen (asegurando que se haya subido una)
    if (sensorData.imagen === '') {
        showError('Es obligatorio subir una imagen');
        return;
    }
    
    // Validación para asegurar que ID y unidad de medida contengan solo números
    if (!/^\d+$/.test(sensorData.idSensor)) {
        showError('El ID del sensor debe contener solo números');
        return;
    }
    
    if (!/^\d+$/.test(sensorData.unidadMedida)) {
        showError('La unidad de medida debe contener solo números');
        return;
    }
    
    // Validación para asegurar que tipo de sensor y tiempo de escaneo no contengan caracteres especiales
    if (/[^a-zA-Z0-9\s]/.test(sensorData.tipoSensor)) {
        showError('El tipo de sensor no puede contener caracteres especiales');
        return;
    }
    
    if (/[^a-zA-Z0-9\s]/.test(sensorData.tiempoEscaneo)) {
        showError('El tiempo de escaneo no puede contener caracteres especiales');
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
    if (e.target.classList.contains('main__form-field--sensor-id')) {
        sensorData.idSensor = e.target.value;
    } 
    else if (e. target.classList.contains('main__form-field--unit-measure')) {
        sensorData.unidadMedida = e.target.value;
    } 
    else if (e.target.classList.contains('main__form-field--sensor-type')) {
        sensorData.tipoSensor = e.target.value;
    } 
    else if (e.target.classList.contains('main__form-field--scan-time')) {
        sensorData.tiempoEscaneo = e.target.value;
    } 
    else if (e.target.classList.contains('main__form-field--name')) {
        sensorData.nombre = e.target.value;
    } 
    else if (e.target.classList.contains('main__form-field--state')) {
        sensorData.estado = e.target.value;
    } 
    else if (e.target.classList.contains('main__form-field--sensor-image')) {
        // Para campos tipo file, guardamos el nombre del archivo
        sensorData.imagen = e.target.files.length > 0 ? e.target.files[0].name : '';
    } 
    else if (e.target.classList.contains('main__form-field--description')) {
        sensorData.descripcion = e.target.value;
    }
}
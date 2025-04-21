// Se realiza un objeto con los campos del formulario
const cicloData = {
    idCiclo: '',
    ubicacion: '',
    nombreCiclo: '',
    estado: '',
    novedades: '',
    fechaInicio: '',
    fechaFin: '',
    descripcion: ''
};

// Función para verificar si contiene caracteres especiales
function hasSpecialChars(text) {
    const specialCharsRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    return specialCharsRegex.test(text);
}

// Seleccionando los elementos del formulario
const idCiclo = document.querySelector('.main__form-field--cycle-id');
const ubicacion = document.querySelector('.main__form-field--location');
const nombreCiclo = document.querySelector('.main__form-field--cycle-name');
const estado = document.querySelector('.main__form-field--state');
const novedades = document.querySelector('.main__form-field--news');
const fechaInicio = document.querySelector('.main__form-field--start-date');
const fechaFin = document.querySelector('.main__form-field--end-date');
const descripcion = document.querySelector('.main__form-field--description');
const botonRegistrar = document.querySelector('.main__form-field--register-button');
const mainContainer = document.querySelector('.main__container');

// Agregando event listeners a cada campo
idCiclo.addEventListener('input', readText);
ubicacion.addEventListener('input', readText);
nombreCiclo.addEventListener('input', readText);
estado.addEventListener('input', readText);
novedades.addEventListener('input', readText);
fechaInicio.addEventListener('input', readText);
fechaFin.addEventListener('input', readText);
descripcion.addEventListener('input', readText);

// Validación específica para el ID del ciclo (solo números)
idCiclo.addEventListener('input', function(e) {
    if (isNaN(e.target.value)) {
        e.preventDefault();
        showError('El ID del ciclo debe contener solo números');
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    }
});

// Validación para nombre del ciclo (sin caracteres especiales)
nombreCiclo.addEventListener('input', function(e) {
    if (hasSpecialChars(e.target.value)) {
        e.preventDefault();
        showError('El nombre del ciclo no puede contener caracteres especiales');
        e.target.value = e.target.value.replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/g, '');
    }
});

// Validación para descripción (sin caracteres especiales)
descripcion.addEventListener('input', function(e) {
    if (hasSpecialChars(e.target.value)) {
        e.preventDefault();
        showError('La descripción no puede contener caracteres especiales');
        e.target.value = e.target.value.replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/g, '');
    }
});

// Validación para las fechas
fechaFin.addEventListener('change', function(e) {
    const inicio = new Date(fechaInicio.value);
    const fin = new Date(fechaFin.value);
    
    if (fechaInicio.value && fechaFin.value && inicio >= fin) {
        e.preventDefault();
        showError('La fecha inicial debe ser menor a la fecha final');
        fechaFin.value = ''; // Limpiar el campo de fecha final
    }
});

// Event listener para el botón de registrar
botonRegistrar.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('Intentando registrar ciclo de cultivo');
    
    // Validar que todos los campos estén completos
    if (cicloData.idCiclo === '' || cicloData.ubicacion === '' || cicloData.nombreCiclo === '' || cicloData.estado === '' || 
        cicloData.novedades === '' || cicloData.fechaInicio === '' || cicloData.fechaFin === '' || cicloData.descripcion === '') {
        showError('Todos los campos son obligatorios');
        return;
    }
    
    // Validar que el ID solo contenga números
    if (!/^\d+$/.test(cicloData.idCiclo)) {
        showError('El ID del ciclo debe contener solo números');
        return;
    }
    
    // Validar que los campos específicos no contengan caracteres especiales
    if (hasSpecialChars(cicloData.nombreCiclo)) {
        showError('El nombre del ciclo no puede contener caracteres especiales');
        return;
    }
    
    if (hasSpecialChars(cicloData.descripcion)) {
        showError('La descripción no puede contener caracteres especiales');
        return;
    }
    
    // Validar que la fecha fin sea posterior a la fecha inicio
    if (new Date(cicloData.fechaFin) <= new Date(cicloData.fechaInicio)) {
        showError('La fecha inicial debe ser menor a la fecha final');
        return;
    }
    
    showSuccess('Ciclo de cultivo registrado satisfactoriamente');
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
    if (e.target.classList.contains('main__form-field--cycle-id')) {
        cicloData.idCiclo = e.target.value;
    } 
    else if (e.target.classList.contains('main__form-field--location')) {
        cicloData.ubicacion = e.target.value;
    } 
    else if (e.target.classList.contains('main__form-field--cycle-name')) {
        cicloData.nombreCiclo = e.target.value;
    } 
    else if (e.target.classList.contains('main__form-field--state')) {
        cicloData.estado = e.target.value;
    } 
    else if (e.target.classList.contains('main__form-field--news')) {
        cicloData.novedades = e.target.value;
    } 
    else if (e.target.classList.contains('main__form-field--start-date')) {
        cicloData.fechaInicio = e.target.value;
    } 
    else if (e.target.classList.contains('main__form-field--end-date')) {
        cicloData.fechaFin = e.target.value;
    } 
    else if (e.target.classList.contains('main__form-field--description')) {
        cicloData.descripcion = e.target.value;
    }
}
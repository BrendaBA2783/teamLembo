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

// Seleccionando los elementos del formulario
const idCiclo = document.querySelector('.id-ciclo');
const ubicacion = document.querySelector('.ubicacion');
const nombreCiclo = document.querySelector('.nombre-ciclo');
const estado = document.querySelector('.estado');
const novedades = document.querySelector('.novedades');
const fechaInicio = document.querySelector('.fecha-inicio');
const fechaFin = document.querySelector('.fecha-fin');
const descripcion = document.querySelector('.descripcion');
const botonRegistrar = document.querySelector('.boton-registrar');
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
    
    if (inicio && fin && inicio >= fin) {
        e.preventDefault();
        showError('La fecha inicial debe ser menor a la fecha final');
        fechaFin.value = ''; // Limpiar el campo de fecha final
    }
});

// Event listener para el botón de registrar
botonRegistrar.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('Intentando registrar ciclo de cultivo');
    
    const { idCiclo, ubicacion, nombreCiclo, estado, novedades, fechaInicio, fechaFin, descripcion } = cicloData;
    
    // Validar que todos los campos estén completos
    if (idCiclo === '' || ubicacion === '' || nombreCiclo === '' || estado === '' || 
        novedades === '' || fechaInicio === '' || fechaFin === '' || descripcion === '') {
        showError('Todos los campos son obligatorios');
        return;
    }
    
    // Validar que el ID solo contenga números
    if (!/^\d+$/.test(idCiclo)) {
        showError('El ID del ciclo debe contener solo números');
        return;
    }
    
    // Validar que los campos específicos no contengan caracteres especiales
    if (hasSpecialChars(nombreCiclo)) {
        showError('El nombre del ciclo no puede contener caracteres especiales');
        return;
    }
    
    if (hasSpecialChars(descripcion)) {
        showError('La descripción no puede contener caracteres especiales');
        return;
    }
    
    // Validar que la fecha fin sea posterior a la fecha inicio
    if (new Date(fechaFin) <= new Date(fechaInicio)) {
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
    if (e.target.classList.contains('id-ciclo')) {
        cicloData.idCiclo = e.target.value;
    } 
    else if (e.target.classList.contains('ubicacion')) {
        cicloData.ubicacion = e.target.value;
    } 
    else if (e.target.classList.contains('nombre-ciclo')) {
        cicloData.nombreCiclo = e.target.value;
    } 
    else if (e.target.classList.contains('estado')) {
        cicloData.estado = e.target.value;
    } 
    else if (e.target.classList.contains('novedades')) {
        cicloData.novedades = e.target.value;
    } 
    else if (e.target.classList.contains('fecha-inicio')) {
        cicloData.fechaInicio = e.target.value;
    } 
    else if (e.target.classList.contains('fecha-fin')) {
        cicloData.fechaFin = e.target.value;
    } 
    else if (e.target.classList.contains('descripcion')) {
        cicloData.descripcion = e.target.value;
    }
}
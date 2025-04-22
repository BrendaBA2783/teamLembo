// Se realiza un objeto con los campos del formulario
const cycleData = {
    cycleId: '',
    locationField: '',
    cycleName: '',
    statusField: '',
    news: '',
    startDate: '',
    endDate: '',
    description: ''
};

// Función para verificar si contiene caracteres especiales
function hasSpecialChars(text) {
    const specialCharsRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    return specialCharsRegex.test(text);
}

// Seleccionando los elementos del formulario
const cycleId = document.querySelector('.main__form-field--cycle-id');
const locationField = document.querySelector('.main__form-field--location');
const cycleName = document.querySelector('.main__form-field--cycle-name');
const statusField = document.querySelector('.main__form-field--state');
const news = document.querySelector('.main__form-field--news');
const startDate = document.querySelector('.main__form-field--start-date');
const endDate = document.querySelector('.main__form-field--end-date');
const description = document.querySelector('.main__form-field--description');
const registerButton = document.querySelector('.main__form-field--register-button');
const mainContainer = document.querySelector('.main__container');

// Agregando event listeners a cada campo
cycleId.addEventListener('input', readText);
locationField.addEventListener('input', readText);
cycleName.addEventListener('input', readText);
statusField.addEventListener('input', readText);
news.addEventListener('input', readText);
startDate.addEventListener('input', readText);
endDate.addEventListener('input', readText);
description.addEventListener('input', readText);

// Validación modificada para el ID del ciclo (letras y números)
cycleId.addEventListener('input', function(e) {
    // Regex que permite solo letras y números (sin caracteres especiales)
    const regex = /[^a-zA-Z0-9]/g;
    
    if (regex.test(e.target.value)) {
        e.preventDefault();
        showError('El ID del ciclo debe contener solo letras y números');
        e.target.value = e.target.value.replace(regex, '');
    }
});

// Validación para nombre del ciclo (sin caracteres especiales)
cycleName.addEventListener('input', function(e) {
    if (hasSpecialChars(e.target.value)) {
        e.preventDefault();
        showError('El nombre del ciclo no puede contener caracteres especiales');
        e.target.value = e.target.value.replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/g, '');
    }
});

// Validación para descripción (sin caracteres especiales)
description.addEventListener('input', function(e) {
    if (hasSpecialChars(e.target.value)) {
        e.preventDefault();
        showError('La descripción no puede contener caracteres especiales');
        e.target.value = e.target.value.replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/g, '');
    }
});

// Validación para las fechas
endDate.addEventListener('change', function(e) {
    const start = new Date(startDate.value);
    const end = new Date(endDate.value);
    
    if (startDate.value && endDate.value && start >= end) {
        e.preventDefault();
        showError('La fecha inicial debe ser menor a la fecha final');
        endDate.value = ''; // Limpiar el campo de fecha final
    }
});

// Event listener para el botón de registrar
registerButton.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('Intentando registrar ciclo de cultivo');
    
    // Validar que todos los campos estén completos
    if (cycleData.cycleId === '' || cycleData.locationField === '' || cycleData.cycleName === '' || cycleData.statusField === '' || 
        cycleData.news === '' || cycleData.startDate === '' || cycleData.endDate === '' || cycleData.description === '') {
        showError('Todos los campos son obligatorios');
        return;
    }
    
    // Validación modificada para el ID (permite letras y números)
    if (/[^a-zA-Z0-9]/.test(cycleData.cycleId)) {
        showError('El ID del ciclo debe contener solo letras y números');
        return;
    }
    
    // Validar que los campos específicos no contengan caracteres especiales
    if (hasSpecialChars(cycleData.cycleName)) {
        showError('El nombre del ciclo no puede contener caracteres especiales');
        return;
    }
    
    if (hasSpecialChars(cycleData.description)) {
        showError('La descripción no puede contener caracteres especiales');
        return;
    }
    
    // Validar que la fecha fin sea posterior a la fecha inicio
    if (new Date(cycleData.endDate) <= new Date(cycleData.startDate)) {
        showError('La fecha inicial debe ser menor a la fecha final');
        return;
    }
    
    showSuccess('El formulario ha sido completado correctamente');
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
        cycleData.cycleId = e.target.value;
    } 
    else if (e.target.classList.contains('main__form-field--location')) {
        cycleData.locationField = e.target.value;
    } 
    else if (e.target.classList.contains('main__form-field--cycle-name')) {
        cycleData.cycleName = e.target.value;
    } 
    else if (e.target.classList.contains('main__form-field--state')) {
        cycleData.statusField = e.target.value;
    } 
    else if (e.target.classList.contains('main__form-field--news')) {
        cycleData.news = e.target.value;
    } 
    else if (e.target.classList.contains('main__form-field--start-date')) {
        cycleData.startDate = e.target.value;
    } 
    else if (e.target.classList.contains('main__form-field--end-date')) {
        cycleData.endDate = e.target.value;
    } 
    else if (e.target.classList.contains('main__form-field--description')) {
        cycleData.description = e.target.value;
    }
}
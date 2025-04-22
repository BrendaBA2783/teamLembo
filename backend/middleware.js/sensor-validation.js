// Object with form fields
const sensorData = {
    sensorId: '',
    measureUnit: '',
    sensorType: '',
    scanTime: '',
    name: '',
    status: '',
    image: '',
    description: ''
};

// Selecting form elements
const sensorId = document.querySelector('.main__form-field--sensor-id');
const measureUnit = document.querySelector('.main__form-field--unit-measure');
const sensorType = document.querySelector('.main__form-field--sensor-type');
const scanTime = document.querySelector('.main__form-field--scan-time');
const nameSensor = document.querySelector('.main__form-field--name');
const statusSensor = document.querySelector('.main__form-field--state');
const image = document.querySelector('.main__form-upload input[type="file"]');
const description = document.querySelector('.main__form-field--description');
const updateButton = document.querySelector('.main__form-button');
const mainContainer = document.querySelector('.main__container');

// Adding event listeners to each field
sensorId.addEventListener('input', readText);
measureUnit.addEventListener('input', readText);
sensorType.addEventListener('input', readText);
scanTime.addEventListener('input', readText);
nameSensor.addEventListener('input', readText);
statusSensor.addEventListener('input', readText);
image.addEventListener('change', readText); 
description.addEventListener('input', readText);

// Validación modificada para sensorId para permitir letras y números
sensorId.addEventListener('input', function(e) {
    
    // Regex que permite solo letras y números (sin caracteres especiales)
    const regex = /[^a-zA-Z0-9]/g;
    
    if (regex.test(e.target.value)) {
        e.preventDefault();
        showError('El ID del sensor solo puede contener letras y números');
        e.target.value = e.target.value.replace(regex, '');
    }
});

// Validación modificada para measureUnit para permitir letras y números
measureUnit.addEventListener('input', function(e) {
    // Regex que permite solo letras y números (sin caracteres especiales)
    const regex = /[^a-zA-Z0-9\s]/;
    
    if (regex.test(e.target.value)) {
        e.preventDefault();
        showError('La unidad de medida solo puede contener letras y números');
        e.target.value = e.target.value.replace(regex, '');
    }
});

// Validation for sensorType - no special characters
sensorType.addEventListener('input', function(e) {
    // Regex that allows only letters and numbers
    const regex = /[^a-zA-Z0-9\s]/;
    
    if (regex.test(e.target.value)) {
        e.preventDefault();
        showError('El tipo de sensor no puede contener caracteres especiales');
        e.target.value = e.target.value.replace(regex, '');
    }
});

// Validation for scanTime - no special characters
scanTime.addEventListener('input', function(e) {
    // Regex that allows only letters and numbers
    const regex = /[^a-zA-Z0-9\s]/;
    
    if (regex.test(e.target.value)) {
        e.preventDefault();
        showError('El tiempo de escaneo no puede contener caracteres especiales');
        e.target.value = e.target.value.replace(regex, '');
    }
});

// Validation for nameSensor - no special characters
nameSensor.addEventListener('input', function(e) {
    // Regex that allows only letters and numbers
    const regex = /[^a-zA-Z0-9\s]/;
    
    if (regex.test(e.target.value)) {
        e.preventDefault();
        showError('El nombre del sensor no puede contener caracteres especiales');
        e.target.value = e.target.value.replace(regex, '');
    }
});

// Event listener for update button
updateButton.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('Attempting to update sensor');

    // Actualiza los datos del objeto sensorData
    sensorData.sensorId = sensorId.value;
    sensorData.measureUnit = measureUnit.value;
    sensorData.sensorType = sensorType.value;
    sensorData.scanTime = scanTime.value;
    sensorData.nameSensor = nameSensor.value;
    sensorData.statusSensor = statusSensor.value;
    sensorData.image = image.files.length > 0 ? image.files[0].name : '';
    sensorData.description = description.value;
    
    // Validate all fields are completed
    if (sensorData.sensorId === '' || sensorData.measureUnit === '' || sensorData.sensorType === '' || 
        sensorData.scanTime === '' || sensorData.nameSensor === '' || sensorData.statusSensor === '' || 
        sensorData.image === '' || sensorData.description === '') {
        showError('Todos los campos son obligatorios');
        return;
    }

    // Specific validation for image (ensuring one was uploaded)
    if (sensorData.image === '') {
        showError('Se debe subir una imágen');
        return;
    }

    // Validación modificada para asegurar que el ID contenga solo letras y números
    if (/[^a-zA-Z0-9]/.test(sensorData.sensorId)) {
        showError('El ID del sensor solo puede contener letras y números');
        return;
    }

    // Modificada la validación para permitir letras y números en unidad de medida
    if (/[^a-zA-Z0-9\s]/.test(sensorData.measureUnit)) {
        showError('La unidad de medida solo puede contener letras y números');
        return;
    }

    // Validation to ensure sensor type and scan time don't contain special characters
    if (/[^a-zA-Z0-9\s]/.test(sensorData.sensorType)) {
        showError('El tipo de sensor no puede contener caracteres especiales');
        return;
    }

    if (/[^a-zA-Z0-9\s]/.test(sensorData.scanTime)) {
        showError('El tiempo de escaneo no puede contener caracteres especiales');
        return;
    }

    // Validation to ensure sensor name doesn't contain special characters
    if (/[^a-zA-Z0-9\s]/.test(sensorData.nameSensor)) {
        showError('El nombre del sensor no puede contener caracteres especiales');
        return;
    }

    showSuccess('Formulario finalizado');
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

// Callback function to read input text
function readText(e) {
    if (e.target.classList.contains('main__form-field--sensor-id')) {
        sensorData.sensorId = e.target.value;
    } 
    else if (e.target.classList.contains('main__form-field--unit-measure')) {
        sensorData.measureUnit = e.target.value;
    } 
    else if (e.target.classList.contains('main__form-field--sensor-type')) {
        sensorData.sensorType = e.target.value;
    } 
    else if (e.target.classList.contains('main__form-field--scan-time')) {
        sensorData.scanTime = e.target.value;
    } 
    else if (e.target.classList.contains('main__form-field--name')) {
        sensorData.nameSensor = e.target.value;
    } 
    else if (e.target.classList.contains('main__form-field--state')) {
        sensorData.statusSensor = e.target.value;
    } 
    else if (e.target.classList.contains('main__form-upload input[type="file"]')) {
        // For file fields, we save the filename
        sensorData.image = e.target.files.length > 0 ? e.target.files[0].name : '';
    } 
    else if (e.target.classList.contains('main__form-field--description')) {
        sensorData.description = e.target.value;
    }
}
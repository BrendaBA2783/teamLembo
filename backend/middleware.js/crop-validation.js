//Se crea el objeto 
const cropData = {
    cropId: '', 
    cropType: '',
    cropLocation: '', 
    cropSize: '', 
    cropName: '', 
    cropState: '', 
    cropImage: '', 
    cropDescription: '', 
}; 

//Se selecciona el objeto
const cropId = document.querySelector('.main__form-field--cropId'); 
const cropType = document.querySelector('.main__form-field--cropType'); 
const cropLocation = document.querySelector('.main__form-field--cropLocation'); 
const cropSize = document.querySelector('.main__form-field--cropSize'); 
const cropName = document.querySelector('.main__form-field--cropName'); 
const cropState = document.querySelector('.main__form-field--cropState'); 
const cropImage = document.querySelector('.main__form-field--upload-input'); 
const cropDescription = document.querySelector('.main__form-field--cropDescription'); 
const buttonRegister = document.querySelector('.main__form-field--buttonRegister'); 
const cropForm = document.querySelector('.main__container--cropForm'); 

//Función para verificar si una cadena contiene caracteres especiales
function hasSpecialChars(str) {
    return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(str);
};

//Se seleccionan los inputs 
cropId.addEventListener('input', readText); 
cropType.addEventListener('input', readText); 
cropLocation.addEventListener('input', readText); 
cropSize.addEventListener('input', readText); 
cropName.addEventListener('input', readText); 
cropState.addEventListener('input', readText); 
cropImage.addEventListener('change', readText); 
cropDescription.addEventListener('input', readText); 

cropId.addEventListener('input', function(e) {
    if (hasSpecialChars(e.target.value)) {
        e.preventDefault();
        showError('El ID del cultivo no puede contener caracteres especiales');
        e.target.value = e.target.value.replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/g, '');
    }
});

cropLocation.addEventListener('input', function(e) {
    if (hasSpecialChars(e.target.value)) {
        e.preventDefault();
        showError('La ubicación del cultivo no puede contener caracteres especiales');
        e.target.value = e.target.value.replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/g, '');
    }
});

cropSize.addEventListener('input', function(e) {
    if (hasSpecialChars(e.target.value)) {
        e.preventDefault();
        showError('El tamaño del cultivo no puede contener caracteres especiales');
        e.target.value = e.target.value.replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/g, '');
    }
});

cropName.addEventListener('input', function(e) {
    if (hasSpecialChars(e.target.value)) {
        e.preventDefault();
        showError('El nombre del cultivo no puede contener caracteres especiales');
        e.target.value = e.target.value.replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/g, '');
    }
});

cropDescription.addEventListener('input', function(e) {
    if (hasSpecialChars(e.target.value)) {
        e.preventDefault();
        showError('La descripción del cultivo no puede contener caracteres especiales');
        e.target.value = e.target.value.replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/g, '');
    }
});

// Event listener para el botón de registrar
buttonRegister.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('Intentando registrar usuario');
    
    // Validar que todos los campos estén completos
    if (cropData.cropId === '' || cropData.cropType === '' || cropData.cropLocation === '' || cropData.cropSize === '' || cropData.cropName === '' ||
        cropData.cropState === '' || cropData.cropImage === '' || cropData.cropDescription === '') {
            showError('Todos los campos son obligatorios');
            return;
    }
    
    // Validar que los campos específicos no contengan caracteres especiales
    if (hasSpecialChars(cropData.cropId)) {
        showError('El ID del cultivo no puede contener caracteres especiales');
        return;
    }
    
    if (hasSpecialChars(cropData.cropLocation)) {
        showError('La ubicación del cultivo no puede contener caracteres especiales');
        return;
    }

    if (hasSpecialChars(cropData.cropSize)) {
        showError('El tamaño del cultivo no puede contener caracteres especiales');
        return;
    }

    if (hasSpecialChars(cropData.cropName)) {
        showError('El nombre del cultivo no puede contener caracteres especiales');
        return;
    }

    if (hasSpecialChars(cropData.cropDescription)) {
        showError('La descripción del cultivo no puede contener caracteres especiales');
        return;
    }

    showSuccess('El formulario ha sido completado correctamente');
    
});

function showError(message) {
    console.log(message); 
    const error = document.createElement('P'); 
    error.textContent = message; 
    error.classList.add('error'); 

    cropForm.appendChild(error);
    
    setTimeout(() => {
        error.remove(); 
    }, 4000);
};

function showSuccess(message) {
    const goodData = document.createElement('P');
    goodData.textContent = message;
    goodData.classList.add('correct');

    cropForm.appendChild(goodData);

    // Elimina el mensaje después de 4 segundos
    setTimeout(() => {
        goodData.remove();

        // Redirige a otra vista después de que se quite el mensaje
        window.location.href = 'confirm-update-register-enable-disable.html';
    }, 1000);
};


//colback
function readText(e){
    if(e.target.classList.contains('main__form-field--cropId')) {
        cropData.cropId = e.target.value;
    }
    else if (e.target.classList.contains('main__form-field--cropType')) {
        cropData.cropType = e.target.value;
    } 
    else if (e.target.classList.contains('main__form-field--cropLocation')) {
        cropData.cropLocation = e.target.value;
    } 
    else if (e.target.classList.contains('main__form-field--cropSize')) {
        cropData.cropSize = e.target.value;
    } 
    else if (e.target.classList.contains('main__form-field--cropName')) {
        cropData.cropName = e.target.value;
    } 
    else if (e.target.classList.contains('main__form-field--cropState')) {
        cropData.cropState = e.target.value;
    } 
    else if (e.target.classList.contains('main__form-field--upload-input')) {
        cropData.cropImage = e.target.value;
    } 
    else if (e.target.classList.contains('main__form-field--cropDescription')) {
        cropData.cropDescription = e.target.value;
    }
    console.log(cropData); 
};
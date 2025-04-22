// Se crea el objeto para almacenar los valores de los campos
const cropData = {
    cropId: '',
    cropUpdate: '',
    cropView: '',
    cropMessage: ''
};

// Se seleccionan los elementos del DOM para cada vista
const cropIdInput = document.querySelector('.form__input--cropId');
const cropUpdateInput = document.querySelector('.main__field--cropUpdate');
const cropViewInput = document.querySelector('.main__field--cropView');

// Se seleccionan los contenedores de los formularios para cada vista
const cropForm = document.querySelector('.form__container--cropForm');
const cropIdentificationForm = document.querySelector('.main__container--cropIdentification');
const cropVisualizationForm = document.querySelector('.main__container--cropVisualization');

// Se agregan los event listeners a los inputs para leer el texto y permitir solo números
if (cropIdInput) {
    cropIdInput.addEventListener('input', function(e) {
        if (isNaN(this.value)) {
            e.preventDefault();
            showError('El ID del cultivo debe contener solo números', cropForm); // Usamos cropForm como contenedor de error
            this.value = this.value.replace(/[^0-9]/g, '');
        }
        readText(e);
    });
}
if (cropUpdateInput) {
    cropUpdateInput.addEventListener('input', function(e) {
        if (isNaN(this.value)) {
            e.preventDefault();
            showError('Este campo debe contener solo números', cropIdentificationForm); // Usamos cropIdentificationForm
            this.value = this.value.replace(/[^0-9]/g, '');
        }
        readText(e);
    });
}
if (cropViewInput) {
    cropViewInput.addEventListener('input', function(e) {
        if (isNaN(this.value)) {
            e.preventDefault();
            showError('Este campo debe contener solo números', cropVisualizationForm); // Usamos cropVisualizationForm
            this.value = this.value.replace(/[^0-9]/g, '');
        }
        readText(e);
    });
}

// Se agregan los event listeners a los formularios para la validación
if (cropForm) {
    cropForm.addEventListener("submit", function(e) {
        e.preventDefault(); // Evita el envío del formulario
        console.log('Intento de envío del formulario Crop');
        validateField(cropData.cropId, cropForm);
    });
}

if (cropIdentificationForm) {
    cropIdentificationForm.addEventListener("submit", function(e) {
        e.preventDefault(); // Evita el envío del formulario
        console.log('Intento de envío del formulario');
        validateField(cropData.cropUpdate, cropIdentificationForm);
    });
}

if (cropVisualizationForm) {
    cropVisualizationForm.addEventListener("submit", function(e) {
        e.preventDefault(); // Evita el envío del formulario
        console.log('Intento de envío del formulario');
        validateField(cropData.cropView, cropVisualizationForm);
    });
}

function validateField(fieldValue, formElement) {
    if (fieldValue === '') {
        showError('Este campo es obligatorio', formElement);
        return;
    }
    if (isNaN(fieldValue)) {
        showError('Este campo debe contener solo números', formElement);
        return;
    }
    showSuccess('Datos enviados satisfactoriamente', formElement);
};

function showError(message, formElement) {
    console.log(message);
    const error = document.createElement('P');
    error.textContent = message;
    error.classList.add('error');

    // Asegurarse de que el formElement exista antes de intentar appendChild
    if (formElement) {
        formElement.appendChild(error);

        setTimeout(() => {
            error.remove();
        }, 4000);
    }
}

function showSuccess(message, formElement) {
    const goodData = document.createElement('P');
    goodData.textContent = message;
    goodData.classList.add('correct');

    // Asegurarse de que el formElement exista antes de intentar appendChild
    if (formElement) {
        formElement.appendChild(goodData);

        setTimeout(() => {
            goodData.remove();
            // Se redirecciona la pagína
            if (formElement === cropForm) {
                window.location.href = '.....';
            } else if (formElement === cropIdentificationForm) {
                window.location.href = 'update.html';
            } else if (formElement === cropVisualizationForm) {
                window.location.href = 'visualise.html';
            }
        }, 4000);
    }
}

//Colback
function readText(e) {
    if (e.target.classList.contains('form__input--cropId')) {
        cropData.cropId = e.target.value;
    } else if (e.target.classList.contains('main__field--cropUpdate')) {
        cropData.cropUpdate = e.target.value;
    } else if (e.target.classList.contains('main__field--cropView')) {
        cropData.cropView = e.target.value;
    }
    console.log(cropData);
}
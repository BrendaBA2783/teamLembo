console.log('Estoy aquí');

const suppliesData = {
    suppliesId: '',
    cropcycleId: '',
    cropId: '',
    suppliesType: '',
    suppliesCuantity: '',
    suppliesName: '',
    suppliesState: '',
    suppliesUnitvalue: '',
    suppliesTotalvalue: '',
    suppliesMeasure: '',
    suppliesDescription: ''
};

// Selección de los campos del formulario
const suppliesId = document.querySelector('.main__form-field--suppliesId');
const cropcycleId = document.querySelector('.main__form-field--cropcycleId');
const cropId = document.querySelector('.main__form-field--cropId');
const suppliesType = document.querySelector('.main__form-field--suppliesType');
const suppliesCuantity = document.querySelector('.main__form-field--suppliesCuantity');
const suppliesName = document.querySelector('.main__form-field--suppliesName');
const suppliesState = document.querySelector('.main__form-field--suppliesState');
const suppliesUnitvalue = document.querySelector('.main__form-field--suppliesUnitvalue');
const suppliesTotalvalue = document.querySelector('.main__form-field--suppliesTotalvalue');
const suppliesMeasure = document.querySelector('.main__form-field--suppliesMeasure');
const suppliesDescription = document.querySelector('.main__form-field--suppliesDescription');
const suppliesForm = document.querySelector('.main__container--suppliesForm');
const buttonRegister = document.querySelector('.main__form-button');

// Eventos para actualizar datos
suppliesId.addEventListener('input', readText);
cropcycleId.addEventListener('input', readText);
cropId.addEventListener('input', readText);
suppliesType.addEventListener('input', readText);
suppliesCuantity.addEventListener('input', readText);
suppliesName.addEventListener('input', readText);
suppliesState.addEventListener('input', readText);
suppliesUnitvalue.addEventListener('input', readText);
suppliesTotalvalue.addEventListener('input', readText);
suppliesMeasure.addEventListener('input', readText);
suppliesDescription.addEventListener('input', readText);

// Validaciones con preventDefault
suppliesId.addEventListener('input', function(e) {
    const regex = /[^a-zA-Z0-9]/g;
    if (regex.test(e.target.value)) {
        e.preventDefault();
        showError('El ID del insumo solo puede contener letras y números');
        e.target.value = e.target.value.replace(regex, '');
    }
});

cropcycleId.addEventListener('input', function(e) {
    const regex = /[^a-zA-Z0-9]/g;
    if (regex.test(e.target.value)) {
        e.preventDefault();
        showError('El ID del ciclo solo puede contener letras y números');
        e.target.value = e.target.value.replace(regex, '');
    }
});

cropId.addEventListener('input', function(e) {
    const regex = /[^a-zA-Z0-9]/g;
    if (regex.test(e.target.value)) {
        e.preventDefault();
        showError('El ID del cultivo solo puede contener letras y números');
        e.target.value = e.target.value.replace(regex, '');
    }
});

suppliesType.addEventListener('input', function(e) {
    const regex = /[^a-zA-Z0-9\s]/g;
    if (regex.test(e.target.value)) {
        e.preventDefault();
        showError('El tipo de insumo solo puede contener letras y números');
        e.target.value = e.target.value.replace(regex, '');
    }
});

suppliesCuantity.addEventListener('input', function(e) {
    const regex = /[^0-9]/g;
    if (regex.test(e.target.value)) {
        e.preventDefault();
        showError('La cantidad de insumo solo permite números');
        e.target.value = e.target.value.replace(regex, '');
    }
});

suppliesUnitvalue.addEventListener('input', function(e) {
    const regex = /[^0-9]/g;
    if (regex.test(e.target.value)) {
        e.preventDefault();
        showError('El valor unitario de insumo solo permite números');
        e.target.value = e.target.value.replace(regex, '');
    }
});

suppliesTotalvalue.addEventListener('input', function(e) {
    const regex = /[^0-9]/g;
    if (regex.test(e.target.value)) {
        e.preventDefault();
        showError('El valor total de insumo solo permite números');
        e.target.value = e.target.value.replace(regex, '');
    }
});

suppliesName.addEventListener('input', function(e) {
    const regex = /[^a-zA-Z0-9\s]/g;
    if (regex.test(e.target.value)) {
        e.preventDefault();
        showError('El nombre del insumo no puede contener caracteres especiales');
        e.target.value = e.target.value.replace(regex, '');
    }
});

suppliesMeasure.addEventListener('input', function(e) {
    const regex = /[^a-zA-Z0-9\s]/g;
    if (regex.test(e.target.value)) {
        e.preventDefault();
        showError('La unidad de medida no puede contener caracteres especiales');
        e.target.value = e.target.value.replace(regex, '');
    }
});

// Botón registrar
buttonRegister.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('Intentando registrar insumo');

    //Permitir actualizar los datos del suppliesData
    suppliesData.suppliesId = suppliesId.value;
    suppliesData.cropcycleId = cropcycleId.value;
    suppliesData.cropId = cropId.value;
    suppliesData.suppliesType = suppliesType.value;
    suppliesData.suppliesCuantity = suppliesCuantity.value;
    suppliesData.suppliesMeasure = suppliesMeasure.value;
    suppliesData.suppliesUnitvalue = suppliesUnitvalue.value;
    suppliesData.suppliesTotalvalue = suppliesTotalvalue.value;
    suppliesData.suppliesDescription = suppliesDescription.value;
    suppliesData.suppliesName = suppliesName.value;

    // Validar que todos los campos estén completos
    if (suppliesData.suppliesId === '' || suppliesData.cropcycleId === '' || suppliesData.cropId === '' || suppliesData.suppliesType === '' || suppliesData.suppliesCuantity === '' || suppliesData.suppliesMeasure === '' ||
        suppliesData.suppliesName === '' || suppliesData.suppliesUnitvalue === '' ||suppliesData.suppliesDescription === '' || suppliesData.suppliesTotalvalue === '') {
            showError('Todos los campos son obligatorios');
            return;
    }

    showSuccess('El formulario ha sido completado correctamente');
});

// Mostrar error
function showError(message) {
    console.log(message); 
    const error = document.createElement('P'); 
    error.textContent = message; 
    error.classList.add('error'); 

    suppliesForm.appendChild(error);
    
    setTimeout(() => {
        error.remove(); 
    }, 3000);
};


// Mostrar éxito
function showSuccess(message) {
    const goodData = document.createElement('P');
    goodData.textContent = message;
    goodData.classList.add('correct');

    suppliesForm.appendChild(goodData);

    // Elimina el mensaje después de 4 segundos
    setTimeout(() => {
        goodData.remove();

        // Redirige a otra vista después de que se quite el mensaje
        window.location.href = 'confirm-update-register-enable-disable.html';
    }, 1000);
};

// Leer datos del formulario
function readText(e){
    if(e.target.classList.contains('main__form-field--suppliesId')) {
        suppliesData.suppliesId = e.target.value;
    }
    else if (e.target.classList.contains('main__form-field--cropcycleId')) {
        suppliesData.cropcycleId = e.target.value;
    } 
    else if (e.target.classList.contains('main__form-field--cropId')) {
        suppliesData.cropId = e.target.value;
    } 
    else if (e.target.classList.contains('main__form-field--suppliesType')) {
        suppliesData.suppliesType = e.target.value;
    } 
    else if (e.target.classList.contains('main__form-field--suppliesCuantity')) {
        suppliesData.suppliesCuantity = e.target.value;
    } 
    else if (e.target.classList.contains('main__form-field--suppliesName')) {
        suppliesData.suppliesName = e.target.value;
    } 
    else if (e.target.classList.contains('main__form-field--suppliesState')) {
        suppliesData.suppliesState = e.target.value;
    } 
    else if (e.target.classList.contains('main__form-field--suppliesUnitvalue')) {
        suppliesData.suppliesUnitvalue = e.target.value;
    } 
    else if (e.target.classList.contains('main__form-field--suppliesTotalvalue')) {
        suppliesData.suppliesTotalvalue = e.target.value;
    } 
    else if (e.target.classList.contains('main__form-field--suppliesMeasure')) {
        suppliesData.suppliesMeasure = e.target.value;
    } 
    else if (e.target.classList.contains('main__form-field--suppliesDescription')) {
        suppliesData.suppliesDescription = e.target.value;
    }

    console.log(suppliesData); 
};


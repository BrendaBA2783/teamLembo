//Se realiza un objeto con las clases que se acaban de poner en el index 
console.log('Estoy aqui'); 

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

//Seleccionando los objetos 
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

//Seleccionando inputs 
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

suppliesForm.addEventListener("submit", function(e) {
    e.preventDefault(); 
    console.log('Me estoy intentando enviar')
    const {suppliesId, cropcycleId, cropId, suppliesType, suppliesCuantity, suppliesName, suppliesState,
    suppliesUnitvalue, suppliesTotalvalue, suppliesMeasure, suppliesDescription} = suppliesData;

    if (suppliesId === '' || cropcycleId === '' || cropId === '' || suppliesType=== '' || suppliesCuantity=== '' || suppliesName === '' || suppliesState=== '' || suppliesUnitvalue=== '' || suppliesTotalvalue=== '' || suppliesMeasure=== '' || suppliesDescription === '') {
        showError('Todos los campos son obligatorios');
        return;
    }
    showSuccess('Tus datos han sido enviados satisfactoriamente');/*  */
})

function showError(message) {
    console.log(message); 
    const error = document.createElement('P'); 
    error.textContent = message; 
    error.classList.add('error'); 

    suppliesForm.appendChild(error);
    
    setTimeout(() => {
        error.remove(); 
    }, 4000);
}

function showSuccess(message) {
    const goodData = document.createElement('P');
    goodData.textContent = message;
    goodData.classList.add('correct');

    suppliesForm.appendChild(goodData);

    // Elimina el mensaje después de 4 segundos
    setTimeout(() => {
        goodData.remove();

        // Redirige a otra vista después de que se quite el mensaje
        window.location.href = '/frontend/public/views/supplies/confirm-update-register-enable-disable.html';
    }, 1000);
}


//colback
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
}

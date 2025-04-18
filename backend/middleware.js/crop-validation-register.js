//Se crea el objeto 
const userData = {
    cropId: '', 
    cropType: '',
    cropLocation: '', 
    cropSize: '', 
    cropName: '', 
    cropState: '', 
    cropImage: '', 
    cropDescription: '', 
    cropMesagge: ''
}; 

//Se selecciona el objeto
const cropId = document.querySelector('.main__form-field--cropId'); 
const cropType = document.querySelector('.main__form-field--cropType'); 
const cropLocation = document.querySelector('.main__form-field--cropLocation'); 
const cropSize = document.querySelector('.main__form-field--cropSize'); 
const cropName = document.querySelector('.main__form-field--cropName'); 
const cropState = document.querySelector('.main__form-field--cropState'); 
const cropImage = document.querySelector('.main__form-field--cropImage'); 
const cropDescription = document.querySelector('.main__form-field--cropDescription'); 
const userForm = document.querySelector('.main__container--userForm'); 

//Se seleccionan los inputs 
cropId.addEventListener('input', readText); 
cropType.addEventListener('input', readText); 
cropLocation.addEventListener('input', readText); 
cropSize.addEventListener('input', readText); 
cropName.addEventListener('input', readText); 
cropState.addEventListener('input', readText); 
cropImage.addEventListener('input', readText); 
cropDescription.addEventListener('input', readText); 

userForm.addEventListener("submit", function(e) {
    e.preventDefault(); 
    console.log('Me estoy intentando enviar')
    const { cropId, cropType, cropLocation, cropSize, cropName, cropState,
    cropImage, cropDescription} = userData;
    
    if (cropId === '' || cropType === '' || cropLocation === '' || cropSize === '' || cropName === '' ||
        cropState === '' || cropImage === '' || cropDescription === '') {
            showError('Todos los campos son obligatorios');
            return;
    }
    showSuccess('Tus datos han sido enviados satisfactoriamente');
});

function showError(message) {
    console.log(message); 
    const error = document.createElement('P'); 
    error.textContent = message; 
    error.classList.add('error'); 

    userForm.appendChild(error);
    
    setTimeout(() => {
        error.remove(); 
    }, 4000);
};

function showSuccess(message) {
    const goodData = document.createElement('P');
    goodData.textContent = message;
    goodData.classList.add('correct');

    userForm.appendChild(goodData);

    // Elimina el mensaje después de 4 segundos
    setTimeout(() => {
        goodData.remove();

        // Redirige a otra vista después de que se quite el mensaje
        window.location.href = '/frontend/public/views/crop/confirm-update-register-enable-disable.html';
    }, 1000);
};


//colback
function readText(e){
    if(e.target.classList.contains('main__form-field--cropId')) {
        userData.cropId = e.target.value;
    }
    else if (e.target.classList.contains('main__form-field--cropType')) {
        userData.cropType = e.target.value;
    } 
    else if (e.target.classList.contains('main__form-field--cropLocation')) {
        userData.cropLocation = e.target.value;
    } 
    else if (e.target.classList.contains('main__form-field--cropSize')) {
        userData.cropSize = e.target.value;
    } 
    else if (e.target.classList.contains('main__form-field--cropName')) {
        userData.cropName = e.target.value;
    } 
    else if (e.target.classList.contains('main__form-field--cropState')) {
        userData.cropState = e.target.value;
    } 
    else if (e.target.classList.contains('main__form-field--cropImage')) {
        userData.cropImage = e.target.value;
    } 
    else if (e.target.classList.contains('main__form-field--cropDescription')) {
        userData.cropDescription = e.target.value;
    }
    console.log(userData); 
};
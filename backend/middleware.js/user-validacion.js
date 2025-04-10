//Se realiza un objeto con las clases que se acaban de poner en el index 
const userData = {
    userType: '',
    userDocumentType: '',
    userName: '', 
    userLastName: '', 
    userIdentificationNumber: '', 
    userCellPhone: '', 
    userEmail: '', 
    userConfirmationEmail: '',
    userMesagge: ''
};

//Seleccionando los objetos 
const userType = document.querySelector('.main__form-field--userType'); 
const userDocumentType = document.querySelector('.main__form-field--userDocumentType'); 
const userName = document.querySelector('.main__form-field--userName'); 
const userLastName = document.querySelector('.main__form-field--userLastName'); 
const userIdentificationNumber = document.querySelector('.main__form-field--userIdentificationNumber');
const userCellPhone = document.querySelector('.main__form-field--userCellPhone'); 
const userEmail = document.querySelector('.main__form-field--userEmail'); 
const userConfirmationEmail = document.querySelector('.main__form-field--userConfirmationEmail');
const userForm = document.querySelector('.main__container--userForm');

//Seleccionando inputs 
userType.addEventListener('input', readText);
userDocumentType.addEventListener('input', readText);
userName.addEventListener('input', readText);
userLastName.addEventListener('input', readText);
userIdentificationNumber.addEventListener('input', readText);
userCellPhone.addEventListener('input', readText);
userEmail.addEventListener('input', readText);
userConfirmationEmail.addEventListener('input', readText);

userForm.addEventListener("submit", function(e) {
    e.preventDefault(); 
    console.log('Me estoy intentando enviar')
    const { userType, userDocumentType, userName, userLastName, userIdentificationNumber, userCellPhone,
    userEmail, userConfirmationEmail} = userData;
    
    if (userType === '' || userDocumentType === '' || userName === '' || userLastName === '' || userIdentificationNumber === '' ||
        userCellPhone === '' || userEmail === '' || userConfirmationEmail === '') {
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

    userForm.appendChild(error);
    
    setTimeout(() => {
        error.remove(); 
    }, 4000);
}

function showSuccess(message) {
    const goodData = document.createElement('P');
    goodData.textContent = message;
    goodData.classList.add('correct');

    userForm.appendChild(goodData);

    // Elimina el mensaje después de 4 segundos
    setTimeout(() => {
        goodData.remove();

        // Redirige a otra vista después de que se quite el mensaje
        window.location.href = '/frontend/public/views/user/register-credentials.html';
    }, 1000);
}


//colback
function readText(e){
    if(e.target.classList.contains('main__form-field--userType')) {
        userData.userType = e.target.value;
    }
    else if (e.target.classList.contains('main__form-field--userDocumentType')) {
        userData.userDocumentType = e.target.value;
    } 
    else if (e.target.classList.contains('main__form-field--userName')) {
        userData.userName = e.target.value;
    } 
    else if (e.target.classList.contains('main__form-field--userLastName')) {
        userData.userLastName = e.target.value;
    } 
    else if (e.target.classList.contains('main__form-field--userIdentificationNumber')) {
        userData.userIdentificationNumber = e.target.value;
    } 
    else if (e.target.classList.contains('main__form-field--userCellPhone')) {
        userData.userCellPhone = e.target.value;
    } 
    else if (e.target.classList.contains('main__form-field--userEmail')) {
        userData.userEmail = e.target.value;
    } 
    else if (e.target.classList.contains('main__form-field--userConfirmationEmail')) {
        userData.userConfirmationEmail = e.target.value;
    }
}

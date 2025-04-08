//Se realiza un objeto con las clases que se acaban de poner en el index 
const userData = {
    userType: '',
    userDocumentType: '',
    userName: '', 
    userIdentificationNumber: '', 
    userCellPhone: '', 
    userEmail: '', 
    userConfirmationEmail: '',
    userMesagge: ''
};

//Seleccionando los objetos 
const userType = document.querySelector('.userType'); 
const userDocumentType = document.querySelector('.userDocumentType'); 
const userName = document.querySelector('.userName'); 
const userIdentificationNumber = document.querySelector('.userIdentificationNumber');
const userCellPhone = document.querySelector('.userCellPhone'); 
const userEmail = document.querySelector('.userEmail'); 
const userConfirmationEmail = document.querySelector('.userConfirmationEmail');
const userForm = document.querySelector('.userForm');

//Seleccionando inputs 
userType.addEventListener('input', readText);
userDocumentType.addEventListener('input', readText);
userName.addEventListener('input', readText);
userIdentificationNumber.addEventListener('input', readText);
userCellPhone.addEventListener('input', readText);
userEmail.addEventListener('input', readText);
userConfirmationEmail.addEventListener('input', readText);

userForm.addEventListener("submit", function(e) {
    e.preventDefault(); 
    console.log('Me estoy intentando enviar')
    const { userType, userDocumentType, userName, userIdentificationNumber, userCellPhone,
    userEmail, userConfirmationEmail} = userData;
    
    if (userType === '' || userDocumentType === '' || userName === '' || userIdentificationNumber === '' ||
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
    
    setTimeout(() => {
        goodData.remove(); 
    }, 4000);
}

//colback
function readText(e){
    if(e.target.classList.contains('userType')) {
        userData.userType = e.target.value;
    }
    else if (e.target.classList.contains('userDocumentType')) {
        userData.userDocumentType = e.target.value;

    } else if (e.target.classList.contains('userName')) {
        userData.userName = e.target.value;

    } else if (e.target.classList.contains('userIdentificationNumber')) {
        userData.userIdentificationNumber = e.target.value;

    } else if (e.target.classList.contains('userCellPhone')) {
        userData.userCellPhone = e.target.value;

    } else if (e.target.classList.contains('userEmail')) {
        userData.userEmail = e.target.value;

    } else if (e.target.classList.contains('userConfirmationEmail')) {
        userData.userConfirmationEmail = e.target.value;
    }
    console.log(userData);
}
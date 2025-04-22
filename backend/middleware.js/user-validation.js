//VALIDACIÓN 
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
const buttonRegister = document.querySelector('.main__form-field--buttonRegister'); 
const userForm = document.querySelector('.main__container--userForm');

//Función para verificar si una cadena contiene caracteres especiales
function hasSpecialChars(str) {
    return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(str);
};

//Seleccionando inputs 
userType.addEventListener('input', readText);
userDocumentType.addEventListener('input', readText);
userName.addEventListener('input', readText);
userLastName.addEventListener('input', readText);
userIdentificationNumber.addEventListener('input', readText);
userCellPhone.addEventListener('input', readText);
userEmail.addEventListener('input', readText);
userConfirmationEmail.addEventListener('input', readText);

// Validación para nombre del ciclo (sin caracteres especiales)
userName.addEventListener('input', function(e) {
    if (hasSpecialChars(e.target.value)) {
        e.preventDefault();
        showError('El nombre del usuario no puede contener caracteres especiales');
        e.target.value = e.target.value.replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/g, '');
    }
});

userLastName.addEventListener('input', function(e) {
    if (hasSpecialChars(e.target.value)) {
        e.preventDefault();
        showError('Los apellidos del usuario no puede contener caracteres especiales');
        e.target.value = e.target.value.replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/g, '');
    }
});

// Validación específica para el ID del ciclo (solo números)
userIdentificationNumber.addEventListener('input', function(e) {
    if (isNaN(e.target.value)) {
        e.preventDefault();
        showError('El número de identificación del usuario debe contener solo números');
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    }
});

userCellPhone.addEventListener('input', function(e) {
    if (isNaN(e.target.value)) {
        e.preventDefault();
        showError('El número de teléfono del usuario debe contener solo números');
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    }
});

// Event listener para el botón de registrar
buttonRegister.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('Intentando registrar usuario');
    
    // Validar que todos los campos estén completos
    if (userData.userType === '' || userData.userDocumentType === '' || userData.userName === '' || userData.userLastName === '' || 
        userData.userIdentificationNumber === '' || userData.userCellPhone === '' || userData.userEmail === '' || userData.userConfirmationEmail === '' ) {
        showError('Todos los campos son obligatorios');
        return;
    }
    
    // Validar que los campos específicos no contengan caracteres especiales
    if (hasSpecialChars(userData.userName)) {
        showError('El nombre del usuario no puede contener caracteres especiales');
        return;
    }
    
    if (hasSpecialChars(userData.userLastName)) {
        showError('Los apellidos del usuario no pueden contener caracteres especiales');
        return;
    }

    // Validar que el ID solo contenga números
    if (!/^\d+$/.test(userData.userIdentificationNumber)) {
        showError('El número de identificación del usuario debe contener solo números');
        return;
    }

    // Validar que el ID solo contenga números
    if (!/^\d+$/.test(userData.userCellPhone)) {
        showError('El número de teléfono del usuario debe contener solo números');
        return;
    }

    showSuccess('El formulario ha sido completado correctamente');
    
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
        window.location.href = 'register-credentials.html';
    }, 1000);
};


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
    console.log(userData); 
};



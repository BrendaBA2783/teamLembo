//Se realiza el objeto 
const userData = {
    userName: '', 
    userPassword: '',
    userMesagge: ''
};

//Se seleccionan los objetos 
const userName = document.querySelector('.main__form-field--userName'); 
const userPassword = document.querySelector('.main__form-field--userPassword'); 
const buttonRegister = document.querySelector('.main__form-field--buttonRegister');
const userForm = document.querySelector('.main__container--userForm');

//Función para verificar si una cadena contiene caracteres especiales
function hasSpecialChars(str) {
    return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(str);
};

//Seleccionando inputs
userName.addEventListener('input', readText);
userPassword.addEventListener('input', readText);

userName.addEventListener('input', function(e) {
    if (hasSpecialChars(e.target.value)) {
        e.preventDefault();
        showError('El nombre del usuario no puede contener caracteres especiales');
        e.target.value = e.target.value.replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/g, '');
    }
});

buttonRegister.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('Intentando registrar usuario');
    
    // Validar que todos los campos estén completos
    if (userData.userName === '' || userData.userPassword === '') {
        showError('Todos los campos son obligatorios');
        return;
    }
    
    // Validar que los campos específicos no contengan caracteres especiales
    if (hasSpecialChars(userData.userName)) {
        showError('El nombre del usuario no puede contener caracteres especiales');
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
        window.location.href = 'confirm-update-register-enable-disable.html';
    }, 4000);
};

function readText(e){ 
    if(e.target.classList.contains('main__form-field--userName')) {
        userData.userName = e.target.value;
    }
    else if (e.target.classList.contains('main__form-field--userPassword')) {
        userData.userPassword = e.target.value;
    } 
    console.log(userData); 
};


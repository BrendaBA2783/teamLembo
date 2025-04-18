//Se realiza el objeto 
const userData = {
    userName: '', 
    userPassword: '',
    userMesagge: ''
};

//Se seleccionan los objetos 
const userName = document.querySelector('.main__form-field--userName'); 
const userPassword = document.querySelector('.main__form-field--userPassword'); 
const userForm = document.querySelector('.main__container--userForm');

//Seleccionando inputs
userName.addEventListener('input', readText);
userPassword.addEventListener('input', readText);

userForm.addEventListener("submit", function(e) {
    e.preventDefault(); 
    console.log('Me estoy intentando enviar')
    const { userName, userPassword } = userData;
    
    if (userName === '' || userPassword === '') {
            showError('Todos los campos son obligatorios');
            return;
    }
    showSuccess('El registro a sido completado con exito!');
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
        // window.location.href = '/frontend/public/views/user/confirm-update-register-enable-disable.html';
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


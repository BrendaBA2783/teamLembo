document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.querySelector('.main__container--userForm');

    // Selección de los inputs
    const userType = document.querySelector('.main__form-field--userType'); 
    const userDocumentType = document.querySelector('.main__form-field--userDocumentType'); 
    const userName = document.querySelector('.main__form-field--userName'); 
    const userLastName = document.querySelector('.main__form-field--userLastName'); 
    const userIdentificationNumber = document.querySelector('.main__form-field--userIdentificationNumber');
    const userCellPhone = document.querySelector('.main__form-field--userCellPhone'); 
    const userEmail = document.querySelector('.main__form-field--userEmail'); 
    const userConfirmationEmail = document.querySelector('.main__form-field--userConfirmationEmail');

    // Objeto que se actualizará con cada input
    const userData = {
        user_type: '',
        user_document_type: '',
        user_name: '',
        user_last_name: '',
        user_identification_number: '',
        user_phone: '',
        user_email: '',
        confirmation_email: ''
    };

    // Validación de caracteres especiales
    function hasSpecialChars(str) {
        return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(str);
    }

    // Validaciones en tiempo real
    userName.addEventListener('input', (e) => {
        // Expresión regular que solo permite letras y espacios
        const regex = /[^a-zA-ZáéíóúÁÉÍÓÚñÑ ]/g;
        if (regex.test(e.target.value)) {
            showError('El nombre del usuario solo puede contener letras y espacios');
            e.target.value = e.target.value.replace(regex, '');
        }
    });

    userLastName.addEventListener('input', (e) => {
        // Expresión regular que solo permite letras y espacios
        const regex = /[^a-zA-ZáéíóúÁÉÍÓÚñÑ ]/g;
        if (regex.test(e.target.value)) {
            showError('El apellido del usuario solo puede contener letras y espacios');
            e.target.value = e.target.value.replace(regex, '');
        }
    });

    userIdentificationNumber.addEventListener('input', (e) => {
        if (isNaN(e.target.value)) {
            showError('El número de identificación debe contener solo números');
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        }
    });

    userCellPhone.addEventListener('input', (e) => {
        if (isNaN(e.target.value)) {
            showError('El número de teléfono debe contener solo números');
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        }
    });

    // Actualizar el objeto userData en tiempo real
    userType.addEventListener('input', readText);
    userDocumentType.addEventListener('input', readText);
    userName.addEventListener('input', readText);
    userLastName.addEventListener('input', readText);
    userIdentificationNumber.addEventListener('input', readText);
    userCellPhone.addEventListener('input', readText);
    userEmail.addEventListener('input', readText);
    userConfirmationEmail.addEventListener('input', readText);

    function readText(e) {
        if (e.target.classList.contains('main__form-field--userType')) {
            userData.user_type = e.target.value;
        } else if (e.target.classList.contains('main__form-field--userDocumentType')) {
            userData.user_document_type = e.target.value;
        } else if (e.target.classList.contains('main__form-field--userName')) {
            userData.user_name = e.target.value;
        } else if (e.target.classList.contains('main__form-field--userLastName')) {
            userData.user_last_name = e.target.value;
        } else if (e.target.classList.contains('main__form-field--userIdentificationNumber')) {
            userData.user_identification_number = e.target.value;
        } else if (e.target.classList.contains('main__form-field--userCellPhone')) {
            userData.user_phone = e.target.value;
        } else if (e.target.classList.contains('main__form-field--userEmail')) {
            userData.user_email = e.target.value;
        } else if (e.target.classList.contains('main__form-field--userConfirmationEmail')) {
            userData.confirmation_email = e.target.value;
        }
        console.log(userData);
    }

    // Envío del formulario
    userForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        try {
            // Verificar que todos los campos esten completos
            for (const key in userData) {
                if (userData[key].trim() === '') {
                    throw new Error('Todos los campos son obligatorios');
                }
            }

            // Validaciones
            if (hasSpecialChars(userData.user_name)) {
                throw new Error('El nombre no puede contener caracteres especiales');
            }

            if (hasSpecialChars(userData.user_last_name)) {
                throw new Error('Los apellidos no pueden contener caracteres especiales');
            }

            if (!/^\d+$/.test(userData.user_identification_number)) {
                throw new Error('Número de identificación inválido');
            }

            if (!/^\d+$/.test(userData.user_phone)) {
                throw new Error('Número de teléfono inválido');
            }

            if (userData.user_email !== userData.confirmation_email) {
                throw new Error('Los correos no coinciden');
            }

            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error('Error en la conexión con el servidor');
            }

            const result = await response.json();
            console.log('Usuario registrado:', result);
            showSuccess('El formulario ha sido completado correctamente');
            } catch (error) {
                showError(error.message);
            }
    });

    function showError(message) {
        console.log(message);
        const error = document.createElement('P');
        error.textContent = message;
        error.classList.add('error');
        userForm.appendChild(error);
        setTimeout(() => error.remove(), 4000);
    }

    function showSuccess(message) {
        const success = document.createElement('P');
        success.textContent = message;
        success.classList.add('correct');
        userForm.appendChild(success);
        setTimeout(() => {
            success.remove();
            window.location.href = 'register-credentials.html';
        }, 1000);
    }
});

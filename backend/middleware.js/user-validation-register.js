document.addEventListener('DOMContentLoaded', async () => {
    const userForm = document.querySelector('.main__container--userForm');

    // Selección de los inputs
    const userType = document.querySelector('.main__form-field--userType'); 
    const userId = document.querySelector('.main__form-field--userId'); 
    const userDocumentType = document.querySelector('.main__form-field--userDocumentType'); 
    const userName = document.querySelector('.main__form-field--userName');
    const userState = document.querySelector('.main__form-field--userState');
    const userLastName = document.querySelector('.main__form-field--userLastName'); 
    const userIdentificationNumber = document.querySelector('.main__form-field--userIdentificationNumber');
    const userCellPhone = document.querySelector('.main__form-field--userCellPhone'); 
    const userEmail = document.querySelector('.main__form-field--userEmail'); 
    const userConfirmationEmail = document.querySelector('.main__form-field--userConfirmationEmail');

    // Objeto que se actualizará con cada input
    const userData = {
        user_id: '',
        user_type: '',
        user_document_type: '',
        user_document_number: '',
        user_name: '',
        user_last_name: '',
        user_email: '',
        confirmation_email: '',
        user_phone: '',
        user_state: ''
    };

    try {
        const res = await fetch('http://localhost:3000/nuevo-id');
        const data = await res.json();
        document.querySelector('.main__form-field--userId').value = data.id_generado;
        userData.user_id = data.id_generado;
      } catch (error) {
        console.error('Error al generar ID:', error);
    }

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
        const regex = /[^a-zA-ZáéíóúÁÉÍÓÚñÑ ]/g;
        if (regex.test(e.target.value)) {
            showError('El apellido del usuario solo puede contener letras y espacios');
            e.target.value = e.target.value.replace(regex, '');
        }
    });

    userIdentificationNumber.addEventListener('input', (e) => {
        if (isNaN(e.target.value)) {
            showError('El número de identificación solo permite números');
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        }
    });

    userCellPhone.addEventListener('input', (e) => {
        if (isNaN(e.target.value)) {
            showError('El número de teléfono solo permite números');
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
        }
    });

    // Actualizar el objeto userData en tiempo real
    userType.addEventListener('input', readText);
    userId.addEventListener('input', readText);
    userState.addEventListener('input', readText);
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
        } else if (e.target.classList.contains('main__form-field--userId')) {
            userData.user_id = e.target.value;
        } else if (e.target.classList.contains('main__form-field--userState')) {
            userData.user_state = e.target.value;
        } else if (e.target.classList.contains('main__form-field--userLastName')) {
            userData.user_last_name = e.target.value;
        } else if (e.target.classList.contains('main__form-field--userIdentificationNumber')) {
            userData.user_document_number = e.target.value;
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
        console.log('Intento enviarme');   

        try {
            // Verificar que todos los campos esten completos
            for (const key in userData) {
                if (key !== 'user_id' && userData[key].trim() === '') {
                    console.log(`Campo vacío: ${key}`);
                    throw new Error(`El campo ${key} es obligatorio`);
                }
            }
            // Validaciones
            if (hasSpecialChars(userData.user_name)) {
                throw new Error('El nombre no puede contener caracteres especiales');
            }

            if (hasSpecialChars(userData.user_last_name)) {
                throw new Error('Los apellidos no pueden contener caracteres especiales');
            }

            if (!/^\d+$/.test(userData.user_document_number)) {
                throw new Error('Número de identificación inválido');
            }

            if (!/^\d+$/.test(userData.user_phone)) {
                throw new Error('Número de teléfono inválido');
            }

            if (userData.user_email !== userData.confirmation_email) {
                throw new Error('Los correos no coinciden');
            }

            console.log('Enviando solicitud POST...')
            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                console.log('Error en la respuesta: ', response.status);
                throw new Error('Error en la conexión con el servidor');
            }

            const result = await response.json();
            showSuccess('El formulario ha sido completado correctamente');

        } catch (error) {
            console.log('Error al procesar la solicitud: ',error);
            showError(error.message);
        }
    });

    function showSuccess(message) {
        console.log('Mensaje de éxito');
        const success = document.createElement('P');
        success.textContent = message;
        success.classList.add('correct');
        userForm.appendChild(success);
        setTimeout(() => {
            success.remove();
            console.log('Redirigiendo...');
            window.location.href = 'register-credentials.html';
        }, 2000);
    }

    function showError(message) {
        console.log(message);
        const error = document.createElement('P');
        error.textContent = message;
        error.classList.add('error');
        userForm.appendChild(error);
        setTimeout(() => error.remove(), 2000);
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const cropForm = document.querySelector('.main__container--cropForm');

    // Selección de los inputs
    const cropId = document.querySelector('.main__form-field--cropId'); 
    const cropType = document.querySelector('.main__form-field--cropType'); 
    const cropLocation = document.querySelector('.main__form-field--cropLocation'); 
    const cropSize = document.querySelector('.main__form-field--cropSize'); 
    const cropName = document.querySelector('.main__form-field--cropName'); 
    const cropState = document.querySelector('.main__form-field--cropState'); 
    const cropImage = document.querySelector('.main__form-field--upload-input'); 
    const cropDescription = document.querySelector('.main__form-field--cropDescription'); 
    const buttonRegister = document.querySelector('.main__form-field--buttonRegister');  

    //Se crea el objeto 
    const cropData = {
        crop_id: '', 
        crop_type: '',
        crop_location: '', 
        crop_size: '', 
        crop_name: '', 
        crop_state: '', 
        crop_image: '', 
        crop_description: ''
    }; 

    //Función para caracteres especiales
    function hasSpecialChars(str) {
        return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(str);
    };

    // Validaciones de los campos
    cropId.addEventListener('input', function(e) {
        if (hasSpecialChars(e.target.value)) {
            e.preventDefault();
            showError('El ID del cultivo no puede contener caracteres especiales');
            e.target.value = e.target.value.replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/g, '');
        }
    });
    
    cropType.addEventListener('input', function(e) {
        if (hasSpecialChars(e.target.value)) {
            e.preventDefault();
            showError('El tipo de cultivo no puede contener caracteres especiales');
            e.target.value = e.target.value.replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/g, '');
        }
    });
    
    cropLocation.addEventListener('input', function(e) {
        if (hasSpecialChars(e.target.value)) {
            e.preventDefault();
            showError('La ubicación del cultivo no puede contener caracteres especiales');
            e.target.value = e.target.value.replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/g, '');
        }
    });
    
    cropSize.addEventListener('input', function(e) {
        if (hasSpecialChars(e.target.value)) {
            e.preventDefault();
            showError('El tamaño del cultivo no puede contener caracteres especiales');
            e.target.value = e.target.value.replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/g, '');
        }
    });
    
    cropName.addEventListener('input', function(e) {
        if (hasSpecialChars(e.target.value)) {
            e.preventDefault();
            showError('El nombre del cultivo no puede contener caracteres especiales');
            e.target.value = e.target.value.replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/g, '');
        }
    });
    
    cropDescription.addEventListener('input', function(e) {
        if (hasSpecialChars(e.target.value)) {
            e.preventDefault();
            showError('La descripción del cultivo no puede contener caracteres especiales');
            e.target.value = e.target.value.replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/g, '');
        }
    });

    // Actualizar el objeto cropData en tiempo real
    cropId.addEventListener('input', readText); 
    cropType.addEventListener('input', readText); 
    cropLocation.addEventListener('input', readText); 
    cropSize.addEventListener('input', readText); 
    cropName.addEventListener('input', readText); 
    cropState.addEventListener('input', readText); 
    cropImage.addEventListener('change', readText); 
    cropDescription.addEventListener('input', readText); 

    // Funcion para leer el texto
    //colback
    function readText(e){
        if(e.target.classList.contains('main__form-field--cropId')) {
            cropData.crop_id = e.target.value;
        }
        else if (e.target.classList.contains('main__form-field--cropType')) {
            cropData.crop_type = e.target.value;
        } 
        else if (e.target.classList.contains('main__form-field--cropLocation')) {
            cropData.crop_location = e.target.value;
        } 
        else if (e.target.classList.contains('main__form-field--cropSize')) {
            cropData.crop_size = e.target.value;
        } 
        else if (e.target.classList.contains('main__form-field--cropName')) {
            cropData.crop_name = e.target.value;
        } 
        else if (e.target.classList.contains('main__form-field--cropState')) {
            cropData.crop_state = e.target.value;
        } 
        else if (e.target.classList.contains('main__form-field--upload-input')) {
            cropData.crop_image = e.target.value;
        } 
        else if (e.target.classList.contains('main__form-field--cropDescription')) {
            cropData.crop_description = e.target.value;
        }
        console.log(cropData); 
    }

    // Envío del formulario
    // Event listener para el botón de registrar
    cropForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        try {
            for (const key in cropData) {
                if (cropData[key].trim() === '') {
                    throw new Error('Todos los campos son obligatorios');
                }
            }

            // Validaciones de no permitir caracteres especiales
            if (hasSpecialChars(cropData.crop_id)) {
                throw new Error('El id no puede contener caracteres especiales');
            }
            if (hasSpecialChars(cropData.crop_type)) {
                throw new Error('El tipo de cultivo no puede contener caracteres especiales');
            }
            if (hasSpecialChars(cropData.crop_location)) {
                throw new Error('La ubicación del cultivo no puede contener caracteres especiales');
            }
            if (hasSpecialChars(cropData.crop_size)) {
                throw new Error('El tamaño del cultivo no puede contener caracteres especiales');
            }
            if (hasSpecialChars(cropData.crop_name)) {
                throw new Error('El nombre de cultivo no puede contener caracteres especiales');
            }
            if (hasSpecialChars(cropData.crop_description)) {
                throw new Error('La descripcion no puede contener caracteres especiales');
            }

            const response = await fetch('http://localhost:3000/crop', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cropData)
            });

            if (!response.ok) {
                throw new Error('Error en la conexión con el servidor');
            }

            const result = await response.json();
            console.log('Cultivo registrado:', result);
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

        cropForm.appendChild(error);
        
        setTimeout(() => {
            error.remove(); 
        }, 4000);
    };

    function showSuccess(message) {
        const success = document.createElement('P');
        success.textContent = message;
        success.classList.add('correct');
        cropForm.appendChild(success);
        setTimeout(() => {
            success.remove();
            window.location.href = 'confirm-update-register-enable-disable.html';
        }, 1000);
    };
});
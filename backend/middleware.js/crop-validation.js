document.addEventListener('DOMContentLoaded', () => {
    const cropForm = document.querySelector('.main__container--cropForm');
    const fileInput = document.querySelector('.main__form-field--upload-input');
    const fileNameDisplay = document.getElementById('fileName');

    // Objeto para almacenar los datos del cultivo
    const cropData = {
        crop_type: '',
        crop_location: '',
        crop_size: '',
        crop_name: '',
        crop_state: 'activo',
        crop_image: '',
        crop_description: ''
    };

    // Manejar la selección de archivo
    fileInput?.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            fileNameDisplay.textContent = file.name;
            // Convertir imagen a Base64
            const reader = new FileReader();
            reader.onload = (e) => {
                cropData.crop_image = e.target.result;
            };
            reader.readAsDataURL(file);
        } else {
            fileNameDisplay.textContent = 'Seleccionar archivo';
            cropData.crop_image = '';
        }
    });

    // Actualizar datos del cultivo cuando se modifican los campos
    cropForm?.addEventListener('input', (e) => {
        const field = e.target;
        const fieldName = field.name;
        
        if (fieldName && fieldName in cropData) {
            cropData[fieldName] = field.value;
        }
    });

    // Manejar el envío del formulario
    cropForm?.addEventListener('submit', async (e) => {
        e.preventDefault();

        try {
            // Validar campos requeridos
            const requiredFields = ['crop_type', 'crop_location', 'crop_size', 'crop_name'];
            const missingFields = requiredFields.filter(field => !cropData[field].trim());

            if (missingFields.length > 0) {
                throw new Error('Por favor complete todos los campos requeridos');
            }

            const response = await fetch('http://localhost:3000/crop', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cropData)
            });

            if (!response.ok) {
                throw new Error('Error al registrar el cultivo');
            }

            const result = await response.json();
            showSuccess('Cultivo registrado exitosamente');
            
            // Limpiar formulario
            cropForm.reset();
            fileNameDisplay.textContent = 'Seleccionar archivo';
            
            // Redirigir a la tabla después de 1 segundo
            setTimeout(() => {
                window.location.href = 'table.html';
            }, 1000);

        } catch (error) {
            showError(error.message);
        }
    });

    // Función para mostrar mensajes de error
    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        cropForm.insertBefore(errorDiv, cropForm.firstChild);
        setTimeout(() => errorDiv.remove(), 3000);
    }

    // Función para mostrar mensajes de éxito
    function showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        cropForm.insertBefore(successDiv, cropForm.firstChild);
        setTimeout(() => successDiv.remove(), 3000);
    }
});
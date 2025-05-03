document.addEventListener('DOMContentLoaded', () => {
    const sensorForm = document.querySelector('.main__container--sensorForm');
    const fileInput = document.querySelector('.main__form-field--upload-input');
    const fileNameDisplay = document.getElementById('fileName');

    // Objeto para almacenar los datos del sensor
    const sensorData = {
        sensor_type: '',
        sensor_name: '',
        unit_measure: '',
        scan_time: '',
        sensor_state: 'activo',
        sensor_image: '',
        sensor_description: ''
    };

    // Manejar la selección de archivo
    fileInput?.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            fileNameDisplay.textContent = file.name;
            // Convertir imagen a Base64
            const reader = new FileReader();
            reader.onload = (e) => {
                sensorData.sensor_image = e.target.result;
            };
            reader.readAsDataURL(file);
        } else {
            fileNameDisplay.textContent = 'Seleccionar archivo';
            sensorData.sensor_image = '';
        }
    });

    // Actualizar datos del sensor cuando se modifican los campos
    sensorForm?.addEventListener('input', (e) => {
        const field = e.target;
        const fieldName = field.classList[1]?.split('--')[1];
        
        if (fieldName === 'sensor-type') {
            sensorData.sensor_type = field.value;
        } else if (fieldName === 'name') {
            sensorData.sensor_name = field.value;
        } else if (fieldName === 'unit-measure') {
            sensorData.unit_measure = field.value;
        } else if (fieldName === 'scan-time') {
            sensorData.scan_time = field.value;
        } else if (fieldName === 'state') {
            sensorData.sensor_state = field.value;
        } else if (fieldName === 'description') {
            sensorData.sensor_description = field.value;
        }
    });

    // Manejar el envío del formulario
    sensorForm?.addEventListener('submit', async (e) => {
        e.preventDefault();

        try {
            // Validar campos requeridos
            const requiredFields = ['sensor_type', 'sensor_name', 'unit_measure', 'scan_time'];
            const missingFields = requiredFields.filter(field => !sensorData[field].trim());

            if (missingFields.length > 0) {
                throw new Error('Por favor complete todos los campos requeridos');
            }

            // Validar que el tiempo de escaneo sea un número positivo
            if (isNaN(sensorData.scan_time) || Number(sensorData.scan_time) <= 0) {
                throw new Error('El tiempo de escaneo debe ser un número positivo');
            }

            const response = await fetch('http://localhost:3000/sensor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(sensorData)
            });

            if (!response.ok) {
                throw new Error('Error al registrar el sensor');
            }

            const result = await response.json();
            showSuccess('Sensor registrado exitosamente');
            
            // Limpiar formulario
            sensorForm.reset();
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
        sensorForm.insertBefore(errorDiv, sensorForm.firstChild);
        setTimeout(() => errorDiv.remove(), 3000);
    }

    // Función para mostrar mensajes de éxito
    function showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        sensorForm.insertBefore(successDiv, sensorForm.firstChild);
        setTimeout(() => successDiv.remove(), 3000);
    }
});
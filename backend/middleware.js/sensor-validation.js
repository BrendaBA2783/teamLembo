document.addEventListener('DOMContentLoaded', () => {
    const sensorForm = document.querySelector('.main__container--sensorForm');

    // Selección de los inputs
    const sensorId = document.querySelector('.main__form-field--sensor-id');
    const sensorMeasure = document.querySelector('.main__form-field--unit-measure');
    const sensorType = document.querySelector('.main__form-field--sensor-type');
    const sensorScanTime = document.querySelector('.main__form-field--scan-time');
    const sensorName = document.querySelector('.main__form-field--name');
    const sensorStatus = document.querySelector('.main__form-field--state');
    const sensorImage = document.querySelector('.main__form-field--upload-input');
    const sensorDescription = document.querySelector('.main__form-field--description');

    // Se crea el objeto
    const sensorData = {
        sensor_id: '',
        sensor_measure: '',
        sensor_type: '',
        sensor_scan_time: '',
        sensor_name: '',
        sensor_status: '',
        sensor_image: '',
        sensor_description: ''
    };

    // Validacióones
    sensorId.addEventListener('input', function(e) {
        const regex = /[^a-zA-Z0-9]/g;
        if (regex.test(e.target.value)) {
            e.preventDefault();
            showError('El id no puede contener caracteres especiales');
            e.target.value = e.target.value.replace(regex, '');
        }
    });

    sensorMeasure.addEventListener('input', function(e) {
        const regex = /[^a-zA-Z0-9\s]/;
        if (regex.test(e.target.value)) {
            e.preventDefault();
            showError('La unidad de medida no puede contener caracteres especiales');
            e.target.value = e.target.value.replace(regex, '');
        }
    });

    sensorType.addEventListener('input', function(e) {
        const regex = /[^a-zA-Z0-9\s]/;
        if (regex.test(e.target.value)) {
            e.preventDefault();
            showError('El tipo de sensor no puede contener caracteres especiales');
            e.target.value = e.target.value.replace(regex, '');
        }
    });

    sensorName.addEventListener('input', function(e) {
        const regex = /[^a-zA-Z0-9\s]/;
        if (regex.test(e.target.value)) {
            e.preventDefault();
            showError('El nombre del sensor no puede contener caracteres especiales');
            e.target.value = e.target.value.replace(regex, '');
        }
    });

    // Actualizar el objeto sensorData
    sensorId.addEventListener('input', readText);
    sensorMeasure.addEventListener('input', readText);
    sensorType.addEventListener('input', readText);
    sensorScanTime.addEventListener('input', readText);
    sensorName.addEventListener('input', readText);
    sensorStatus.addEventListener('input', readText);
    sensorImage.addEventListener('change', readText); 
    sensorDescription.addEventListener('input', readText);

    // Callback function to read input text
    function readText(e) {
        if (e.target.classList.contains('main__form-field--sensor-id')) {
            sensorData.sensor_id = e.target.value;
        } 
        else if (e.target.classList.contains('main__form-field--unit-measure')) {
            sensorData.sensor_measure = e.target.value;
        } 
        else if (e.target.classList.contains('main__form-field--sensor-type')) {
            sensorData.sensor_type = e.target.value;
        } 
        else if (e.target.classList.contains('main__form-field--scan-time')) {
            sensorData.sensor_scan_time = e.target.value;
        } 
        else if (e.target.classList.contains('main__form-field--name')) {
            sensorData.sensor_name = e.target.value;
        } 
        else if (e.target.classList.contains('main__form-field--state')) {
            sensorData.sensor_status = e.target.value;
        } 
        else if (e.target.classList.contains('main__form-field--upload-input')) {
            sensorData.sensor_image = e.target.value;
        } 
        else if (e.target.classList.contains('main__form-field--description')) {
            sensorData.sensor_description = e.target.value;
        }
        console.log(sensorData);
    }

    // Event listener for update button
    sensorForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        try {
            for (const key in sensorData) {
                if (sensorData[key].trim() === '') {
                    throw new Error('Todos los campos son obligatorios');
                }
            }
        
            // Validaciones
            if (/[^a-zA-Z0-9]/.test(sensorData.sensor_id)) {
                showError('El ID del sensor no puede contener caracteres especiales');
                return;
            }
            
            if (sensorData.sensor_image === '') {
                showError('Se debe subir una imágen');
                return;
            }

            if (/[^a-zA-Z0-9\s]/.test(sensorData.sensor_measure)) {
                showError('La unidad de medida no puede contener caracteres especiales');
                return;
            }

            if (/[^a-zA-Z0-9\s]/.test(sensorData.sensor_type)) {
                showError('El tipo de sensor no puede contener caracteres especiales');
                return;
            }

            if (/[^a-zA-Z0-9\s]/.test(sensorData.sensor_name)) {
                showError('El nombre del sensor no puede contener caracteres especiales');
                return;
            }

            const response = await fetch('http://localhost:3000/sensor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(sensorData)
            });

            if (!response.ok) {
                throw new Error('Error en la conexión con el servidor');
            }

            const result = await response.json();
            console.log('Sensor registrado:', result);
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
        sensorForm.appendChild(error);   
        setTimeout(() => {
            error.remove(); 
        }, 4000);
    };

    function showSuccess(message) {
        const success = document.createElement('P');
        success.textContent = message;
        success.classList.add('correct');
        sensorForm.appendChild(success);
        setTimeout(() => {
            success.remove();
            window.location.href = 'confirm-update-register-enable-disable.html';
        }, 1000);
    };
});
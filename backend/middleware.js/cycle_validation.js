document.addEventListener('DOMContentLoaded', () => {
    const cycleForm = document.querySelector('.main__container--cycleForm');

    // Selección de los inputs
    const cycleLocation = document.querySelector('.main__form-field--location');
    const cycleName = document.querySelector('.main__form-field--cycle-name');
    const cycleStatus = document.querySelector('.main__form-field--cycleState');
    const cycleNews = document.querySelector('.main__form-field--news');
    const cycleStartDate = document.querySelector('.main__form-field--start-date');
    const cycleEndDate = document.querySelector('.main__form-field--end-date');
    const cycleDescription = document.querySelector('.main__form-field--description');
    const cycleId = document.querySelector('.main__form-field--cycle-id');

    // Se crea el objeto
    const cycleData = {
        cycle_id: '',
        cycle_location: '',
        cycle_name: '',
        cycle_status: '',
        cycle_news: '',
        cycle_start_date: '',
        cycle_end_date: '',
        cycle_description: ''
    };

    // Función para verificar si contiene caracteres especiales
    function hasSpecialChars(text) {
        const specialCharsRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
        return specialCharsRegex.test(text);
    }

    // Validaciones en tiempo real
    cycleId.addEventListener('input', function(e) {
        const regex = /[^a-zA-Z0-9]/g;
        if (regex.test(e.target.value)) {
            e.preventDefault();
            showError('El ID del ciclo debe contener solo letras y números');
            e.target.value = e.target.value.replace(regex, '');
        }
    });
    
    cycleLocation.addEventListener('input', function(e) {
        if (hasSpecialChars(e.target.value)) {
            e.preventDefault();
            showError('La ubicación del ciclo no puede contener caracteres especiales');
            e.target.value = e.target.value.replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/g, '');
        }
    });

    cycleName.addEventListener('input', function(e) {
        if (hasSpecialChars(e.target.value)) {
            e.preventDefault();
            showError('El nombre del ciclo no puede contener caracteres especiales');
            e.target.value = e.target.value.replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/g, '');
        }
    });
    
    cycleEndDate.addEventListener('change', function(e) {
        const start = new Date (cycleStartDate.value);
        const end = new Date (cycleEndDate.value);
        if (cycleStartDate.value && cycleEndDate.value && start >= end) {
            e.preventDefault();
            showError('La fecha inicial debe ser menor a la fecha final');
            cycleEndDate.value = ''; // Limpiar el campo de fecha final
        }
    });

    // Actualizar el objeto cropData en tiempo real
    cycleId.addEventListener('input', readText);
    cycleLocation.addEventListener('input', readText);
    cycleName.addEventListener('input', readText);
    cycleStatus.addEventListener('input', readText);
    cycleNews.addEventListener('input', readText);
    cycleStartDate.addEventListener('input', readText);
    cycleEndDate.addEventListener('input', readText);
    cycleDescription.addEventListener('input', readText);

    // Función callback para leer el texto de los inputs
    function readText(e) {
        if (e.target.classList.contains('main__form-field--cycle-id')) {
            cycleData.cycle_id = e.target.value;
        } 
        else if (e.target.classList.contains('main__form-field--location')) {
            cycleData.cycle_location = e.target.value;
        } 
        else if (e.target.classList.contains('main__form-field--cycle-name')) {
            cycleData.cycle_name = e.target.value;
        } 
        else if (e.target.classList.contains('main__form-field--cycleState')) {
            cycleData.cycle_status = e.target.value;
        } 
        else if (e.target.classList.contains('main__form-field--news')) {
            cycleData.cycle_news = e.target.value;
        } 
        else if (e.target.classList.contains('main__form-field--start-date')) {
            cycleData.cycle_start_date = e.target.value;
        } 
        else if (e.target.classList.contains('main__form-field--end-date')) {
            cycleData.cycle_end_date = e.target.value;
        } 
        else if (e.target.classList.contains('main__form-field--description')) {
            cycleData.cycle_description = e.target.value;
        }
        console.log(cycleData);
    }

    // Event listener para el botón de registrar
    cycleForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        try {
            // Verificar que todos los campos esten completos
            for (const key in cycleData) {
                if (cycleData[key].trim() === '') {
                    throw new Error('Todos los campos son obligatorios');
                }
            }

            // Validaciones
            if (/[^a-zA-Z0-9]/.test(cycleData.cycle_id)) {
                showError('El ID del ciclo debe contener solo letras y números');
                return;
            }
            
            if (hasSpecialChars(cycleData.cycle_name)) {
                showError('El nombre del ciclo no puede contener caracteres especiales');
                return;
            }
            
            if (new Date(cycleData.cycle_end_date) <= new Date(cycleData.cycle_start_date)) {
                showError('La fecha inicial debe ser menor a la fecha final');
                return;
            }

            const response = await fetch('http://localhost:3000/cycle', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cycleData)
            });

            if (!response.ok) {
                throw new Error('Error en la conexión con el servidor');
            }

            const result = await response.json();
            console.log('ciclo registrado:', result);
            showSuccess('El formulario ha sido completado correctamente');
        } catch (error) {
            showError(error.message);
        }
    });

    // Función para mostrar mensajes de error
    function showError(message) {
        console.log(message);
        const error = document.createElement('P');
        error.textContent = message;
        error.classList.add('error');
        cycleForm.appendChild(error);
        setTimeout(() => error.remove(), 4000);
    }

    // Función para mostrar mensajes de éxito
    function showSuccess(message) {
        const success = document.createElement('P');
        success.textContent = message;
        success.classList.add('correct');
        cycleForm.appendChild(success);
        setTimeout(() => {
            success.remove();
            window.location.href = '/frontend/public/views/crop-cycle/confirm-update-register-enable-disable.html';
        }, 1500);
    }
});


/* document.querySelector('DOMContentLoaded', () => {
    const asociacionForm = document.querySelector('.main__container-form');

    // Selección de lo inputs
    const asociacionId = document.querySelector('.main__form-field--asociacion-id');
    const asociacionCrop = document.querySelector('.main__form-field--select-cultivo');
    const asociacionCycle = document.querySelector('.main__form-field--select-cycle');
    const asociacionSensor = document.querySelector('.main__form-field--select-sensor');
    const asociacionSupplies = document.querySelector('.main__form-field--select-insumo');
    const asociacionUsers = document.querySelector('.main__form-field--select-usuario');

    // Creación del objeto
    const asociacionData = {
        asociacion_id:'',
        crop_id:'',
        cycle_id:'',
        sensor_id:'',
        supplies_id:'',
        users_id:''
    }

    // Actualizar el objeto asociacionData
    asociacionId.addEventListener('input', readText);
    asociacionCrop.addEventListener('input', readText);
    asociacionCycle.addEventListener('input', readText);
    asociacionSensor.addEventListener('input', readText);
    asociacionSupplies.addEventListener('input', readText);
    asociacionUsers.addEventListener('input', readText);

    // Callback
    function readText(e){
        if (e.target.classList.contains('main__form-field--asociacion-id')) {
            asociacionData.asociacion_id = e.target.value;
        }
        else if (e.target.classList.contains('main__form-field--select-cultivo')) {
            asociacionData.crop_id = e.target.value;
        }
        else if (e.target.classList.contains('main__form-field--select-cycle')) {
            asociacionData.cycle_id = e.target.value;
        }
        else if (e.target.classList.contains('main__form-field--select-sensor')) {
            asociacionData.sensor_id = e.target.value;
        }
        else if (e.target.classList.contains('main__form-field--select-insumo')) {
            asociacionData.supplies_id = e.target.value;
        }
        else if (e.target.classList.contains('main__form-field--select-usuario')) {
            asociacionData.users_id = e.target.value;
        }
        console.log(asociacionData);
    }

    // Event listener for update button
    asociacionForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        try {
            for (const key in asociacionData) {
                if (asociacionData[key].trim() === '') {
                    throw new Error('Todos los campos son obligatorios');
                }
            }

            const response = await fetch('http://localhost:3000/asociacion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },  
                body: JSON.stringify(asociacionData)
            });

            if (!response.ok) {
                throw new Error('Error en la conexión con el servidor');
            }

            const result = await response.json();
            console.log('Asociacion registrada:', result);
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
        asociacionForm.appendChild(error);   
        setTimeout(() => {
            error.remove(); 
        }, 4000);
    };

    function showSuccess(message) {
        const success = document.createElement('P');
        success.textContent = message;
        success.classList.add('correct');
        asociacionForm.appendChild(success);
        setTimeout(() => {
            success.remove();
        }, 1000);
    };
}); */
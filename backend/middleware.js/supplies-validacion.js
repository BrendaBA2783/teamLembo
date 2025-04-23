document.addEventListener('DOMContentLoaded', () => {

    const suppliesForm = document.querySelector('.main__container--suppliesForm');

    // Seleccion de los inputs
    const suppliesId = document.querySelector('.main__form-field--suppliesId');
    const cropcycleId = document.querySelector('.main__form-field--cropcycleId');
    const cropId = document.querySelector('.main__form-field--cropId');
    const suppliesType = document.querySelector('.main__form-field--suppliesType');
    const suppliesCuantity = document.querySelector('.main__form-field--suppliesCuantity');
    const suppliesName = document.querySelector('.main__form-field--suppliesName');
    const suppliesState = document.querySelector('.main__form-field--suppliesState');
    const suppliesUnitvalue = document.querySelector('.main__form-field--suppliesUnitvalue');
    const suppliesTotalvalue = document.querySelector('.main__form-field--suppliesTotalvalue');
    const suppliesMeasure = document.querySelector('.main__form-field--suppliesMeasure');
    const suppliesDescription = document.querySelector('.main__form-field--suppliesDescription');

    // Se crea el objeto
    const suppliesData = {
        supplies_id: '',
        crop_cycle_id: '',
        crop_id: '',
        supplies_type: '',
        supplies_cuantity: '',
        supplies_name: '',
        supplies_state: '',
        supplies_unit_value: '',
        supplies_total_value: '',
        supplies_measure: '',
        supplies_description: ''
    };

    // Validaciones con preventDefault
    suppliesId.addEventListener('input', function(e) {
        const regex = /[^a-zA-Z0-9]/g;
        if (regex.test(e.target.value)) {
            e.preventDefault();
            showError('El ID del insumo solo puede contener letras y números');
            e.target.value = e.target.value.replace(regex, '');
        }
    });

    cropcycleId.addEventListener('input', function(e) {
        const regex = /[^a-zA-Z0-9]/g;
        if (regex.test(e.target.value)) {
            e.preventDefault();
            showError('El ID del ciclo solo puede contener letras y números');
            e.target.value = e.target.value.replace(regex, '');
        }
    });

    cropId.addEventListener('input', function(e) {
        const regex = /[^a-zA-Z0-9]/g;
        if (regex.test(e.target.value)) {
            e.preventDefault();
            showError('El ID del cultivo solo puede contener letras y números');
            e.target.value = e.target.value.replace(regex, '');
        }
    });

    suppliesType.addEventListener('input', function(e) {
        const regex = /[^a-zA-Z0-9\s]/g;
        if (regex.test(e.target.value)) {
            e.preventDefault();
            showError('El tipo de insumo no puede contener caracteres especiales');
            e.target.value = e.target.value.replace(regex, '');
        }
    });

    suppliesCuantity.addEventListener('input', function(e) {
        const regex = /[^0-9]/g;
        if (regex.test(e.target.value)) {
            e.preventDefault();
            showError('La cantidad de insumo solo permite números');
            e.target.value = e.target.value.replace(regex, '');
        }
    });

    suppliesUnitvalue.addEventListener('input', function(e) {
        const regex = /[^0-9]/g;
        if (regex.test(e.target.value)) {
            e.preventDefault();
            showError('El valor unitario de insumo solo permite números');
            e.target.value = e.target.value.replace(regex, '');
        }
    });

    suppliesTotalvalue.addEventListener('input', function(e) {
        const regex = /[^0-9]/g;
        if (regex.test(e.target.value)) {
            e.preventDefault();
            showError('El valor total de insumo solo permite números');
            e.target.value = e.target.value.replace(regex, '');
        }
    });

    suppliesName.addEventListener('input', function(e) {
        const regex = /[^a-zA-Z0-9\s]/g;
        if (regex.test(e.target.value)) {
            e.preventDefault();
            showError('El nombre del insumo no puede contener caracteres especiales');
            e.target.value = e.target.value.replace(regex, '');
        }
    });
    
    // Eventos para actualizar datos
    suppliesId.addEventListener('input', readText);
    cropcycleId.addEventListener('input', readText);
    cropId.addEventListener('input', readText);
    suppliesType.addEventListener('input', readText);
    suppliesCuantity.addEventListener('input', readText);
    suppliesName.addEventListener('input', readText);
    suppliesState.addEventListener('input', readText);
    suppliesUnitvalue.addEventListener('input', readText);
    suppliesTotalvalue.addEventListener('input', readText);
    suppliesMeasure.addEventListener('input', readText);
    suppliesDescription.addEventListener('input', readText);

    // Leer datos del formulario (colback)
    function readText(e){
        if(e.target.classList.contains('main__form-field--suppliesId')) {
            suppliesData.supplies_id = e.target.value;
        }
        else if (e.target.classList.contains('main__form-field--cropcycleId')) {
            suppliesData.crop_cycle_id = e.target.value;
        } 
        else if (e.target.classList.contains('main__form-field--cropId')) {
            suppliesData.crop_id = e.target.value;
        } 
        else if (e.target.classList.contains('main__form-field--suppliesType')) {
            suppliesData.supplies_type = e.target.value;
        } 
        else if (e.target.classList.contains('main__form-field--suppliesCuantity')) {
            suppliesData.supplies_cuantity = e.target.value;
        } 
        else if (e.target.classList.contains('main__form-field--suppliesName')) {
            suppliesData.supplies_name = e.target.value;
        } 
        else if (e.target.classList.contains('main__form-field--suppliesState')) {
            suppliesData.supplies_state = e.target.value;
        } 
        else if (e.target.classList.contains('main__form-field--suppliesUnitvalue')) {
            suppliesData.supplies_unit_value = e.target.value;
        } 
        else if (e.target.classList.contains('main__form-field--suppliesTotalvalue')) {
            suppliesData.supplies_total_value = e.target.value;
        } 
        else if (e.target.classList.contains('main__form-field--suppliesMeasure')) {
            suppliesData.supplies_measure = e.target.value;
        } 
        else if (e.target.classList.contains('main__form-field--suppliesDescription')) {
            suppliesData.supplies_description = e.target.value;
        }
        console.log(suppliesData); 
    };

    // Botón registrar
    suppliesForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        console.log('Intentando registrar insumo');

        try {
            for (const key in suppliesData) {
                if (suppliesData[key].trim() === '') {
                    throw new Error('Todos los campos son obligatorios');
                }
            }

            // Validaciones de no permitir caracteres especiales
            function hasSpecialChars(texto) {
                const regex = /[^a-zA-Z0-9\s]/;
                return regex.test(texto);
            }
            
            if (hasSpecialChars(suppliesData.supplies_id)) {
                throw new Error('El id no puede contener caracteres especiales');
            }

            if (hasSpecialChars(suppliesData.crop_cycle_id)) {
                throw new Error('El id no puede contener caracteres especiales');
            }

            if (hasSpecialChars(suppliesData.crop_id)) {
                throw new Error('El id no puede contener caracteres especiales');
            }

            if (hasSpecialChars(suppliesData.supplies_type)) {
                throw new Error('El tipo de insumo no puede contener caracteres especiales');
            }

            if (hasSpecialChars(suppliesData.supplies_cuantity)) {
                throw new Error('La cantidad de insumo no puede contener caracteres');
            }

            if (hasSpecialChars(suppliesData.supplies_unit_value)) {
                throw new Error('El valor unitario de insumo solo permite numeros');
            }

            if (hasSpecialChars(suppliesData.supplies_total_value)) {
                throw new Error('El valor total de insumo solo permite numeros');
            }

            if (hasSpecialChars(suppliesData.supplies_name)) {
                throw new Error('El nombre del insumo solo permite caracteres');
            }

            const response = await fetch('http://localhost:3000/supplies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(suppliesData)
            });

            if (!response.ok) {
                throw new Error('Error en la conexión con el servidor');
            }

            const result = await response.json();
            console.log('Insumo registrado:', result);
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
        suppliesForm.appendChild(error);   
        setTimeout(() => {
            error.remove(); 
        }, 4000);
    };

    function showSuccess(message) {
        const success = document.createElement('P');
        success.textContent = message;
        success.classList.add('correct');
        suppliesForm.appendChild(success);
        setTimeout(() => {
            success.remove();
            window.location.href = 'confirm-update-register-enable-disable.html';
        }, 1500);
    };
});
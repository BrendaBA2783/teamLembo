document.addEventListener('DOMContentLoaded', () => {
    const suppliesForm = document.querySelector('.main__container--suppliesForm');
    if (!suppliesForm) {
        console.error('No se encontró el formulario de insumos');
        return;
    }

    // Selección de los inputs
    const suppliesId = document.querySelector('.main__form-field--suppliesId');
    const suppliesType = document.querySelector('.main__form-field--suppliesType');
    const suppliesCuantity = document.querySelector('.main__form-field--suppliesCuantity');
    const suppliesName = document.querySelector('.main__form-field--suppliesName');
    const suppliesState = document.querySelector('.main__form-field--suppliesState');
    const suppliesUnitvalue = document.querySelector('.main__form-field--suppliesUnitvalue');
    const suppliesTotalvalue = document.querySelector('.main__form-field--suppliesTotalvalue');
    const suppliesMeasure = document.querySelector('.main__form-field--suppliesMeasure');
    const suppliesDescription = document.querySelector('.main__form-field--suppliesDescription');
    const suppliesImage = document.querySelector('.main__form-field--upload-input');

    // Se crea el objeto
    const suppliesData = {
        supplies_id: '',
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
    suppliesType.addEventListener('input', readText);
    suppliesCuantity.addEventListener('input', readText);
    suppliesName.addEventListener('input', readText);
    suppliesState.addEventListener('input', readText);
    suppliesUnitvalue.addEventListener('input', readText);
    suppliesTotalvalue.addEventListener('input', readText);
    suppliesMeasure.addEventListener('input', readText);
    suppliesDescription.addEventListener('input', readText);

    // Leer datos del formulario (colback)
    function readText(e) {
        const target = e.target;
        if (target.classList.contains('main__form-field--suppliesId')) {
            suppliesData.supplies_id = target.value;
        } else if (target.classList.contains('main__form-field--suppliesType')) {
            suppliesData.supplies_type = target.value;
        } else if (target.classList.contains('main__form-field--suppliesCuantity')) {
            suppliesData.supplies_cuantity = target.value;
            calculateTotal();
        } else if (target.classList.contains('main__form-field--suppliesName')) {
            suppliesData.supplies_name = target.value;
        } else if (target.classList.contains('main__form-field--suppliesState')) {
            suppliesData.supplies_state = target.value;
        } else if (target.classList.contains('main__form-field--suppliesUnitvalue')) {
            suppliesData.supplies_unit_value = target.value;
            calculateTotal();
        } else if (target.classList.contains('main__form-field--suppliesTotalvalue')) {
            suppliesData.supplies_total_value = target.value;
        } else if (target.classList.contains('main__form-field--suppliesMeasure')) {
            suppliesData.supplies_measure = target.value;
        } else if (target.classList.contains('main__form-field--suppliesDescription')) {
            suppliesData.supplies_description = target.value;
        }
        console.log(suppliesData);
    }

    // Función para mostrar mensajes de error
    function showError(message) {
        console.log(message);
        const error = document.createElement('P');
        error.textContent = message;
        error.classList.add('error');
        suppliesForm.appendChild(error);
        setTimeout(() => {
            error.remove();
        }, 4000);
    }

    // Función para mostrar mensajes de éxito
    function showSuccess(message) {
        const success = document.createElement('P');
        success.textContent = message;
        success.classList.add('correct');
        suppliesForm.appendChild(success);
        setTimeout(() => {
            success.remove();
            window.location.href = 'confirm-update-register-enable-disable.html';
        }, 1500);
    }

    // Función para validar campos numéricos
    function validateNumber(value, fieldName) {
        if (isNaN(value) || value <= 0) {
            throw new Error(`El campo ${fieldName} debe ser un número mayor que 0`);
        }
    }

    // Función para validar campos de texto
    function validateText(value, fieldName) {
        if (!value || value.trim() === '') {
            throw new Error(`El campo ${fieldName} es requerido`);
        }
    }

    // Función para calcular el valor total
    function calculateTotal() {
        if (suppliesCuantity && suppliesUnitvalue) {
            const quantity = parseFloat(suppliesCuantity.value) || 0;
            const unitValue = parseFloat(suppliesUnitvalue.value) || 0;
            const totalValue = quantity * unitValue;
            if (suppliesTotalvalue) {
                suppliesTotalvalue.value = totalValue.toFixed(2);
                suppliesData.supplies_total_value = totalValue.toFixed(2);
            }
        }
    }

    // Event listeners para cálculos automáticos
    if (suppliesCuantity && suppliesUnitvalue) {
        suppliesCuantity.addEventListener('input', calculateTotal);
        suppliesUnitvalue.addEventListener('input', calculateTotal);
    }

    // Manejar el envío del formulario
    suppliesForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('Intentando registrar insumo');

        try {
            // Validar campos requeridos (excluyendo supplies_total_value)
            const requiredFields = {
                'supplies_id': 'ID del insumo',
                'supplies_type': 'Tipo',
                'supplies_cuantity': 'Cantidad',
                'supplies_name': 'Nombre',
                'supplies_state': 'Estado',
                'supplies_unit_value': 'Valor unitario',
                'supplies_measure': 'Unidad de medida',
                'supplies_description': 'Descripción'
            };

            for (const [field, label] of Object.entries(requiredFields)) {
                if (!suppliesData[field] || suppliesData[field].trim() === '') {
                    throw new Error(`El campo ${label} es obligatorio`);
                }
            }

            // Validar caracteres especiales
            const fieldsToValidate = {
                'supplies_id': 'El id no puede contener caracteres especiales',
                'supplies_type': 'El tipo de insumo no puede contener caracteres especiales',
                'supplies_name': 'El nombre del insumo solo permite caracteres'
            };

            for (const [field, message] of Object.entries(fieldsToValidate)) {
                if (hasSpecialChars(suppliesData[field])) {
                    throw new Error(message);
                }
            }

            // Validar campos numéricos
            const numericFields = {
                'supplies_cuantity': 'La cantidad de insumo solo permite números',
                'supplies_unit_value': 'El valor unitario de insumo solo permite números'
            };

            for (const [field, message] of Object.entries(numericFields)) {
                if (isNaN(suppliesData[field])) {
                    throw new Error(message);
                }
            }

            // Calcular el valor total antes de enviar
            calculateTotal();

            // Enviar datos al servidor
            const response = await fetch(`${API_URL}/supplies`, {
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

    // Manejar la selección de archivo
    const fileInput = suppliesForm.querySelector('.main__form-field--upload-input');
    const fileNameDisplay = document.getElementById('fileName');
    
    if (fileInput && fileNameDisplay) {
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                fileNameDisplay.textContent = file.name;
            } else {
                fileNameDisplay.textContent = 'Seleccionar archivo';
            }
        });
    }

    // Función para validar caracteres especiales
    function hasSpecialChars(texto) {
        const regex = /[^a-zA-Z0-9\s]/;
        return regex.test(texto);
    }
});
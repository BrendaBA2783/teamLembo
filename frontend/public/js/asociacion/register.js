// Usar la API_URL existente en lugar de declararla nuevamente
if (typeof API_URL === 'undefined') {
    const API_URL = 'http://localhost:3001/api';
}

// Función para cargar datos en los selects
async function loadSelectData(endpoint, selector) {
    try {
        console.log(`Intentando cargar datos de ${endpoint}...`);
        const response = await fetch(`${API_URL}/${endpoint}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(`Datos recibidos de ${endpoint}:`, data);
        
        const select = document.querySelector(selector);
        if (!select) {
            console.error(`No se encontró el selector ${selector}`);
            return;
        }

        // Limpiar opciones existentes
        select.innerHTML = '';
        
        // Agregar opción por defecto
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'Seleccione una opción';
        select.appendChild(defaultOption);

        if (Array.isArray(data) && data.length > 0) {
            data.forEach(item => {
                const option = document.createElement('option');
                option.value = item.id;
                option.textContent = item.name || `${item.first_name} ${item.last_name}`;
                select.appendChild(option);
            });
        } else {
            console.warn(`No se encontraron datos para ${endpoint}`);
        }
    } catch (error) {
        console.error(`Error cargando datos para ${endpoint}:`, error);
        if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
            console.error('No se puede conectar al servidor. Verifique que el servidor esté corriendo.');
        }
    }
}

// Función para manejar el envío del formulario
async function handleFormSubmit(event) {
    event.preventDefault();

    // Recolectar datos del formulario
    const formData = {
        production_name: document.querySelector('.main__form-field--produccion-name').value,
        production_location: document.querySelector('.main__form-field--produccion-locate').value,
        production_start_date: document.querySelector('.main__form-field--produccion-start-date').value,
        production_end_date: document.querySelector('.main__form-field--produccion-end-date').value,
        production_description: document.querySelector('.main__form-field--produccion-description').value,
        crop_id: document.querySelector('.main__form-field--select-cultivo').value,
        sensor_id: document.querySelector('.main__form-field--select-sensor').value,
        supplies_id: document.querySelector('.main__form-field--select-insumo').value,
        cycle_id: document.querySelector('.main__form-field--select-cycle').value,
        user_id: document.querySelector('.main__form-field--select-usuario').value
    };

    try {
        const response = await fetch(`${API_URL}/production`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
            document.querySelector('.main__form-field--produccion-id').value = result.data.production_code;
            alert('Producción registrada exitosamente');
            window.location.href = 'table.html';
        } else {
            alert('Error al registrar la producción: ' + result.message);
        }
    } catch (error) {
        console.error('Error al enviar el formulario:', error);
        alert('Error al registrar la producción: ' + error.message);
    }
}

// Función para validar el formulario antes de enviar
function validateForm(formData) {
    for (const [key, value] of Object.entries(formData)) {
        if (!value || value.trim() === '') {
            alert(`Por favor complete el campo ${key.replace('_', ' ')}`);
            return false;
        }
    }
    return true;
}

// Función para cargar datos de cultivos
async function loadCropData() {
    try {
        console.log('Intentando cargar datos de crop...');
        const response = await fetch(`${API_URL}/crop`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Datos recibidos de crop:', data);
        return data;
    } catch (error) {
        console.error('Error cargando datos de cultivos:', error);
        return [];
    }
}

// Función para cargar datos de sensores
async function loadSensorData() {
    try {
        console.log('Intentando cargar datos de sensor...');
        const response = await fetch(`${API_URL}/sensor`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Datos recibidos de sensor:', data);
        return data;
    } catch (error) {
        console.error('Error cargando datos de sensores:', error);
        return [];
    }
}

// Función para cargar datos de suministros
async function loadSuppliesData() {
    try {
        console.log('Intentando cargar datos de supplies...');
        const response = await fetch(`${API_URL}/supplies`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Datos recibidos de supplies:', data);
        return data;
    } catch (error) {
        console.error('Error cargando datos de suministros:', error);
        return [];
    }
}

// Función para cargar datos de ciclos
async function loadCycleData() {
    try {
        console.log('Intentando cargar datos de cycle...');
        const response = await fetch(`${API_URL}/cycle`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Datos recibidos de cycle:', data);
        return data;
    } catch (error) {
        console.error('Error cargando datos de ciclos:', error);
        return [];
    }
}

// Función para cargar datos de usuarios
async function loadUserData() {
    try {
        console.log('Intentando cargar datos de users...');
        const response = await fetch(`${API_URL}/users`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Datos recibidos de users:', data);
        return data;
    } catch (error) {
        console.error('Error cargando datos de usuarios:', error);
        return [];
    }
}

// Cargar todos los datos cuando el documento esté listo
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const [crops, sensors, supplies, cycles, users] = await Promise.all([
            loadCropData(),
            loadSensorData(),
            loadSuppliesData(),
            loadCycleData(),
            loadUserData()
        ]);

        // Aquí puedes procesar los datos cargados
        console.log('Todos los datos cargados correctamente');
    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
});

// Función para manejar el modal de cultivo
function setupCropModal() {
    const modal = document.querySelector('.main__modal-crop');
    const openBtn = document.querySelector('.main__form-action--Crop');
    const closeBtn = document.querySelector('.main__modal-crop--close');
    const form = document.querySelector('.main__container--cropForm');
    const fileInput = document.querySelector('.main__form-field--upload-input');
    const fileNameDisplay = document.getElementById('fileName');

    if (!modal || !openBtn || !closeBtn || !form) {
        console.error('No se encontraron elementos del modal de cultivo');
        return;
    }

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

    // Función para validar campos
    function validateFields() {
        const fields = {
            crop_type: form.querySelector('input[name="crop_type"]'),
            crop_location: form.querySelector('input[name="crop_location"]'),
            crop_size: form.querySelector('input[name="crop_size"]'),
            crop_name: form.querySelector('input[name="crop_name"]')
        };

        let isValid = true;
        let errorMessage = '';

        // Validar cada campo
        for (const [fieldName, fieldElement] of Object.entries(fields)) {
            if (!fieldElement) {
                console.error(`No se encontró el campo ${fieldName}`);
                continue;
            }

            const value = fieldElement.value.trim();
            if (!value) {
                isValid = false;
                fieldElement.classList.add('error');
                errorMessage = 'Los campos tipo, ubicación, tamaño y nombre son requeridos';
            } else {
                fieldElement.classList.remove('error');
                cropData[fieldName] = value;
            }
        }

        // Validar descripción
        const descriptionField = form.querySelector('textarea[name="crop_description"]');
        if (descriptionField) {
            cropData.crop_description = descriptionField.value.trim();
        }

        if (!isValid) {
            throw new Error(errorMessage);
        }
    }

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

    // Limpiar errores al escribir
    form?.addEventListener('input', (e) => {
        const field = e.target;
        if (field.classList.contains('error')) {
            field.classList.remove('error');
        }
    });

    openBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        form.reset();
        fileNameDisplay.textContent = 'Seleccionar archivo';
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        try {
            // Validar campos
            validateFields();

            console.log('Enviando datos:', cropData);

            const response = await fetch(`${API_URL}/crop`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cropData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Cultivo creado:', result);
            
            // Mostrar mensaje de éxito
            showSuccess('Cultivo registrado exitosamente');
            
            // Cerrar el modal
            modal.style.display = 'none';
            
            // Recargar los cultivos en el select
            await loadSelectData('crop', '.main__form-field--select-cultivo');
            
            // Limpiar el formulario
            form.reset();
            fileNameDisplay.textContent = 'Seleccionar archivo';
            
        } catch (error) {
            console.error('Error al crear cultivo:', error);
            showError(error.message);
        }
    });

    // Función para mostrar mensajes de error
    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        form.insertBefore(errorDiv, form.firstChild);
        setTimeout(() => errorDiv.remove(), 3000);
    }

    // Función para mostrar mensajes de éxito
    function showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        form.insertBefore(successDiv, form.firstChild);
        setTimeout(() => successDiv.remove(), 3000);
    }
}

// Función para manejar el modal de ciclo
function setupCycleModal() {
    const modal = document.querySelector('.main__modal-cycle');
    const openBtn = document.querySelector('.main__form-action--Cycle');
    const closeBtn = document.querySelector('.main__modal-cycle--close');
    const form = document.querySelector('.main__container--cycleForm');

    if (!modal || !openBtn || !closeBtn || !form) {
        console.error('No se encontraron elementos del modal de ciclo');
        return;
    }

    // Objeto para almacenar los datos del ciclo
    const cycleData = {
        cycle_name: '',
        cycle_location: '',
        cycle_start_date: '',
        cycle_end_date: '',
        cycle_state: 'activo',
        cycle_news: '',
        cycle_description: ''
    };

    // Actualizar el objeto cycleData en tiempo real
    form.addEventListener('input', (e) => {
        const field = e.target;
        const fieldName = field.name;
        
        if (fieldName in cycleData) {
            cycleData[fieldName] = field.value;
        }
    });

    // Limpiar errores al escribir
    form.addEventListener('input', (e) => {
        const field = e.target;
        if (field.classList.contains('error')) {
            field.classList.remove('error');
        }
    });

    openBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        form.reset();
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
            // Validar campos requeridos
            const requiredFields = ['cycle_name', 'cycle_location', 'cycle_start_date', 'cycle_end_date', 'cycle_state'];
            for (const field of requiredFields) {
                if (!cycleData[field]) {
                    throw new Error(`El campo ${field} es requerido`);
                }
            }

            // Validar fechas
            const startDate = new Date(cycleData.cycle_start_date);
            const endDate = new Date(cycleData.cycle_end_date);
            if (startDate >= endDate) {
                throw new Error('La fecha de inicio debe ser anterior a la fecha de fin');
            }

            console.log('Enviando datos del ciclo:', cycleData);

            const response = await fetch(`${API_URL}/cycle`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cycleData)
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error response:', errorText);
                throw new Error(`Error al crear el ciclo: ${response.status} ${response.statusText}`);
            }

            const result = await response.json();
            console.log('Ciclo creado:', result);
            
            // Mostrar mensaje de éxito
            showSuccess('Ciclo creado exitosamente');
            
            // Cerrar el modal
            modal.style.display = 'none';
            
            // Recargar los ciclos en el select
            await loadSelectData('cycle', '.main__form-field--select-cycle');
            
            // Limpiar el formulario
            form.reset();
        } catch (error) {
            console.error('Error al crear ciclo:', error);
            showError(error.message);
        }
    });

    // Función para mostrar mensajes de error
    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        form.insertBefore(errorDiv, form.firstChild);
        setTimeout(() => errorDiv.remove(), 3000);
    }

    // Función para mostrar mensajes de éxito
    function showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        form.insertBefore(successDiv, form.firstChild);
        setTimeout(() => successDiv.remove(), 3000);
    }
}

// Función para manejar el modal de usuario
function setupUserModal() {
    const modal = document.querySelector('.main__modal-user');
    const openBtn = document.querySelector('.main__form-action--User');
    const closeBtn = document.querySelector('.main__modal-user--close');
    const form = document.querySelector('.main__container--userForm');

    openBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            const response = await fetch(`${API_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Usuario creado:', result);
            
            // Cerrar el modal
            modal.style.display = 'none';
            
            // Recargar los usuarios en el select
            await loadUserData();
            
            // Limpiar el formulario
            form.reset();
        } catch (error) {
            console.error('Error al crear usuario:', error);
            alert('Error al crear el usuario');
        }
    });
}

// Función para manejar el modal de sensor
function setupSensorModal() {
    const modal = document.querySelector('.main__modal-sensor');
    const openBtn = document.querySelector('.main__form-action--Sensor');
    const closeBtn = document.querySelector('.main__modal-sensor--close');
    const form = document.querySelector('.main__container--sensorForm');

    openBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            const response = await fetch(`${API_URL}/sensor`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Sensor creado:', result);
            
            // Cerrar el modal
            modal.style.display = 'none';
            
            // Recargar los sensores en el select
            await loadSensorData();
            
            // Limpiar el formulario
            form.reset();
        } catch (error) {
            console.error('Error al crear sensor:', error);
            alert('Error al crear el sensor');
        }
    });
}

// Función para manejar el modal de insumos
function setupSuppliesModal() {
    const modal = document.querySelector('.main__modal-supplies');
    const openBtn = document.querySelector('.main__form-action--Supplies');
    const closeBtn = document.querySelector('.main__modal-supplies--close');
    const form = document.querySelector('.main__container--suppliesForm');

    openBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            const response = await fetch(`${API_URL}/supplies`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Insumo creado:', result);
            
            // Cerrar el modal
            modal.style.display = 'none';
            
            // Recargar los insumos en el select
            await loadSuppliesData();
            
            // Limpiar el formulario
            form.reset();
        } catch (error) {
            console.error('Error al crear insumo:', error);
            alert('Error al crear el insumo');
        }
    });
}

// Inicializar todos los modales cuando el documento esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Cargar datos iniciales para los selects
    loadSelectData('crop', '.main__form-field--select-cultivo');
    loadSelectData('sensor', '.main__form-field--select-sensor');
    loadSelectData('supplies', '.main__form-field--select-insumo');
    loadSelectData('cycle', '.main__form-field--select-cycle');
    loadSelectData('users', '.main__form-field--select-usuario');

    // Manejar el envío del formulario
    const form = document.getElementById('form-asociacion');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }

    // Configurar modales
    setupCropModal();
    setupCycleModal();
    setupUserModal();
    setupSensorModal();
    setupSuppliesModal();
}); 
// Selecciona el elemento select del cultivo
const selectCrop = document.querySelector(".main__form-field--select-cultivo");
const selectUsers = document.querySelector(".main__form-field--select-usuario");
const selectSensor = document.querySelector(".main__form-field--select-sensor");
const selectCycle = document.querySelector(".main__form-field--select-cycle");
const selectSupplies = document.querySelector(".main__form-field--select-insumo");

// Función para cargar datos en los selects
async function loadSelectData(endpoint, selector) {
    try {
        console.log(`Cargando ${endpoint}...`);
        const response = await fetch(`${API_URL}/${endpoint}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(`Datos de ${endpoint} recibidos:`, data);
        
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
                
                // Manejar diferentes tipos de IDs según el endpoint
                switch(endpoint) {
                    case 'crop':
                        option.value = item.crop_id;
                        option.textContent = item.crop_name;
                        break;
                    case 'sensor':
                        option.value = item.sensor_id;
                        option.textContent = item.sensor_name;
                        break;
                    case 'supplies':
                        option.value = item.supplies_id;
                        option.textContent = item.supplies_name;
                        break;
                    case 'cycle':
                        option.value = item.cycle_id;
                        option.textContent = item.cycle_name;
                        break;
                    case 'users':
                        option.value = item.user_id;
                        option.textContent = `${item.user_name || ''} ${item.user_lastname || ''}`.trim() || 'Usuario sin nombre';
                        break;
                    default:
                        option.value = item.id;
                        option.textContent = item.name;
                }
                
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

// Función para cargar insumos
async function loadInsumos() {
    try {
        const response = await fetch(`${API_URL}/supplies`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const select = document.querySelector('.main__form-field--select-insumo');
        select.innerHTML = '<option value="">Seleccionar insumo</option>';
        data.forEach(insumo => {
            const option = document.createElement('option');
            option.value = insumo.supplies_id;
            option.textContent = insumo.supplies_name;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error cargando insumos:', error);
    }
}

// Función para cargar sensores
async function loadSensor() {
    try {
        const response = await fetch(`${API_URL}/sensor`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const select = document.querySelector('.main__form-field--select-sensor');
        select.innerHTML = '<option value="">Seleccionar sensor</option>';
        data.forEach(sensor => {
            const option = document.createElement('option');
            option.value = sensor.sensor_id;
            option.textContent = sensor.sensor_name;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error cargando sensores:', error);
    }
}

// Función para cargar ciclos
async function loadCiclos() {
    try {
        console.log('Cargando ciclos...');
        const response = await fetch(`${API_URL}/cycle`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Datos de ciclos recibidos:', data);
        
        const select = document.querySelector('.main__form-field--select-cycle');
        if (!select) {
            console.error('No se encontró el selector de ciclos');
            return;
        }
        
        select.innerHTML = '<option value="">Seleccionar ciclo</option>';
        if (Array.isArray(data) && data.length > 0) {
            data.forEach(ciclo => {
                const option = document.createElement('option');
                option.value = ciclo.cycle_id;
                option.textContent = ciclo.cycle_name || 'Ciclo sin nombre';
                select.appendChild(option);
            });
        } else {
            console.warn('No se encontraron ciclos');
        }
    } catch (error) {
        console.error('Error cargando ciclos:', error);
    }
}

// Función para cargar usuarios
async function loadUsuarios() {
    try {
        console.log('Cargando usuarios...');
        const response = await fetch(`${API_URL}/users`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Datos de usuarios recibidos:', data);
        
        const select = document.querySelector('.main__form-field--select-usuario');
        if (!select) {
            console.error('No se encontró el selector de usuarios');
            return;
        }
        
        select.innerHTML = '<option value="">Seleccionar usuario</option>';
        if (Array.isArray(data) && data.length > 0) {
            data.forEach(usuario => {
                const option = document.createElement('option');
                option.value = usuario.user_id;
                const nombreCompleto = `${usuario.user_name || ''} ${usuario.user_lastname || ''}`.trim();
                option.textContent = nombreCompleto || 'Usuario sin nombre';
                select.appendChild(option);
            });
        } else {
            console.warn('No se encontraron usuarios');
        }
    } catch (error) {
        console.error('Error cargando usuarios:', error);
    }
}

// Función para cargar cultivos
async function loadCultivos() {
    try {
        const response = await fetch(`${API_URL}/crop`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const select = document.querySelector('.main__form-field--select-cultivo');
        select.innerHTML = '<option value="">Seleccionar cultivo</option>';
        data.forEach(cultivo => {
            const option = document.createElement('option');
            option.value = cultivo.crop_id;
            option.textContent = cultivo.crop_name;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error cargando cultivos:', error);
    }
}

// Cargar datos cuando el documento esté listo
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await Promise.all([
            loadSelectData('crop', '.main__form-field--select-cultivo'),
            loadSelectData('sensor', '.main__form-field--select-sensor'),
            loadSelectData('supplies', '.main__form-field--select-insumo'),
            loadSelectData('cycle', '.main__form-field--select-cycle'),
            loadSelectData('users', '.main__form-field--select-usuario')
        ]);
    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
});
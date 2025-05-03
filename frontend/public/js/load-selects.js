// Configuración de la URL base de la API
const API_URL = 'http://localhost:3001/api';

// Cargar insumos
async function loadInsumos() {
    try {
        console.log('Intentando cargar insumos...');
        const response = await fetch(`${API_URL}/supplies`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Datos de insumos recibidos:', data);
        
        const selectInsumo = document.querySelector('.main__form-field--select-insumo');
        data.forEach(insumo => {
            const option = document.createElement('option');
            option.value = insumo.id;
            option.textContent = insumo.name;
            selectInsumo.appendChild(option);
        });
    } catch (error) {
        console.error('Error al hacer la solicitud:', error);
        if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
            console.error('No se puede conectar al servidor. Verifique que el servidor esté corriendo.');
        }
    }
}

// Cargar sensores
async function loadSensor() {
    try {
        console.log('Intentando cargar sensores...');
        const response = await fetch(`${API_URL}/sensor`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Datos de sensores recibidos:', data);
        
        const selectSensor = document.querySelector('.main__form-field--select-sensor');
        data.forEach(sensor => {
            const option = document.createElement('option');
            option.value = sensor.id;
            option.textContent = sensor.name;
            selectSensor.appendChild(option);
        });
    } catch (error) {
        console.error('Error al hacer la solicitud:', error);
        if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
            console.error('No se puede conectar al servidor. Verifique que el servidor esté corriendo.');
        }
    }
}

// Cargar ciclos
async function loadCiclos() {
    try {
        console.log('Intentando cargar ciclos...');
        const response = await fetch(`${API_URL}/cycle`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Datos de ciclos recibidos:', data);
        
        const selectCiclo = document.querySelector('.main__form-field--select-cycle');
        data.forEach(ciclo => {
            const option = document.createElement('option');
            option.value = ciclo.id;
            option.textContent = ciclo.name;
            selectCiclo.appendChild(option);
        });
    } catch (error) {
        console.error('Error al hacer la solicitud:', error);
        if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
            console.error('No se puede conectar al servidor. Verifique que el servidor esté corriendo.');
        }
    }
}

// Cargar usuarios
async function loadUsuarios() {
    try {
        console.log('Intentando cargar usuarios...');
        const response = await fetch(`${API_URL}/users`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Datos de usuarios recibidos:', data);
        
        const selectUsuario = document.querySelector('.main__form-field--select-usuario');
        data.forEach(usuario => {
            const option = document.createElement('option');
            option.value = usuario.id;
            option.textContent = usuario.name;
            selectUsuario.appendChild(option);
        });
    } catch (error) {
        console.error('Error al hacer la solicitud:', error);
        if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
            console.error('No se puede conectar al servidor. Verifique que el servidor esté corriendo.');
        }
    }
}

// Cargar cultivos
async function loadCultivos() {
    try {
        console.log('Intentando cargar cultivos...');
        const response = await fetch(`${API_URL}/crop`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Datos de cultivos recibidos:', data);
        
        const selectCultivo = document.querySelector('.main__form-field--select-cultivo');
        data.forEach(cultivo => {
            const option = document.createElement('option');
            option.value = cultivo.id;
            option.textContent = cultivo.name;
            selectCultivo.appendChild(option);
        });
    } catch (error) {
        console.error('Error al hacer la solicitud:', error);
        if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
            console.error('No se puede conectar al servidor. Verifique que el servidor esté corriendo.');
        }
    }
}

// Cargar todos los datos cuando el documento esté listo
document.addEventListener('DOMContentLoaded', () => {
    loadInsumos();
    loadSensor();
    loadCiclos();
    loadUsuarios();
    loadCultivos();
}); 
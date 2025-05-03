const API_URL = 'http://localhost:3001/api';

// Función para obtener el ID del sensor de la URL
function getSensorIdFromUrl() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        console.log('URL Params:', urlParams.toString());
        console.log('ID recibido:', id);
        
        if (!id) {
            throw new Error('ID no proporcionado');
        }
        
        return id;
    } catch (error) {
        console.error('Error al obtener ID:', error);
        return null;
    }
}

// Función para cargar los datos del sensor
async function loadSensorDetails() {
    try {
        const sensorId = getSensorIdFromUrl();
        if (!sensorId) {
            showError('Por favor, seleccione un sensor desde la tabla');
            setTimeout(() => {
                window.location.href = 'table.html';
            }, 2000);
            return;
        }

        const response = await fetch(`${API_URL}/sensor/${sensorId}`);
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Sensor no encontrado');
            }
            throw new Error('Error al cargar los detalles del sensor');
        }

        const sensor = await response.json();
        updateSensorDetails(sensor);
    } catch (error) {
        console.error('Error:', error);
        showError(error.message);
        
        if (error.message === 'Sensor no encontrado') {
            setTimeout(() => {
                window.location.href = 'table.html';
            }, 2000);
        }
    }
}

// Función para actualizar los detalles en la página
function updateSensorDetails(sensor) {
    const detailsContainer = document.getElementById('sensorDetails');
    
    detailsContainer.innerHTML = `
        <div class="detail-group">
            <h3>Información General</h3>
            <p><strong>ID:</strong> ${sensor.sensor_id}</p>
            <p><strong>Nombre:</strong> ${sensor.sensor_name}</p>
            <p><strong>Tipo:</strong> ${sensor.sensor_type}</p>
            <p><strong>Estado:</strong> <span class="status-${sensor.sensor_state === 'activo' ? 'active' : 'inactive'}">${sensor.sensor_state}</span></p>
        </div>

        <div class="detail-group">
            <h3>Especificaciones Técnicas</h3>
            <p><strong>Unidad de Medida:</strong> ${sensor.unit_measure}</p>
            <p><strong>Tiempo de Escaneo:</strong> ${sensor.scan_time} minutos</p>
        </div>

        ${sensor.sensor_description ? `
        <div class="detail-group">
            <h3>Descripción</h3>
            <p>${sensor.sensor_description}</p>
        </div>
        ` : ''}

        ${sensor.sensor_image ? `
        <div class="detail-group">
            <h3>Imagen del Sensor</h3>
            <img src="${sensor.sensor_image}" alt="Imagen del sensor" class="sensor-image">
        </div>
        ` : ''}
    `;
}

// Función para mostrar mensajes de error
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    document.querySelector('.container').prepend(errorDiv);
    setTimeout(() => errorDiv.remove(), 3000);
}

// Cargar los detalles cuando se carga la página
document.addEventListener('DOMContentLoaded', loadSensorDetails);

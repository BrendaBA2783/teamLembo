const API_URL = 'http://localhost:3000';

async function loadSensorDetails() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        
        if (!id) {
            throw new Error('ID no proporcionado');
        }

        const response = await fetch(`${API_URL}/sensor/${id}`);
        if (!response.ok) {
            throw new Error(`Error del servidor: ${response.status}`);
        }

        const data = await response.json();
        renderDetails(data);
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('sensorDetails').innerHTML = `
            <div class="error-message">
                <p>${error.message}</p>
                <button onclick="window.history.back()" class="button">Volver</button>
            </div>
        `;
    }
}

function renderDetails(data) {
    const statusClass = data.sensor_status === 'activo' ? 'status-active' : 'status-inactive';
    
    const detailsHtml = `
        <div class="detail-group">
            <h3>Información General</h3>
            <p><strong>ID:</strong> ${data.sensor_id}</p>
            <p><strong>Nombre:</strong> ${data.sensor_name || '-'}</p>
            <p><strong>Tipo:</strong> ${data.sensor_type || '-'}</p>
            <p><strong>Medida:</strong> ${data.sensor_measure || '-'}</p>
            <p><strong>Tiempo de Escaneo:</strong> ${data.sensor_scan_time || '-'} segundos</p>
            <p class="${statusClass}"><strong>Estado:</strong> ${data.sensor_status || '-'}</p>
        </div>
        <div class="detail-group">
            <h3>Descripción</h3>
            <p>${data.sensor_description || 'Sin descripción'}</p>
        </div>
    `;
    
    document.getElementById('sensorDetails').innerHTML = detailsHtml;
}

document.addEventListener('DOMContentLoaded', loadSensorDetails);

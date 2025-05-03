const API_URL = 'http://localhost:3000';

async function loadCropDetails() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        
        console.log('URL Params:', urlParams.toString()); // Debug
        console.log('ID recibido:', id); // Debug

        if (!id) {
            throw new Error('ID no proporcionado');
        }

        const response = await fetch(`${API_URL}/crop/${id}`);
        if (!response.ok) {
            throw new Error(`Error del servidor: ${response.status}`);
        }

        const data = await response.json();
        console.log('Datos recibidos:', data); // Debug
        renderDetails(data);
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('cropDetails').innerHTML = `
            <div class="error-message">
                <p>${error.message}</p>
                <button onclick="window.history.back()" class="button">Volver</button>
            </div>
        `;
    }
}

function renderDetails(data) {
    const statusClass = data.crop_state === 'active' ? 'status-active' : 'status-inactive';
    
    const detailsHtml = `
        <div class="detail-group">
            <h3>Información del Cultivo</h3>
            <p><strong>ID:</strong> ${data.crop_id}</p>
            <p><strong>Nombre:</strong> ${data.crop_name || '-'}</p>
            <p><strong>Tipo:</strong> ${data.crop_type || '-'}</p>
            <p><strong>Ubicación:</strong> ${data.crop_location || '-'}</p>
            <p class="${statusClass}"><strong>Estado:</strong> ${data.crop_state || '-'}</p>
            <p><strong>Tamaño:</strong> ${data.crop_size || '-'}</p>
        </div>
        <div class="detail-group">
            <h3>Descripción</h3>
            <p>${data.crop_description || 'Sin descripción'}</p>
        </div>
    `;
    
    document.getElementById('cropDetails').innerHTML = detailsHtml;
}

document.addEventListener('DOMContentLoaded', loadCropDetails);

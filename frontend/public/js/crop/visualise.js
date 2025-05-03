const API_URL = 'http://localhost:3001/api';

// Función para obtener el ID del cultivo de la URL
function getCropIdFromUrl() {
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

// Función para cargar los datos del cultivo
async function loadCropDetails() {
    try {
        const cropId = getCropIdFromUrl();
        if (!cropId) {
            showError('Por favor, seleccione un cultivo desde la tabla');
            setTimeout(() => {
                window.location.href = 'table.html';
            }, 2000);
            return;
        }

        const response = await fetch(`${API_URL}/crop/${cropId}`);
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Cultivo no encontrado');
            }
            throw new Error('Error al cargar los detalles del cultivo');
        }

        const crop = await response.json();
        updateCropDetails(crop);
    } catch (error) {
        console.error('Error:', error);
        showError(error.message);
        
        // Si el cultivo no existe, redirigir a la tabla
        if (error.message === 'Cultivo no encontrado') {
            setTimeout(() => {
                window.location.href = 'table.html';
            }, 2000);
        }
    }
}

// Función para actualizar los detalles en la página
function updateCropDetails(crop) {
    // Actualizar información general
    document.getElementById('cropId').textContent = crop.crop_id;
    document.getElementById('cropName').textContent = crop.crop_name;
    document.getElementById('cropType').textContent = crop.crop_type;
    document.getElementById('cropState').textContent = crop.crop_state;
    
    // Actualizar ubicación y tamaño
    document.getElementById('cropLocation').textContent = crop.crop_location;
    document.getElementById('cropSize').textContent = crop.crop_size;
    
    // Actualizar descripción
    document.getElementById('cropDescription').textContent = crop.crop_description || 'Sin descripción disponible';
    
    // Actualizar imagen
    const cropImage = document.getElementById('cropImage');
    if (crop.crop_image) {
        cropImage.src = crop.crop_image;
    } else {
        cropImage.src = '../../img/default-crop.png';
    }
}

// Función para mostrar mensajes de error
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    document.querySelector('.main').prepend(errorDiv);
    setTimeout(() => errorDiv.remove(), 3000);
}

// Cargar los detalles cuando se carga la página
document.addEventListener('DOMContentLoaded', loadCropDetails); 
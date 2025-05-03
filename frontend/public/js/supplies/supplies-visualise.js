const API_URL = 'http://localhost:3001/api';

// Función para obtener el ID del insumo de la URL
function getSupplyIdFromUrl() {
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

// Función para cargar los datos del insumo
async function loadSupplyDetails() {
    try {
        const supplyId = getSupplyIdFromUrl();
        if (!supplyId) {
            showError('Por favor, seleccione un insumo desde la tabla');
            setTimeout(() => {
                window.location.href = 'table.html';
            }, 2000);
            return;
        }

        const response = await fetch(`${API_URL}/supplies/${supplyId}`);
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Insumo no encontrado');
            }
            throw new Error('Error al cargar los detalles del insumo');
        }

        const supply = await response.json();
        updateSupplyDetails(supply);
    } catch (error) {
        console.error('Error:', error);
        showError(error.message);
        
        if (error.message === 'Insumo no encontrado') {
            setTimeout(() => {
                window.location.href = 'table.html';
            }, 2000);
        }
    }
}

// Función para actualizar los detalles en la página
function updateSupplyDetails(supply) {
    const detailsContainer = document.getElementById('supplyDetails');
    
    detailsContainer.innerHTML = `
        <div class="detail-group">
            <h3>Información General</h3>
            <p><strong>ID:</strong> ${supply.supplies_id}</p>
            <p><strong>Nombre:</strong> ${supply.supplies_name}</p>
            <p><strong>Tipo:</strong> ${supply.supplies_type}</p>
            <p><strong>Estado:</strong> <span class="status-${supply.supplies_state === 'activo' ? 'active' : 'inactive'}">${supply.supplies_state}</span></p>
        </div>

        <div class="detail-group">
            <h3>Detalles de Inventario</h3>
            <p><strong>Cantidad:</strong> ${supply.supplies_cuantity}</p>
            <p><strong>Unidad de Medida:</strong> ${supply.supplies_measure}</p>
            
            <div class="value-box">
                <strong>Valor Unitario:</strong>
                <span>$${supply.supplies_unit_value.toLocaleString()}</span>
            </div>
            
            <div class="value-box">
                <strong>Valor Total:</strong>
                <span>$${supply.supplies_total_value.toLocaleString()}</span>
            </div>
        </div>

        ${supply.supplies_description ? `
        <div class="detail-group">
            <h3>Descripción</h3>
            <p>${supply.supplies_description}</p>
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
document.addEventListener('DOMContentLoaded', loadSupplyDetails); 
const API_URL = 'http://localhost:3001/api';

// Función para cargar los datos del insumo
async function loadSupplyData() {
    try {
        // Obtener el ID del insumo de la URL
        const urlParams = new URLSearchParams(window.location.search);
        const supplyId = urlParams.get('id');

        if (!supplyId) {
            throw new Error('No se proporcionó un ID de insumo');
        }

        // Hacer la petición al servidor
        const response = await fetch(`${API_URL}/supplies/${supplyId}`);
        if (!response.ok) {
            throw new Error('Error al cargar los datos del insumo');
        }

        const supply = await response.json();

        // Mostrar los datos en la página
        document.getElementById('supplyId').textContent = supply.supplies_id || '-';
        document.getElementById('supplyName').textContent = supply.supplies_name || '-';
        document.getElementById('supplyType').textContent = supply.supplies_type || '-';
        document.getElementById('supplyQuantity').textContent = supply.supplies_cuantity || '0';
        document.getElementById('supplyUnit').textContent = supply.supplies_measure || '-';
        document.getElementById('supplyUnitValue').textContent = supply.supplies_unit_value ? `$${supply.supplies_unit_value.toLocaleString()}` : '$0';
        document.getElementById('supplyTotalValue').textContent = supply.supplies_total_value ? `$${supply.supplies_total_value.toLocaleString()}` : '$0';
        document.getElementById('supplyState').textContent = supply.supplies_state || '-';

    } catch (error) {
        console.error('Error:', error);
        alert('Error al cargar los datos del insumo: ' + error.message);
    }
}

// Cargar los datos cuando el documento esté listo
document.addEventListener('DOMContentLoaded', loadSupplyData); 
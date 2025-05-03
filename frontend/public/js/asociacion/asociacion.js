const API_URL = 'http://localhost:3001/api';

async function loadAssociations() {
    try {
        const response = await fetch(`${API_URL}/associations`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Datos recibidos:', data); // Para depuración
        displayAssociations(data);
    } catch (error) {
        console.error('Error cargando asociaciones:', error);
        const tbody = document.querySelector('.main__tbody');
        tbody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 20px;">
                    Error al cargar los datos. Por favor, intente nuevamente.
                </td>
            </tr>
        `;
    }
}

function displayAssociations(associations) {
    const tbody = document.querySelector('.main__tbody');
    tbody.innerHTML = ''; // Limpiar tabla

    if (!Array.isArray(associations) || associations.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 20px;">
                    No hay asociaciones registradas.
                </td>
            </tr>
        `;
        return;
    }

    associations.forEach(association => {
        const row = document.createElement('tr');
        row.className = 'main__table-row';
        row.dataset.id = association.association_id;
        
        // Preparar datos para mostrar
        const cropName = association.crop_name || '-';
        const sensors = Array.isArray(association.sensors) 
            ? association.sensors.map(s => s.sensor_name).join(', ') 
            : association.sensor_name || '-';
        const supplies = Array.isArray(association.supplies) 
            ? association.supplies.map(s => s.supplies_name).join(', ') 
            : association.supplies_name || '-';
        const cycleName = association.cycle_name || '-';
        const userName = association.user_name || '-';
        const state = association.association_state || '-';
        const stateClass = state === 'activo' ? 'main__table-cell--active' : 'main__table-cell--inactive';
        
        row.innerHTML = `
            <td class="main__table-cell main__table-cell--checkbox">
                <input type="checkbox" class="main__table-checkbox" value="${association.association_id}">
            </td>
            <td class="main__table-cell">${cropName}</td>
            <td class="main__table-cell">${sensors}</td>
            <td class="main__table-cell">${supplies}</td>
            <td class="main__table-cell">${cycleName}</td>
            <td class="main__table-cell">${userName}</td>
            <td class="main__table-cell main__table-cell--status ${stateClass}">
                ${state}
            </td>
        `;
        
        tbody.appendChild(row);
    });

    // Inicializar checkbox "Seleccionar todos"
    initializeSelectAll();
}

function initializeSelectAll() {
    const selectAllCheckbox = document.getElementById('selectAll');
    const checkboxes = document.querySelectorAll('.main__table-checkbox:not(#selectAll)');
    
    selectAllCheckbox.addEventListener('change', () => {
        checkboxes.forEach(checkbox => {
            checkbox.checked = selectAllCheckbox.checked;
        });
    });
}

async function toggleEstado(estado) {
    const selectedCheckboxes = document.querySelectorAll('.main__table-checkbox:checked:not(#selectAll)');
    if (selectedCheckboxes.length === 0) {
        alert('Por favor seleccione al menos una asociación');
        return;
    }

    try {
        for (const checkbox of selectedCheckboxes) {
            const row = checkbox.closest('tr');
            const id = row.dataset.id;
            
            const response = await fetch(`${API_URL}/associations/${id}/state`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ state: estado })
            });

            if (!response.ok) {
                throw new Error(`Error al actualizar estado: ${response.statusText}`);
            }
        }
        // Recargar datos después de actualizar
        await loadAssociations();
    } catch (error) {
        console.error('Error:', error);
        alert('Error al actualizar el estado');
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    loadAssociations();

    // Agregar handlers para habilitar/deshabilitar
    document.getElementById('deshabilitarHabilitarMenu').addEventListener('click', (e) => {
        if (e.target.matches('a')) {
            e.preventDefault();
            const estado = e.target.textContent === 'Habilitar' ? 'activo' : 'inactivo';
            toggleEstado(estado);
        }
    });

    // Search handler
    document.querySelector('.search__input').addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        document.querySelectorAll('.main__table-row').forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    });

    // Manejar selección de todas las filas
    document.getElementById('selectAll').addEventListener('change', function(e) {
        const checkboxes = document.querySelectorAll('.main__table-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.checked = e.target.checked;
        });
    });
});

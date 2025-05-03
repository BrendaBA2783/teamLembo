// Importar funciones de exportación
import { initializeExportButtons, showError } from '../utils/export-utils.js';

const API_URL = 'http://localhost:3001/api';

// Función para cargar los sensores
async function loadSensors() {
    try {
        const response = await fetch(`${API_URL}/sensors`);
        if (!response.ok) {
            throw new Error('Error al cargar los sensores');
        }
        const sensors = await response.json();
        const tbody = document.querySelector('.main__tbody');
        tbody.innerHTML = '';

        sensors.forEach(sensor => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="main__table-data">
                    <input type="checkbox" class="main__table-checkbox" data-id="${sensor.id}">
                </td>
                <td class="main__table-data">${sensor.id}</td>
                <td class="main__table-data">${sensor.name}</td>
                <td class="main__table-data">${sensor.type}</td>
                <td class="main__table-data">${sensor.location}</td>
                <td class="main__table-data">${sensor.state}</td>
            `;
            tbody.appendChild(row);
        });

        // Inicializar los botones de exportación
        initializeExportButtons('sensors');
    } catch (error) {
        showError('Error al cargar los sensores: ' + error.message);
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

// Función para mostrar mensajes de éxito
function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    document.querySelector('.main').prepend(successDiv);
    setTimeout(() => successDiv.remove(), 3000);
}

// Función para inicializar el checkbox "Seleccionar todo"
function initializeSelectAll() {
    const selectAll = document.getElementById('selectAll');
    const checkboxes = document.querySelectorAll('.main__table-checkbox:not(#selectAll)');

    selectAll.addEventListener('change', () => {
        checkboxes.forEach(checkbox => {
            checkbox.checked = selectAll.checked;
        });
    });
}

// Función para manejar el cambio de estado
async function toggleSensorState(state) {
    const selectedCheckboxes = document.querySelectorAll('.main__table-checkbox:checked:not(#selectAll)');
    const ids = Array.from(selectedCheckboxes).map(cb => cb.dataset.id);
    
    if (ids.length === 0) {
        showError('Por favor, seleccione al menos un sensor');
        return;
    }

    try {
        for (const id of ids) {
            const response = await fetch(`${API_URL}/sensor/${id}/state`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ state })
            });

            if (!response.ok) throw new Error('Error al actualizar el estado');
        }

        showSuccess('Estados actualizados correctamente');
        loadSensors(); // Recargar la tabla
    } catch (error) {
        console.error('Error:', error);
        showError('Error al actualizar los estados');
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    loadSensors();
    initializeSelectAll();

    // Manejar cambios de estado
    const stateLinks = document.querySelectorAll('#deshabilitarHabilitarMenu a');
    stateLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            toggleSensorState(e.target.dataset.state);
        });
    });

    // Manejar búsqueda
    const searchInput = document.querySelector('.search__input');
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const rows = document.querySelectorAll('.main__tbody .main__table-row');
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchTerm) ? '' : 'none';
        });
    });

    // Manejar visualización
    const visualizeLink = document.querySelector('a[href="id-visualise.html"]');
    visualizeLink?.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedCheckboxes = document.querySelectorAll('.main__table-checkbox:checked:not(#selectAll)');
        
        if (selectedCheckboxes.length !== 1) {
            showError('Por favor, seleccione un único sensor para visualizar');
            return;
        }

        const sensorId = selectedCheckboxes[0].dataset.id;
        window.location.href = `visualise.html?id=${sensorId}`;
    });
});

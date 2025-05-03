// Importar funciones de exportación
import { initializeExportButtons, showError } from '../utils/export-utils.js';

const API_URL = 'http://localhost:3001/api';

// Función para cargar los cultivos en la tabla
async function loadCrops() {
    try {
        const response = await fetch(`${API_URL}/crops`);
        if (!response.ok) {
            throw new Error('Error al cargar los cultivos');
        }
        const crops = await response.json();
        const tbody = document.querySelector('.main__tbody');
        tbody.innerHTML = '';

        crops.forEach(crop => {
            const row = document.createElement('tr');
            row.className = 'main__table-row';
            row.innerHTML = `
                <td class="main__table-cell main__table-cell--checkbox">
                    <input type="checkbox" class="main__table-checkbox" data-id="${crop.id}">
                </td>
                <td class="main__table-cell">${crop.id}</td>
                <td class="main__table-cell">${crop.type}</td>
                <td class="main__table-cell">${crop.name}</td>
                <td class="main__table-cell">${crop.size}</td>
                <td class="main__table-cell">${crop.description}</td>
                <td class="main__table-cell">${crop.state}</td>
            `;
            tbody.appendChild(row);
        });

        // Inicializar checkbox "Seleccionar todos"
        initializeSelectAll();
        // Inicializar botones de exportación
        initializeExportButtons('crops');
    } catch (error) {
        showError('Error al cargar los cultivos: ' + error.message);
    }
}

// Función para mostrar mensajes de éxito
function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    document.querySelector('.main').prepend(successDiv);
    setTimeout(() => successDiv.remove(), 3000);
}

// Inicializar checkbox "Seleccionar todos"
function initializeSelectAll() {
    const selectAll = document.getElementById('selectAll');
    const checkboxes = document.querySelectorAll('.main__table-checkbox:not(#selectAll)');
    
    if (selectAll) {
        selectAll.addEventListener('change', () => {
            checkboxes.forEach(checkbox => {
                checkbox.checked = selectAll.checked;
            });
        });
    }
}

// Función para manejar el cambio de estado
async function toggleCropState(state) {
    const selectedCheckboxes = document.querySelectorAll('.main__table-checkbox:checked:not(#selectAll)');
    const ids = Array.from(selectedCheckboxes).map(cb => cb.dataset.id);
    
    if (ids.length === 0) {
        showError('Por favor, seleccione al menos un cultivo');
        return;
    }

    try {
        for (const id of ids) {
            const response = await fetch(`${API_URL}/crop/${id}/state`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ state })
            });

            if (!response.ok) throw new Error('Error al actualizar el estado');
        }

        showSuccess('Estados actualizados correctamente');
        loadCrops(); // Recargar la tabla
    } catch (error) {
        console.error('Error:', error);
        showError('Error al actualizar los estados');
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    loadCrops();

    // Manejar cambios de estado
    const stateLinks = document.querySelectorAll('#deshabilitarHabilitarMenu a');
    stateLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            toggleCropState(e.target.dataset.state);
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
    const visualizeLink = document.getElementById('visualizarLink');
    visualizeLink?.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedCheckboxes = document.querySelectorAll('.main__table-checkbox:checked:not(#selectAll)');
        
        if (selectedCheckboxes.length !== 1) {
            showError('Por favor, seleccione un único cultivo para visualizar');
            return;
        }

        const cropId = selectedCheckboxes[0].dataset.id;
        if (cropId) {
            window.location.href = `visualise.html?id=${cropId}`;
        } else {
            showError('Error al obtener el ID del cultivo');
        }
    });
});

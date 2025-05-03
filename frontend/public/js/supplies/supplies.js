// Importar funciones de exportación
import { initializeExportButtons, showError } from '../utils/export-utils.js';

const API_URL = 'http://localhost:3001/api';

// Función para cargar los insumos en la tabla
async function loadSupplies() {
    try {
        const response = await fetch(`${API_URL}/supplies`);
        if (!response.ok) {
            throw new Error('Error al cargar los insumos');
        }
        const supplies = await response.json();
        const tbody = document.querySelector('.main__tbody');
        tbody.innerHTML = '';

        supplies.forEach(supply => {
            const row = document.createElement('tr');
            row.className = 'main__table-row';
            row.innerHTML = `
                <td class="main__table-cell main__table-cell--checkbox">
                    <input type="checkbox" class="main__table-checkbox" data-id="${supply.supplies_id}">
                </td>
                <td class="main__table-cell">${supply.supplies_id}</td>
                <td class="main__table-cell">${supply.supplies_name}</td>
                <td class="main__table-cell">${supply.supplies_type}</td>
                <td class="main__table-cell">${supply.supplies_cuantity || '0'}</td>
                <td class="main__table-cell">${supply.supplies_measure || '-'}</td>
                <td class="main__table-cell">$${(supply.supplies_unit_value || 0).toLocaleString()}</td>
                <td class="main__table-cell">$${(supply.supplies_total_value || 0).toLocaleString()}</td>
                <td class="main__table-cell">${supply.supplies_state}</td>
            `;
            tbody.appendChild(row);
        });

        // Inicializar checkbox "Seleccionar todos"
        initializeSelectAll();
        // Inicializar botones de exportación
        initializeExportButtons('supplies');
    } catch (error) {
        showError('Error al cargar los insumos: ' + error.message);
    }
}

// Función para inicializar el checkbox "Seleccionar todos"
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
async function toggleSupplyState(state) {
    const selectedCheckboxes = document.querySelectorAll('.main__table-checkbox:checked:not(#selectAll)');
    const ids = Array.from(selectedCheckboxes).map(cb => cb.dataset.id);
    
    if (ids.length === 0) {
        showError('Por favor, seleccione al menos un insumo');
        return;
    }

    try {
        for (const id of ids) {
            const response = await fetch(`${API_URL}/supplies/${id}/state`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ state })
            });

            if (!response.ok) throw new Error('Error al actualizar el estado');
        }

        showError('Estados actualizados correctamente');
        loadSupplies(); // Recargar la tabla
    } catch (error) {
        console.error('Error:', error);
        showError('Error al actualizar los estados');
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    loadSupplies();

    // Manejar cambios de estado
    const stateLinks = document.querySelectorAll('#deshabilitarHabilitarMenu a');
    stateLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            toggleSupplyState(e.target.dataset.state);
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
    visualizeLink.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedCheckboxes = document.querySelectorAll('.main__table-checkbox:checked:not(#selectAll)');
        
        if (selectedCheckboxes.length !== 1) {
            showError('Por favor, seleccione un único insumo para visualizar');
            return;
        }

        const supplyId = selectedCheckboxes[0].dataset.id;
        window.location.href = `id-visualise.html?id=${supplyId}`;
    });
}); 
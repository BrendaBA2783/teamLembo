// Importar funciones de exportación
import { initializeExportButtons, showError } from '../utils/export-utils.js';

const API_URL = 'http://localhost:3001/api';

// Función para cargar los ciclos de cultivo
async function loadCropCycles() {
    try {
        const response = await fetch(`${API_URL}/crop-cycles`);
        if (!response.ok) {
            throw new Error('Error al cargar los ciclos de cultivo');
        }
        const cycles = await response.json();
        const tbody = document.querySelector('.main__tbody');
        tbody.innerHTML = '';

        cycles.forEach(cycle => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="main__table-data">
                    <input type="checkbox" class="main__table-checkbox" data-id="${cycle.id}">
                </td>
                <td class="main__table-data">${cycle.id}</td>
                <td class="main__table-data">${cycle.crop_name}</td>
                <td class="main__table-data">${cycle.start_date}</td>
                <td class="main__table-data">${cycle.end_date || '-'}</td>
                <td class="main__table-data">${cycle.state}</td>
            `;
            tbody.appendChild(row);
        });

        // Inicializar los botones de exportación
        initializeExportButtons('crop-cycles');
    } catch (error) {
        showError('Error al cargar los ciclos de cultivo: ' + error.message);
    }
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

// Cargar los ciclos de cultivo cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    loadCropCycles();
    initializeSelectAll();
}); 
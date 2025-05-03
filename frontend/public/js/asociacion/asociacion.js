const API_URL = 'http://localhost:3000';

async function loadAsociaciones() {
    try {
        console.log('Intentando conectar al servidor...');
        const response = await fetch(`${API_URL}/associations`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Datos recibidos:', data);
        renderTablaAsociaciones(data);
    } catch (error) {
        console.error('Error cargando asociaciones:', error);
        if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
            alert('No se puede conectar al servidor. Por favor, verifique que el servidor esté corriendo.');
        } else {
            alert('Error al cargar los datos. Por favor, intente de nuevo.');
        }
    }
}

function renderTablaAsociaciones(asociaciones) {
    const tbody = document.querySelector('.main__tbody');
    tbody.innerHTML = asociaciones.map(a => `
        <tr class="main__table-row" data-id="${a.association_id}">
            <td class="main__table-cell">
                <input type="checkbox" class="main__table-checkbox">
            </td>
            <td class="main__table-cell">${a.crop_name || '-'}</td>
            <td class="main__table-cell">${a.sensor_name || '-'}</td>
            <td class="main__table-cell">${a.supplies_name || '-'}</td>
            <td class="main__table-cell">${a.cycle_name || '-'}</td>
            <td class="main__table-cell">${a.user_full_name || '-'}</td>
            <td class="main__table-cell">${a.association_state || '-'}</td>
        </tr>
    `).join('');

    // Agregar funcionalidad al checkbox de "Seleccionar todos"
    const selectAll = document.getElementById('selectAll');
    if (selectAll) {
        selectAll.addEventListener('change', (e) => {
            const checkboxes = document.querySelectorAll('.main__table-checkbox:not(#selectAll)');
            checkboxes.forEach(checkbox => {
                checkbox.checked = e.target.checked;
                const row = checkbox.closest('tr');
                row.classList.toggle('selected', e.target.checked);
            });
        });
    }

    // Add individual checkbox functionality
    document.querySelectorAll('.main__table-checkbox:not(#selectAll)').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const row = e.target.closest('tr');
            row.classList.toggle('selected', e.target.checked);
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
        await loadAsociaciones();
    } catch (error) {
        console.error('Error:', error);
        alert('Error al actualizar el estado');
    }
}

function exportarDatos(formato) {
    window.location.href = `${API_URL}/associations/export?format=${formato}`;
}

async function exportToPDF(data) {
    // Implementación para exportar a PDF
    console.log('Exportando a PDF:', data);
}

async function exportToExcel(data) {
    // Implementación para exportar a Excel
    console.log('Exportando a Excel:', data);
}

async function handleDownload(format) {
    try {
        const response = await fetch(`${API_URL}/associations/export?format=${format}`);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        const extension = format === 'excel' ? 'xlsx' : 'pdf';
        a.href = url;
        a.download = `asociaciones.${extension}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    } catch (error) {
        console.error('Error al descargar:', error);
        alert('Error al descargar el archivo');
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    console.log('Cargando asociaciones...'); // Para debug
    loadAsociaciones();

    // Agregar handlers para habilitar/deshabilitar
    document.getElementById('deshabilitarHabilitarMenu').addEventListener('click', (e) => {
        if (e.target.matches('a')) {
            e.preventDefault();
            const estado = e.target.textContent === 'Habilitar' ? 'activo' : 'inactivo';
            toggleEstado(estado);
        }
    });

    // Export handlers
    document.getElementById('descargarMenu').addEventListener('click', (e) => {
        if (e.target.matches('a')) {
            e.preventDefault();
            const format = e.target.textContent.toLowerCase();
            handleDownload(format);
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

    // Permitir selección de filas
    document.querySelector('.main__tbody').addEventListener('click', (e) => {
        const row = e.target.closest('.main__table-row');
        if (row) {
            row.classList.toggle('selected');
        }
    });

    // Visualizar asociación
    document.getElementById('visualizarMenu').addEventListener('click', (e) => {
        if (e.target.matches('a')) {
            e.preventDefault();
            const selectedCheckboxes = document.querySelectorAll('.main__table-checkbox:checked:not(#selectAll)');
            
            if (selectedCheckboxes.length !== 1) {
                alert('Por favor seleccione una única asociación para visualizar');
                return;
            }

            const row = selectedCheckboxes[0].closest('tr');
            const id = row.dataset.id;
            window.location.href = `id-visualise.html?id=${id}`;
        }
    });
});

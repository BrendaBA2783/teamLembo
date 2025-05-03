const API_URL = 'http://localhost:3000';

async function loadCrops() {
    try {
        const response = await fetch(`${API_URL}/crop`);
        const data = await response.json();
        renderTablaCrops(data);
    } catch (error) {
        console.error('Error:', error);
        alert('Error al cargar los cultivos');
    }
}

function renderTablaCrops(crops) {
    const tbody = document.querySelector('.main__tbody');
    tbody.innerHTML = crops.map(crop => `
        <tr class="main__table-row" data-id="${crop.crop_id}">
            <td class="main__table-cell">
                <input type="checkbox" class="main__table-checkbox">
            </td>
            <td class="main__table-cell">${crop.crop_id}</td>
            <td class="main__table-cell">${crop.crop_type}</td>
            <td class="main__table-cell">${crop.crop_name}</td>
            <td class="main__table-cell">${crop.crop_size}</td>
            <td class="main__table-cell">${crop.crop_description}</td>
            <td class="main__table-cell">${crop.crop_state}</td>
        </tr>
    `).join('');

    setupCheckboxes();
}

function setupCheckboxes() {
    const selectAll = document.getElementById('selectAll');
    if (selectAll) {
        selectAll.addEventListener('change', (e) => {
            document.querySelectorAll('.main__table-checkbox:not(#selectAll)').forEach(checkbox => {
                checkbox.checked = e.target.checked;
                checkbox.closest('tr').classList.toggle('selected', e.target.checked);
            });
        });
    }

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
        alert('Por favor seleccione al menos un cultivo');
        return;
    }

    try {
        for (const checkbox of selectedCheckboxes) {
            const row = checkbox.closest('tr');
            const id = row.dataset.id;
            
            const response = await fetch(`${API_URL}/crop/${id}/state`, {
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
        await loadCrops(); // Recargar la tabla
    } catch (error) {
        console.error('Error:', error);
        alert('Error al actualizar el estado');
    }
}

async function handleDownload(format) {
    try {
        console.log(`Iniciando descarga en formato: ${format}`);
        const response = await fetch(`${API_URL}/crop/export?format=${format}`);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        const extension = format === 'excel' ? 'xlsx' : 'pdf';
        
        a.href = url;
        a.download = `cultivos.${extension}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    } catch (error) {
        console.error('Error en la descarga:', error);
        alert(`Error al descargar el archivo: ${error.message}`);
    }
}

// Update visualization handler
document.addEventListener('DOMContentLoaded', () => {
    loadCrops();

    // Visualizar handler
    const visualizarButton = document.querySelector('a[href="id-visualise.html"]');
    visualizarButton?.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedCheckboxes = document.querySelectorAll('.main__table-checkbox:checked:not(#selectAll)');
        
        if (selectedCheckboxes.length !== 1) {
            alert('Por favor seleccione un único cultivo para visualizar');
            return;
        }

        const row = selectedCheckboxes[0].closest('tr');
        console.log('Row selected:', row); // Debug
        console.log('Row dataset:', row.dataset); // Debug
        
        const id = row.dataset.id;
        if (id) {
            window.location.href = `id-visualise.html?id=${id}`;
        } else {
            console.error('No ID found in row');
        }
    });

    // Agregar handler para habilitar/deshabilitar
    document.getElementById('deshabilitarHabilitarMenu').addEventListener('click', (e) => {
        if (e.target.matches('a[data-state]')) {
            e.preventDefault();
            const estado = e.target.dataset.state;
            toggleEstado(estado);
        }
    });

    // Agregar handler para descargas
    document.getElementById('descargarMenu')?.addEventListener('click', (e) => {
        if (e.target.matches('a')) {
            e.preventDefault();
            const format = e.target.textContent.toLowerCase();
            handleDownload(format);
        }
    });
});

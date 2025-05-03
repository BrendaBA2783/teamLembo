const API_URL = 'http://localhost:3000';

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

async function loadSensors() {
    try {
        const response = await fetch(`${API_URL}/sensor`);
        const data = await response.json();
        renderTablaSensors(data);
    } catch (error) {
        console.error('Error:', error);
        alert('Error al cargar los sensores');
    }
}

function renderTablaSensors(sensors) {
    const tbody = document.querySelector('.main__tbody');
    tbody.innerHTML = sensors.map(sensor => `
        <tr class="main__table-row" data-id="${sensor.sensor_id}">
            <td class="main__table-cell">
                <input type="checkbox" class="main__table-checkbox">
            </td>
            <td class="main__table-cell">${sensor.sensor_id}</td>
            <td class="main__table-cell">${sensor.sensor_type}</td>
            <td class="main__table-cell">${sensor.sensor_name}</td>
            <td class="main__table-cell">${sensor.sensor_measure}</td>
            <td class="main__table-cell">${sensor.sensor_scan_time || '-'}</td>
            <td class="main__table-cell">${sensor.sensor_status}</td>
        </tr>
    `).join('');

    setupCheckboxes();
}

async function toggleEstado(estado) {
    const selectedCheckboxes = document.querySelectorAll('.main__table-checkbox:checked:not(#selectAll)');
    if (selectedCheckboxes.length === 0) {
        alert('Por favor seleccione al menos un sensor');
        return;
    }

    try {
        for (const checkbox of selectedCheckboxes) {
            const row = checkbox.closest('tr');
            const id = row.dataset.id;
            
            const response = await fetch(`${API_URL}/sensor/${id}/state`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ state: estado })
            });

            if (!response.ok) throw new Error('Error al actualizar estado');
        }
        await loadSensors(); // Recargar la tabla
    } catch (error) {
        console.error('Error:', error);
        alert('Error al actualizar el estado');
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    loadSensors();

    // Handler para habilitar/deshabilitar
    document.getElementById('deshabilitarHabilitarMenu')?.addEventListener('click', (e) => {
        if (e.target.matches('a[data-state]')) {
            e.preventDefault();
            const estado = e.target.dataset.state;
            toggleEstado(estado);
        }
    });
});

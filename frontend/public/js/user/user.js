// Importar funciones de exportación
import { initializeExportButtons, showError } from '../utils/export-utils.js';

const API_URL = 'http://localhost:3001/api';

document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const tbody = document.querySelector('.main__tbody');
    const searchInput = document.querySelector('.search__input');
    const selectAllCheckbox = document.getElementById('selectAll');
    const deshabilitarHabilitarBtn = document.getElementById('deshabilitarHabilitarBtn');
    const deshabilitarHabilitarMenu = document.getElementById('deshabilitarHabilitarMenu');
    const visualizarBtn = document.getElementById('visualizarBtn');

    // Estado para almacenar los usuarios
    let users = [];

    // Función para cargar usuarios desde el backend
    const loadUsers = async () => {
        try {
            const response = await fetch(`${API_URL}/users`);
            if (!response.ok) throw new Error('Error al cargar usuarios');
            
            users = await response.json();
            renderUsers(users);
            initializeExportButtons('users');
        } catch (error) {
            console.error('Error:', error);
            showError('Error al cargar usuarios');
        }
    };

    // Función para renderizar usuarios en la tabla
    const renderUsers = (usersToRender) => {
        tbody.innerHTML = '';
        usersToRender.forEach(user => {
            const row = document.createElement('tr');
            row.className = 'main__table-row';
            row.innerHTML = `
                <td class="main__table-data main__table-data--checkbox">
                    <input type="checkbox" class="main__table-checkbox" data-id="${user._id}">
                </td>
                <td class="main__table-data">${user._id}</td>
                <td class="main__table-data">${user.tipo || ''}</td>
                <td class="main__table-data">${user.nombre || ''}</td>
                <td class="main__table-data">${user.apellido || ''}</td>
                <td class="main__table-data">${user.documento || ''}</td>
                <td class="main__table-data">${user.telefono || ''}</td>
                <td class="main__table-data">${user.email || ''}</td>
                <td class="main__table-data">
                    <span class="status-indicator ${user.estado === 'activo' ? 'active' : 'inactive'}">
                        ${user.estado || 'inactivo'}
                    </span>
                </td>
            `;
            tbody.appendChild(row);
        });
        initializeSelectAll();
    };

    // Función de búsqueda
    const handleSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const filteredUsers = users.filter(user => 
            user.nombre?.toLowerCase().includes(searchTerm) ||
            user.apellido?.toLowerCase().includes(searchTerm) ||
            user.documento?.toLowerCase().includes(searchTerm) ||
            user.email?.toLowerCase().includes(searchTerm)
        );
        renderUsers(filteredUsers);
    };

    // Obtener usuarios seleccionados
    const getSelectedUsers = () => {
        const checkboxes = document.querySelectorAll('.main__table-checkbox:checked');
        return Array.from(checkboxes)
            .filter(checkbox => checkbox.id !== 'selectAll')
            .map(checkbox => checkbox.dataset.id);
    };

    // Manejar habilitar/deshabilitar usuarios
    const handleToggleState = async (newState) => {
        const selectedIds = getSelectedUsers();
        
        if (selectedIds.length === 0) {
            showError('Seleccione al menos un usuario');
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/api/users/toggle-state', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ids: selectedIds })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message);
            }

            showSuccess('Estados actualizados exitosamente');
            loadUsers(); // Recargar la tabla
        } catch (error) {
            showError(error.message);
        }
    };

    // Manejar visualización de usuario
    const handleVisualize = () => {
        const selectedIds = getSelectedUsers();
        
        if (selectedIds.length === 0) {
            showError('Seleccione un usuario para visualizar');
            return;
        }

        if (selectedIds.length > 1) {
            showError('Seleccione solo un usuario para visualizar');
            return;
        }

        window.location.href = `id-visualise.html?id=${selectedIds[0]}`;
    };

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

    // Event listeners
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }

    selectAllCheckbox.addEventListener('change', (e) => {
        const checkboxes = document.querySelectorAll('.main__table-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.checked = e.target.checked;
        });
    });

    deshabilitarHabilitarMenu.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            handleToggleState(e.target.dataset.state);
        }
    });

    visualizarBtn.addEventListener('click', (e) => {
        e.preventDefault();
        handleVisualize();
    });

    // Funciones de utilidad
    function showError(message) {
        const container = document.querySelector('.main');
        const error = document.createElement('P');
        error.textContent = message;
        error.classList.add('error');
        container.appendChild(error);
        setTimeout(() => error.remove(), 4000);
    }

    function showSuccess(message) {
        const container = document.querySelector('.main');
        const success = document.createElement('P');
        success.textContent = message;
        success.classList.add('success');
        container.appendChild(success);
        setTimeout(() => success.remove(), 4000);
    }

    // Cargar usuarios al iniciar
    loadUsers();
}); 
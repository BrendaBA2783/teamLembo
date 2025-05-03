document.addEventListener('DOMContentLoaded', async () => {
    // Obtener el ID del usuario de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');

    if (!userId) {
        showError('ID de usuario no proporcionado');
        return;
    }

    try {
        // Obtener los datos del usuario
        const response = await fetch(`http://localhost:3001/api/users/${userId}`);
        const userData = await response.json();

        if (!response.ok) {
            throw new Error(userData.message || 'Error al obtener los datos del usuario');
        }

        // Mostrar los datos en el formulario
        document.querySelector('.main__form-field--userId').textContent = userData._id;
        document.querySelector('.main__form-field--userType').textContent = userData.tipo;
        document.querySelector('.main__form-field--userDocumentType').textContent = userData.tipo_documento;
        document.querySelector('.main__form-field--userIdentificationNumber').textContent = userData.documento;
        document.querySelector('.main__form-field--userName').textContent = userData.nombre;
        document.querySelector('.main__form-field--userLastName').textContent = userData.apellido;
        document.querySelector('.main__form-field--userCellPhone').textContent = userData.telefono;
        document.querySelector('.main__form-field--userEmail').textContent = userData.email;

        // Mostrar el estado con un indicador visual
        const stateElement = document.querySelector('.main__form-field--userState');
        stateElement.textContent = userData.estado;
        stateElement.classList.add(userData.estado === 'activo' ? 'status-active' : 'status-inactive');

    } catch (error) {
        showError(error.message);
    }
});

function showError(message) {
    const container = document.querySelector('.main__container-form');
    const error = document.createElement('P');
    error.textContent = message;
    error.classList.add('error');
    container.appendChild(error);
    setTimeout(() => error.remove(), 4000);
} 
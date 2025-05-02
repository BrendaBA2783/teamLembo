document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar el botón
    const btnAbrirModalCrop = document.querySelector('.main__form-action--Crop');
    const btnAbrirModalCycle = document.querySelector('.main__form-action--Cycle');
    const btnAbrirModalUser = document.querySelector('.main__form-action--User');
    const btnAbrirModalSensor = document.querySelector('.main__form-action--Sensor');
    const btnAbrirModalSupplies = document.querySelector('.main__form-action--Supplies');
    
    // Seleccionar el modal 
    const modalCrop = document.querySelector('.main__modal-crop');
    const modalCycle = document.querySelector('.main__modal-cycle');
    const modalUser = document.querySelector('.main__modal-user');
    const modalSensor = document.querySelector('.main__modal-sensor');
    const modalSupplies = document.querySelector('.main__modal-supplies');
    
    // Seleccionar el botón de cerrar
    const btnCerrarModalCrop = modalCrop.querySelector('.main__modal-crop--close');
    const btnCerrarModalCycle = modalCycle.querySelector('.main__modal-cycle--close');
    const btnCerrarModalUser = modalUser.querySelector('.main__modal-user--close');
    const btnCerrarModalSensor = modalSensor.querySelector('.main__modal-sensor--close');
    const btnCerrarModalSupplies = modalSupplies.querySelector('.main__modal-supplies--close');
    
    // Función para abrir el modal 
    btnAbrirModalCrop.addEventListener('click', () => {
        modalCrop.style.display = 'block';
    });
    btnAbrirModalCycle.addEventListener('click', () => {
        modalCycle.style.display = 'block';
    });
    btnAbrirModalUser.addEventListener('click', () => {
        modalUser.style.display = 'block';
    });
    btnAbrirModalSensor.addEventListener('click', () => {
        modalSensor.style.display = 'block';
    });
    btnAbrirModalSupplies.addEventListener('click', () => {
        modalSupplies.style.display = 'block';
    });
    
    // Función para cerrar el modal 
    btnCerrarModalCrop.addEventListener('click', () => {
        modalCrop.style.display = 'none';
    });
    btnCerrarModalCycle.addEventListener('click', () => {
        modalCycle.style.display = 'none';
    });
    btnCerrarModalUser.addEventListener('click', () => {
        modalUser.style.display = 'none';
    });
    btnCerrarModalSensor.addEventListener('click', () => {
        modalSensor.style.display = 'none';
    });
    btnCerrarModalSupplies.addEventListener('click', () => {
        modalSupplies.style.display = 'none';
    });

    // Cerrar el modal si se hace clic fuera de él
    window.addEventListener('click', (event) => {
        if (event.target === modalCrop) {
            modalCrop.style.display = 'none';
        }
    });

    window.addEventListener('click', (event) => {
        if (event.target === modalCycle) {
            modalCycle.style.display = 'none';
        }
    });

    window.addEventListener('click', (event) => {
        if (event.target === modalUser) {
            modalUser.style.display = 'none';
        }
    });

    window.addEventListener('click', (event) => {
        if (event.target === modalSensor) {
            modalSensor.style.display = 'none';
        }
    });

    window.addEventListener('click', (event) => {
        if (event.target === modalSupplies) {
            modalSupplies.style.display = 'none';
        }
    });

});

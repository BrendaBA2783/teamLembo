// Seleccionando elementos del formulario
const mainField = document.querySelector('.main__field');
const continueButton = document.querySelector('.main__button');
const mainContainer = document.querySelector('.main__container');

// Objeto para almacenar el ID del ciclo
const cycleData = {
    idCycle: ''
};

// Agregar event listener al input para validar solo letras y números
mainField.addEventListener('input', function(e) {
    // Guardar posición del cursor
    const cursorPos = e.target.selectionStart;
    
    // Almacenar valor actual
    const currentValue = e.target.value;
    
    // Reemplazar cualquier carácter que no sea letra o número
    const newValue = currentValue.replace(/[^a-zA-Z0-9]/g, '');
    
    // Si hubo cambios (se ingresó un carácter especial)
    if (currentValue !== newValue) {
        // Mostrar mensaje de error
        showError('Caracteres especiales no permitidos');
        
        // Actualizar valor sin los caracteres no permitidos
        e.target.value = newValue;
        
        // Ajustar posición del cursor considerando los caracteres eliminados
        e.target.setSelectionRange(cursorPos - (currentValue.length - newValue.length), cursorPos - (currentValue.length - newValue.length));
    }
    
    // Actualizar objeto con el valor actual
    cycleData.idCycle = e.target.value;
    
    // Habilitar o deshabilitar botón basado en el contenido
    toggleButton();
});

// Función para habilitar o deshabilitar el botón
function toggleButton() {
    if (cycleData.idCycle.trim() === '') {
        continueButton.disabled = true;
        continueButton.classList.add('button-disabled');
    } else {
        continueButton.disabled = false;
        continueButton.classList.remove('button-disabled');
    }
}

// Prevenir navegación con el botón continuar si el campo está vacío
continueButton.addEventListener('click', function(e) {
    if (cycleData.idCycle.trim() === '') {
        e.preventDefault();
        e.stopPropagation();
        showError('Es necesario agregar el ID');
    }
});

// Función para mostrar mensajes de error
function showError(message) {
    // Verificar si ya existe un mensaje de error
    const existingError = document.querySelector('.error');
    if (existingError) {
        existingError.remove();
    }
    
    // Crear el elemento de error
    const error = document.createElement('P');
    error.textContent = message;
    error.classList.add('error');
    
    // Agregar el mensaje al contenedor
    mainContainer.appendChild(error);
    
    // Eliminar después de 4 segundos
    setTimeout(() => {
        error.remove();
    }, 4000);
}

// Inicializar estado del botón cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Asegurar que el botón tenga el atributo type="button"
    continueButton.setAttribute('type', 'button');
    
    // Establecer estado inicial del botón
    toggleButton();
    
    // Mostrar mensaje si intenta dejar el campo sin llenar
    mainField.addEventListener('blur', function() {
        if (this.value.trim() === '') {
            showError('Es necesario agregar el ID');
        }
    });
});
// Seleccionando los elementos del formulario
const mainField = document.querySelector('.main__field');
const continueButton = document.querySelector('.main__button');
const mainContainer = document.querySelector('.main__container');

// Objeto para almacenar el ID del ciclo
const cicloData = {
    idCiclo: ''
};

// Agregando event listener al input para validar solo números
mainField.addEventListener('input', function(e) {
    // Guarda la posición del cursor
    const cursorPos = e.target.selectionStart;
    
    // Almacena el valor actual
    const currentValue = e.target.value;
    
    // Reemplaza cualquier carácter que no sea número
    const newValue = currentValue.replace(/[^0-9]/g, '');
    
    // Si hubo cambios (se intentó ingresar un carácter no numérico)
    if (currentValue !== newValue) {
        // Muestra mensaje de error
        showError('Letras y caracteres especiales no permitidos');
        
        // Actualiza el valor sin los caracteres no permitidos
        e.target.value = newValue;
        
        // Ajusta la posición del cursor considerando caracteres eliminados
        e.target.setSelectionRange(cursorPos - (currentValue.length - newValue.length), cursorPos - (currentValue.length - newValue.length));
    }
    
    // Actualiza el objeto con el valor actual
    cicloData.idCiclo = e.target.value;
    
    // Habilita o deshabilita el botón según si hay contenido
    toggleButton();
});

// Función para habilitar o deshabilitar el botón
function toggleButton() {
    if (cicloData.idCiclo.trim() === '') {
        continueButton.disabled = true;
        continueButton.classList.add('button-disabled');
    } else {
        continueButton.disabled = false;
        continueButton.classList.remove('button-disabled');
    }
}

// Prevenir la navegación con el botón continuar si el campo está vacío
continueButton.addEventListener('click', function(e) {
    if (cicloData.idCiclo.trim() === '') {
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

// Inicializar el estado del botón al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Asegurar que el botón tenga el atributo type="button"
    continueButton.setAttribute('type', 'button');
    
    // Configurar estado inicial del botón
    toggleButton();
    
    // Mostrar mensaje si se intenta salir del campo sin llenarlo
    mainField.addEventListener('blur', function() {
        if (this.value.trim() === '') {
            showError('Es necesario agregar el ID');
        }
    });
});
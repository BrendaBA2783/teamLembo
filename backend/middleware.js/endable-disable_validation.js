// Seleccionando los elementos del formulario
const formInput = document.querySelector('.form__input');
const enableButton = document.querySelector('.enable');
const disableButton = document.querySelector('.disable');
const formContainer = document.querySelector('.form__container');

// Objeto para almacenar el ID del ciclo
const cicloData = {
    idCiclo: ''
};

// Agregando event listener al input para validar solo números
formInput.addEventListener('input', function(e) {
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
    
    // Habilita o deshabilita los botones según si hay contenido
    toggleButtons();
});

// Función para habilitar o deshabilitar botones
function toggleButtons() {
    if (cicloData.idCiclo.trim() === '') {
        enableButton.disabled = true;
        disableButton.disabled = true;
        enableButton.classList.add('button-disabled');
        disableButton.classList.add('button-disabled');
    } else {
        enableButton.disabled = false;
        disableButton.disabled = false;
        enableButton.classList.remove('button-disabled');
        disableButton.classList.remove('button-disabled');
    }
}

// Prevenir el envío del formulario con el botón habilitar si el campo está vacío
enableButton.addEventListener('click', function(e) {
    if (cicloData.idCiclo.trim() === '') {
        e.preventDefault();
        showError('Es necesario agregar el ID');
    }
});

// Prevenir el envío del formulario con el botón deshabilitar si el campo está vacío
disableButton.addEventListener('click', function(e) {
    if (cicloData.idCiclo.trim() === '') {
        e.preventDefault();
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
    formContainer.appendChild(error);
    
    // Eliminar después de 4 segundos
    setTimeout(() => {
        error.remove();
    }, 4000);
}

// Inicializar el estado de los botones al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Corregir el atributo de type faltante en el botón habilitar
    enableButton.setAttribute('type', 'button');
    
    // Configurar estado inicial de los botones
    toggleButtons();
    
    // Mostrar mensaje si se intenta usar los botones sin llenar el campo
    formInput.addEventListener('blur', function() {
        if (this.value.trim() === '') {
            showError('Es necesario agregar el ID');
        }
    });
});
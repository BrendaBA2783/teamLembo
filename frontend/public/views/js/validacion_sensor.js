document.addEventListener('DOMContentLoaded', function () {
    // Obtener todos los campos del formulario
    const idSensor = document.querySelector('.id-sensor');
    const unidadMedida = document.querySelector('.unidad-medida');
    const tipoSensor = document.querySelector('.tipo-sensor');
    const tiempoEscaneo = document.querySelector('.tiempo-escaneo');
    const nombre = document.querySelector('.nombre');
    const estado = document.querySelector('.estado');
    const imagenSensor = document.querySelector('.imagen-sensor');
    const descripcion = document.querySelector('.descripcion');


    // Obtener el enlace que contiene el botón
    const enlaceRegistrar = document.querySelector('.main__form-end a');

    // Patrón para validar que no haya caracteres especiales
    const patronSinEspeciales = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s.,]+$/;

    // Patrón para validar que solo haya números
    const patronSoloNumeros = /^[0-9]+$/;

    // Función para convertir el campo de imagen en un campo de archivo funcional
    function convertirCampoImagen() {
        // Crear un contenedor para el campo de imagen
        const contenedorImagen = document.createElement('div');
        contenedorImagen.className = 'imagen-sensor-container';
        
        // Obtener el padre del campo de imagen actual
        const padreImagenActual = imagenSensor.parentElement;
        
        // Crear un nuevo campo de archivo
        const inputFile = document.createElement('input');
        inputFile.type = 'file';
        inputFile.className = 'main__form-field imagen-sensor-file';
        inputFile.accept = 'image/*'; // Solo permitir archivos de imagen
        
        // Crear una vista previa de la imagen
        const previewImage = document.createElement('img');
        previewImage.className = 'imagen-sensor-preview';
        
        // Actualizar la referencia global
        imagenSensor = inputFile;
        
        // Agregar evento para mostrar vista previa cuando se selecciona una imagen
        inputFile.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    previewImage.src = e.target.result;
                    previewImage.style.display = 'block';
                    
                    // Eliminar mensaje de error si existe
                    const mensajeError = contenedorImagen.querySelector('.mensaje-error');
                    if (mensajeError) {
                        mensajeError.remove();
                    }
                    inputFile.classList.remove('error');
                };
                reader.readAsDataURL(file);
            } else {
                previewImage.style.display = 'none';
                previewImage.src = '';
            }
        });
    }
    
    // Función para validar todos los campos
    function validarFormulario() {
        let esValido = true;
        
        // Resetear estilos
        resetearEstilos();
        
        // Validar campos que solo aceptan números (ID Sensor, Unidad Medida, Tiempo escaneo)
        const camposNumericos = [
            { campo: idSensor, nombre: 'ID del sensor' },
            { campo: unidadMedida, nombre: 'Unidad de medida' },
            { campo: tiempoEscaneo, nombre: 'Tiempo escaneo' }
        ];
        
        camposNumericos.forEach(item => {
            if (!item.campo.value.trim()) {
                marcarError(item.campo, 'Este campo es obligatorio');
                esValido = false;
            } else if (!patronSoloNumeros.test(item.campo.value)) {
                marcarError(item.campo, 'Solo se permiten números');
                esValido = false;
            }
        });
        
        // Validar campos con patrón normal (tipoSensor, nombre, estado, descripcion)
        const camposNormales = [
            { campo: tipoSensor, nombre: 'Tipo de sensor' },
            { campo: nombre, nombre: 'Nombre' },
            { campo: estado, nombre: 'Estado' },
            { campo: descripcion, nombre: 'Descripción' }
        ];
        
        camposNormales.forEach(item => {
            if (!item.campo.value.trim()) {
                marcarError(item.campo, 'Este campo es obligatorio');
                esValido = false;
            } else if (!patronSinEspeciales.test(item.campo.value)) {
                marcarError(item.campo, 'No se permiten caracteres especiales');
                esValido = false;
            }
        });
        
        // Validar que se haya cargado una imagen
        if (!imagenSensor.files || !imagenSensor.files[0]) {
            marcarError(imagenSensor, 'Debe cargar una imagen');
            esValido = false;
        }
        
        return esValido;
    }

    // Función para marcar un campo como error
    function marcarError(campo, mensaje) {
        campo.classList.add('error');

        // Crear mensaje de error si no existe
        let mensajeError = campo.parentElement.querySelector('.mensaje-error');
        if (!mensajeError) {
            mensajeError = document.createElement('span');
            mensajeError.className = 'mensaje-error';
            campo.parentElement.appendChild(mensajeError);
        }
        mensajeError.textContent = mensaje;
    }

    // Función para resetear los estilos de error
    function resetearEstilos() {
        const camposTodos = document.querySelectorAll('.main__form-field');
        camposTodos.forEach(campo => {
            campo.classList.remove('error');
            const mensajeError = campo.parentElement.querySelector('.mensaje-error');
            if (mensajeError) {
                mensajeError.remove();
            }
        });
    }

    // Agregar validación en tiempo real para los campos numéricos
    const camposValidacionNumerica = [idSensor, unidadMedida, tiempoEscaneo];

    camposValidacionNumerica.forEach(campo => {
        campo.addEventListener('input', function () {
            if (this.value && !patronSoloNumeros.test(this.value)) {
                marcarError(this, 'Solo se permiten números');
            } else {
                this.classList.remove('error');
                const mensajeError = this.parentElement.querySelector('.mensaje-error');
                if (mensajeError) {
                    mensajeError.remove();
                }
            }
        });
    });

    // Agregar validación en tiempo real para los demás campos (sin caracteres especiales)
    const camposRestantes = [tipoSensor, nombre, estado, descripcion];
    camposRestantes.forEach(campo => {
        campo.addEventListener('input', function () {
            if (this.value && !patronSinEspeciales.test(this.value)) {
                marcarError(this, 'No se permiten caracteres especiales');
            } else {
                this.classList.remove('error');
                const mensajeError = this.parentElement.querySelector('.mensaje-error');
                if (mensajeError) {
                    mensajeError.remove();
                }
            }
        });
    });

    // Evitar que el formulario se envíe si no es válido
    enlaceRegistrar.addEventListener('click', function (event) {
        if (!validarFormulario()) {
            event.preventDefault();
            alert('Por favor complete todos los campos correctamente antes de registrar.');
        }
    });
});
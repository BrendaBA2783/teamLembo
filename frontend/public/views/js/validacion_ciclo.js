document.addEventListener('DOMContentLoaded', function() {
    // Obtener todos los campos del formulario
    const idCiclo = document.querySelector('.id-ciclo');
    const ubicacion = document.querySelector('.ubicacion');
    const nombreCiclo = document.querySelector('.nombre-ciclo');
    const estado = document.querySelector('.estado');
    const novedades = document.querySelector('.novedades');
    const fechaInicio = document.querySelector('.fecha-inicio');
    const fechaFin = document.querySelector('.fecha-fin');
    const descripcion = document.querySelector('.descripcion');
    
    // Obtener el botón de registro
    const btnRegistrar = document.querySelector('.boton-registrar');
    
    // Obtener el enlace que contiene el botón
    const enlaceRegistrar = document.querySelector('.main__form-end a');
    
    // Patrón para validar que no haya caracteres especiales
    const patronSinEspeciales = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s.,]+$/;
    
    // Patrón para validar que solo haya números
    const patronSoloNumeros = /^[0-9]+$/;
    
    // Patrón para validar fechas (No letras)
    const patronFecha = /^[^a-zA-Z]+$/;
    
    // Patrón para validar campos sin números (solo letras y caracteres básicos)
    const patronSinNumeros = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s.,]+$/;
    
    // Función para validar todos los campos
    function validarFormulario() {
        let esValido = true;
        
        // Resetear estilos
        resetearEstilos();
        
        // Validar que todos los campos estén completos
        if (!idCiclo.value.trim()) {
            marcarError(idCiclo, 'Este campo es obligatorio');
            esValido = false;
        } else if (!patronSoloNumeros.test(idCiclo.value)) {
            marcarError(idCiclo, 'Solo se permiten números');
            esValido = false;
        }
        
        // Validar campos sin números (nombreCiclo y novedades)
        if (!nombreCiclo.value.trim()) {
            marcarError(nombreCiclo, 'Este campo es obligatorio');
            esValido = false;
        } else if (!patronSinNumeros.test(nombreCiclo.value)) {
            marcarError(nombreCiclo, 'No se permiten números');
            esValido = false;
        }
        
        if (!novedades.value.trim()) {
            marcarError(novedades, 'Este campo es obligatorio');
            esValido = false;
        } else if (!patronSinNumeros.test(novedades.value)) {
            marcarError(novedades, 'No se permiten números');
            esValido = false;
        }
        
        // Validar campos con patrón normal (ubicacion, estado, descripcion)
        const camposNormales = [
            { campo: ubicacion, mensaje: 'No se permiten caracteres especiales' },
            { campo: estado, mensaje: 'No se permiten caracteres especiales' },
            { campo: descripcion, mensaje: 'No se permiten caracteres especiales' }
        ];
        
        camposNormales.forEach(item => {
            if (!item.campo.value.trim()) {
                marcarError(item.campo, 'Este campo es obligatorio');
                esValido = false;
            } else if (!patronSinEspeciales.test(item.campo.value)) {
                marcarError(item.campo, item.mensaje);
                esValido = false;
            }
        });
        
        // Validar campos de fecha (no letras)
        if (!fechaInicio.value.trim()) {
            marcarError(fechaInicio, 'Este campo es obligatorio');
            esValido = false;
        } else if (!patronFecha.test(fechaInicio.value)) {
            marcarError(fechaInicio, 'No se permiten letras');
            esValido = false;
        }
        
        if (!fechaFin.value.trim()) {
            marcarError(fechaFin, 'Este campo es obligatorio');
            esValido = false;
        } else if (!patronFecha.test(fechaFin.value)) {
            marcarError(fechaFin, 'No se permiten letras');
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
    
    // Agregar validación en tiempo real para el campo ID (solo números)
    idCiclo.addEventListener('input', function() {
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
    
    // Validación en tiempo real para campos sin números (pero mostrar el número y avisar)
    nombreCiclo.addEventListener('input', function() {
        if (this.value && /[0-9]/.test(this.value)) {
            marcarError(this, 'No se permiten números');
        } else if (this.value && !patronSinNumeros.test(this.value)) {
            marcarError(this, 'No se permiten caracteres especiales no permitidos');
        } else {
            this.classList.remove('error');
            const mensajeError = this.parentElement.querySelector('.mensaje-error');
            if (mensajeError) {
                mensajeError.remove();
            }
        }
    });
    
    novedades.addEventListener('input', function() {
        if (this.value && /[0-9]/.test(this.value)) {
            marcarError(this, 'No se permiten números');
        } else if (this.value && !patronSinNumeros.test(this.value)) {
            marcarError(this, 'No se permiten caracteres especiales no permitidos');
        } else {
            this.classList.remove('error');
            const mensajeError = this.parentElement.querySelector('.mensaje-error');
            if (mensajeError) {
                mensajeError.remove();
            }
        }
    });
    
    // Prevenir entrada de letras en campos de fecha
    fechaInicio.addEventListener('input', function() {
        // Reemplazar cualquier letra
        this.value = this.value.replace(/[a-zA-Z]/g, '');
        
        // Validar después de la modificación
        if (this.value && !patronFecha.test(this.value)) {
            marcarError(this, 'No se permiten letras');
        } else {
            this.classList.remove('error');
            const mensajeError = this.parentElement.querySelector('.mensaje-error');
            if (mensajeError) {
                mensajeError.remove();
            }
        }
    });
    
    fechaFin.addEventListener('input', function() {
        // Reemplazar cualquier letra
        this.value = this.value.replace(/[a-zA-Z]/g, '');
        
        // Validar después de la modificación
        if (this.value && !patronFecha.test(this.value)) {
            marcarError(this, 'No se permiten letras');
        } else {
            this.classList.remove('error');
            const mensajeError = this.parentElement.querySelector('.mensaje-error');
            if (mensajeError) {
                mensajeError.remove();
            }
        }
    });
    
    // Agregar validación en tiempo real para los demás campos (sin caracteres especiales)
    const camposRestantes = [ubicacion, estado, descripcion];
    camposRestantes.forEach(campo => {
        campo.addEventListener('input', function() {
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
    enlaceRegistrar.addEventListener('click', function(event) {
        if (!validarFormulario()) {
            event.preventDefault();
            alert('Por favor complete todos los campos correctamente antes de registrar.');
        }
    });
});
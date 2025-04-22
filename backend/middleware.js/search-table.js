document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar el input de búsqueda
    const searchInput = document.querySelector('.search__input');
    
    searchInput.addEventListener('input', function() {
        // Obtener el valor del input y convertirlo a minúsculas para una comparación sin distinción de mayúsculas/minúsculas
        const searchTerm = this.value.toLowerCase();
        
        // Seleccionar todas las filas de la tabla excepto el encabezado
        const tableRows = document.querySelectorAll('.main__table-row:not(.main__thead .main__table-row)');
        
        // Recorre todas las filas
        tableRows.forEach(row => {
            // Obtener el texto completo de la fila
            const rowText = row.textContent.toLowerCase();
            
            // Obtener celdas individuales para búsquedas específicas
            const cells = Array.from(row.querySelectorAll('.main__table-cell'));
            
            // Comprobar si el término de búsqueda existe en alguna celda de la fila
            const matchFound = rowText.includes(searchTerm);
            
            // Mostrar u ocultar la fila según si hay coincidencia
            if (matchFound) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
});
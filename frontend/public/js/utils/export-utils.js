const API_URL = 'http://localhost:3001/api';

// Función para descargar archivos
export function downloadFile(blob, filename) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

// Función para obtener los datos de la tabla
function getTableData() {
    const table = document.querySelector('.main__table');
    const headers = Array.from(table.querySelectorAll('thead th'))
        .map(th => th.textContent.trim())
        .filter(header => header !== ''); // Excluir el checkbox

    const rows = Array.from(table.querySelectorAll('tbody tr')).map(tr => {
        return Array.from(tr.querySelectorAll('td'))
            .map(td => td.textContent.trim())
            .filter((_, index) => index > 0); // Excluir el checkbox
    });

    return { headers, rows };
}

// Función para exportar a PDF
export async function exportToPDF(endpoint, data) {
    try {
        // Cargar jsPDF dinámicamente
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        document.head.appendChild(script);

        await new Promise((resolve) => {
            script.onload = resolve;
        });

        // Crear una nueva instancia de jsPDF
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Obtener los datos de la tabla
        const tableData = getTableData();
        
        // Configurar el documento
        doc.setFontSize(16);
        doc.text(`${endpoint.toUpperCase()} - Reporte`, 14, 15);
        
        // Configurar la tabla
        const headers = tableData.headers;
        const rows = tableData.rows;
        
        // Configurar el estilo de la tabla
        doc.setFontSize(10);
        
        // Calcular el ancho de las columnas
        const pageWidth = doc.internal.pageSize.width;
        const margin = 14;
        const availableWidth = pageWidth - (margin * 2);
        const columnWidth = availableWidth / headers.length;
        
        // Dibujar encabezados
        let x = margin;
        headers.forEach((header, index) => {
            doc.text(header, x, 25);
            x += columnWidth;
        });
        
        // Dibujar filas
        let y = 35;
        rows.forEach(row => {
            x = margin;
            row.forEach((cell, index) => {
                doc.text(cell.toString(), x, y);
                x += columnWidth;
            });
            y += 10;
        });
        
        // Guardar el documento
        doc.save(`${endpoint}-report.pdf`);
    } catch (error) {
        console.error('Error exportando PDF:', error);
        showError('Error al exportar a PDF: ' + error.message);
    }
}

// Función para exportar a Excel
export async function exportToExcel(data, endpoint) {
    try {
        // Obtener los datos de la tabla
        const tableData = getTableData();
        const selectedData = tableData.rows.filter((_, index) => data.includes(index.toString()));
        
        if (selectedData.length === 0) {
            showError('No hay datos seleccionados para exportar');
            return;
        }

        // Crear el Excel en el cliente
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(selectedData);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte");
        
        // Descargar el Excel
        XLSX.writeFile(workbook, `${endpoint}-report.xlsx`);
    } catch (error) {
        console.error('Error exportando Excel:', error);
        showError('Error al exportar el reporte en Excel');
    }
}

// Función para mostrar mensajes de error
export function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);
    setTimeout(() => errorDiv.remove(), 3000);
}

// Función para obtener los datos seleccionados de la tabla
export function getSelectedData() {
    const checkboxes = document.querySelectorAll('.main__table-checkbox:checked:not(#selectAll)');
    const selectedIds = Array.from(checkboxes).map(checkbox => checkbox.dataset.id);
    return selectedIds;
}

// Función para inicializar los botones de exportación
export function initializeExportButtons(endpoint) {
    const descargarBtn = document.getElementById('descargarBtn');
    const descargarMenu = document.getElementById('descargarMenu');
    
    if (descargarBtn && descargarMenu) {
        const links = descargarMenu.querySelectorAll('a');
        
        links[0].addEventListener('click', async () => {
            const selectedIds = getSelectedData();
            if (selectedIds.length === 0) {
                showError('Por favor seleccione al menos un elemento para exportar');
                return;
            }
            await exportToPDF(endpoint, selectedIds);
        });

        links[1].addEventListener('click', async () => {
            const selectedIds = getSelectedData();
            if (selectedIds.length === 0) {
                showError('Por favor seleccione al menos un elemento para exportar');
                return;
            }
            await exportToExcel(selectedIds, endpoint);
        });
    }
}

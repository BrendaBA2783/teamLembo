function downloadFile(data, filename) {
    const blob = new Blob([data], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

async function exportToPDF(data) {
    try {
        const response = await fetch('http://localhost:3000/associations/export?format=pdf', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const blob = await response.blob();
        downloadFile(blob, 'asociaciones.pdf');
    } catch (error) {
        console.error('Error exportando PDF:', error);
    }
}

async function exportToExcel(data) {
    try {
        const response = await fetch('http://localhost:3000/associations/export?format=excel', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const blob = await response.blob();
        downloadFile(blob, 'asociaciones.xlsx');
    } catch (error) {
        console.error('Error exportando Excel:', error);
    }
}

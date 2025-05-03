const API_URL = 'http://localhost:3000';

async function loadAssociationDetails() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        
        if (!id) {
            showError('ID no proporcionado');
            return;
        }

        const response = await fetch(`${API_URL}/associations/${id}`);
        if (!response.ok) throw new Error('Error al cargar los detalles');

        const data = await response.json();
        renderDetails(data);
        createCharts(); // Agregar esta línea
    } catch (error) {
        showError(error.message);
    }
}

function renderDetails(data) {
    const detailsContainer = document.getElementById('associationDetails');
    const statusClass = data.association_state === 'activo' ? 'status-active' : 'status-inactive';

    detailsContainer.innerHTML = `
        <div class="detail-group">
            <h3>Cultivo</h3>
            <p><strong>Nombre:</strong> ${data.crop_name}</p>
            <p><strong>Tipo:</strong> ${data.crop_type}</p>
            <p><strong>Estado:</strong> ${data.crop_state}</p>
        </div>
        <div class="detail-group">
            <h3>Sensor</h3>
            <p><strong>Nombre:</strong> ${data.sensor_name}</p>
            <p><strong>Tipo:</strong> ${data.sensor_type}</p>
            <p><strong>Estado:</strong> ${data.sensor_status}</p>
        </div>
        <div class="detail-group">
            <h3>Insumo</h3>
            <p><strong>Nombre:</strong> ${data.supplies_name}</p>
            <p><strong>Estado:</strong> ${data.supplies_state}</p>
        </div>
        <div class="detail-group">
            <h3>Ciclo</h3>
            <p><strong>Nombre:</strong> ${data.cycle_name}</p>
            <p><strong>Estado:</strong> ${data.cycle_status}</p>
        </div>
        <div class="detail-group">
            <h3>Usuario Responsable</h3>
            <p><strong>Nombre:</strong> ${data.user_full_name}</p>
            <p><strong>Tipo:</strong> ${data.user_type}</p>
        </div>
        <div class="detail-group">
            <h3>Estado de Asociación</h3>
            <p class="${statusClass}"><strong>Estado:</strong> ${data.association_state}</p>
        </div>
    `;
}

function showError(message) {
    document.getElementById('associationDetails').innerHTML = `
        <div class="error-message">
            <p>Error: ${message}</p>
            <p>Por favor, intente nuevamente</p>
        </div>
    `;
}

function generateMockInvestmentData() {
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
    return {
        labels: months,
        datasets: [{
            label: 'Inversión (Miles $)',
            data: months.map(() => Math.floor(Math.random() * 1000 + 500)),
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };
}

function generateMockSensorData() {
    const hours = Array.from({length: 24}, (_, i) => `${i}:00`);
    return {
        labels: hours,
        datasets: [{
            label: 'Temperatura (°C)',
            data: hours.map(() => Math.random() * 10 + 20),
            borderColor: 'rgb(255, 99, 132)',
            yAxisID: 'y'
        }, {
            label: 'Humedad (%)',
            data: hours.map(() => Math.random() * 20 + 60),
            borderColor: 'rgb(54, 162, 235)',
            yAxisID: 'y1'
        }]
    };
}

function createCharts() {
    // Gráfica de inversión
    new Chart(document.getElementById('investmentChart'), {
        type: 'line',
        data: generateMockInvestmentData(),
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Inversión Mensual'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Miles de Pesos'
                    }
                }
            }
        }
    });

    // Gráfica de sensores
    new Chart(document.getElementById('sensorChart'), {
        type: 'line',
        data: generateMockSensorData(),
        options: {
            responsive: true,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Lecturas últimas 24 horas'
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Temperatura (°C)'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Humedad (%)'
                    },
                    grid: {
                        drawOnChartArea: false
                    }
                }
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', loadAssociationDetails);

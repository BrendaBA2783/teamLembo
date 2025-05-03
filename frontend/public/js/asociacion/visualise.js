const API_URL = 'http://localhost:3001/api';

document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    loadAssociationDetails();
    // Iniciar actualización de datos en tiempo real
    setInterval(updateSensorData, 5000);
});

async function loadAssociationDetails() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id') || '1'; // ID por defecto si no se proporciona
        
        const response = await fetch(`${API_URL}/associations/${id}`);
        if (!response.ok) throw new Error('Error al cargar los detalles de la asociación');

        const data = await response.json();
        updateAssociationInfo(data);
    } catch (error) {
        showError(error.message);
    }
}

function showError(message) {
    // Mostrar el error en la parte superior de la página
    const mainContainer = document.querySelector('.main__container');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = 'background-color: #fee; color: #c00; padding: 1rem; border-radius: 8px; margin-bottom: 1rem; text-align: center;';
    errorDiv.innerHTML = `<p>Error: ${message}</p>`;
    mainContainer.insertBefore(errorDiv, mainContainer.firstChild);
}

function updateAssociationInfo(data) {
    // Actualizar información del cultivo
    document.getElementById('cropName').textContent = data.crop_name || 'No disponible';
    document.getElementById('cropLocation').textContent = data.production_location || 'No disponible';

    // Actualizar información del ciclo
    document.getElementById('cycleName').textContent = data.cycle_name || 'No disponible';
    document.getElementById('cycleStatus').textContent = data.cycle_status || 'No disponible';

    // Actualizar información del usuario
    document.getElementById('userName').textContent = data.user_full_name || 'No disponible';
    document.getElementById('userRole').textContent = data.user_type || 'No disponible';
}

function initializeCharts() {
    const commonOptions = {
        chart: {
            type: 'area',
            height: 300,
            toolbar: {
                show: false
            },
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 150
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 350
                }
            },
            zoom: {
                enabled: true,
                type: 'x',
                autoScaleYaxis: true
            }
        },
        stroke: {
            curve: 'smooth',
            width: 3
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.3,
                stops: [0, 90, 100]
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: Array.from({length: 24}, (_, i) => `${i}:00`),
            labels: {
                show: true,
                rotate: 0,
                style: {
                    fontSize: '12px'
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    fontSize: '12px'
                }
            },
            tickAmount: 5
        },
        grid: {
            borderColor: '#f1f1f1',
            padding: {
                top: 10,
                right: 10,
                bottom: 10,
                left: 10
            }
        },
        tooltip: {
            enabled: true,
            theme: 'light',
            style: {
                fontSize: '12px'
            },
            y: {
                formatter: function(value) {
                    return value.toFixed(1);
                }
            }
        }
    };

    // Configurar cada gráfica
    setupChart('temperatureChart', 'Temperatura', generateRandomData(20, 26, 24), '#ff6384', '°C');
    setupChart('humidityChart', 'Humedad', generateRandomData(55, 70, 24), '#36a2eb', '%');
    setupChart('phChart', 'pH', generateRandomData(6.0, 7.0, 24), '#4bc0c0', '');
    setupChart('lightChart', 'Luminosidad', generateRandomData(700, 900, 24), '#ffcd56', 'lux');

    // Configurar el botón de exportar
    document.querySelector('.button-end__export').addEventListener('click', function() {
        alert('Función de exportación en desarrollo');
    });
}

function setupChart(elementId, title, data, color, unit) {
    const element = document.getElementById(elementId);
    if (!element) return;

    const options = {
        series: [{
            name: title,
            data: data
        }],
        chart: {
            type: 'area',
            height: 300,
            toolbar: {
                show: false
            },
            zoom: {
                enabled: true,
                type: 'x',
                autoScaleYaxis: true
            }
        },
        colors: [color],
        title: {
            text: title + (unit ? ` (${unit})` : ''),
            align: 'left',
            style: {
                fontSize: '16px',
                color: '#2c3e50',
                fontWeight: 600
            }
        },
        xaxis: {
            categories: Array.from({length: 24}, (_, i) => `${i}:00`)
        },
        stroke: {
            curve: 'smooth',
            width: 3
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.3,
                stops: [0, 90, 100]
            }
        },
        markers: {
            size: 4,
            colors: [color],
            strokeWidth: 0,
            hover: {
                size: 6
            }
        }
    };

    const chart = new ApexCharts(element, options);
    chart.render();
    return chart;
}

function generateRandomData(min, max, count) {
    return Array.from({length: count}, () => 
        Math.round((Math.random() * (max - min) + min) * 10) / 10
    );
}

function updateSensorData() {
    const sensors = {
        temperature: {
            current: Math.round((Math.random() * (26 - 20) + 20) * 10) / 10,
            average: 22
        },
        humidity: {
            current: Math.round((Math.random() * (70 - 55) + 55) * 10) / 10,
            average: 60
        },
        ph: {
            current: Math.round((Math.random() * (7.0 - 6.0) + 6.0) * 10) / 10,
            average: 6.8
        },
        light: {
            current: Math.round(Math.random() * (900 - 700) + 700),
            average: 820
        }
    };

    // Actualizar valores en las tarjetas de manera segura
    updateSensorValue(1, `${sensors.temperature.current}°C`);
    updateSensorValue(2, `${sensors.humidity.current}%`);
    updateSensorValue(3, sensors.ph.current.toString());
    updateSensorValue(4, `${sensors.light.current} lux`);
}

function updateSensorValue(cardIndex, value) {
    const valueElement = document.querySelector(`.sensor-card:nth-child(${cardIndex}) .stat__value`);
    if (valueElement) {
        valueElement.textContent = value;
    }
}

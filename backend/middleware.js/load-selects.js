// Selecciona el elemento select del cultivo
const selectCrop = document.querySelector(".main__form-field--select-cultivo");
const selectUsers = document.querySelector(".main__form-field--select-usuario");
const selectSensor = document.querySelector(".main__form-field--select-sensor");
const selectCycle = document.querySelector(".main__form-field--select-cycle");
const selectSupplies = document.querySelector(".main__form-field--select-insumo");

// Función para cargar los insumos
const loadInsumos = async () => {
    try {
        const response = await fetch('http://localhost:3000/supplies');
        if (response.ok) {
            const data = await response.json();
            selectSupplies.innerHTML = '<option value="">Seleccionar insumo</option>';
            data.forEach(supplies => {
                const option = document.createElement('option');
                option.value = supplies.supplies_id;
                option.textContent = supplies.supplies_name;
                selectSupplies.appendChild(option);
            });
        } else {
            console.error('Error al obtener los insumos:', response.status);
        }
    } catch (error) {
        console.error('Error al hacer la solicitud:', error);
    }
};
loadInsumos();

// Función para cargar los sensores
const loadSensor = async () => {
    try {
        const response = await fetch('http://localhost:3000/sensor');
        if (response.ok) {
            const data = await response.json();
            selectSensor.innerHTML = '<option value="">Seleccionar sensor</option>';
            data.forEach(sensor => {
                const option = document.createElement('option');
                option.value = sensor.sensor_id;
                option.textContent = sensor.sensor_name;
                selectSensor.appendChild(option);
            });
        } else {
            console.error('Error al obtener los sensor:', response.status);
        }
    } catch (error) {
        console.error('Error al hacer la solicitud:', error);
    }
};
loadSensor();

// Función para cargar los ciclos
const loadCiclos = async () => {
    try {
        const response = await fetch('http://localhost:3000/cycle');
        if (response.ok) {
            const data = await response.json();
            selectCycle.innerHTML = '<option value="">Seleccionar ciclo</option>';
            data.forEach(cycle => {
                const option = document.createElement('option');
                option.value = cycle.cycle_id;
                option.textContent = cycle.cycle_name;
                selectCycle.appendChild(option);
            });
        } else {
            console.error('Error al obtener los ciclos:', response.status);
        }
    } catch (error) {
        console.error('Error al hacer la solicitud:', error);
    }
};
loadCiclos();

// Función para cargar los usuarios
const loadUsuarios = async () => {
    try {
        const response = await fetch('http://localhost:3000/users');
        if (response.ok) {
            const data = await response.json();
            selectUsers.innerHTML = '<option value="">Seleccionar usuario</option>';
            data.forEach(users => {
                const option = document.createElement('option');
                option.value = users.user_id;
                option.textContent = users.user_name;
                selectUsers.appendChild(option);
            });
        } else {
            console.error('Error al obtener los usuarios:', response.status);
        }
    } catch (error) {
        console.error('Error al hacer la solicitud:', error);
    }
};
loadUsuarios();

// Función para cargar los cultivos
const loadCultivos = async () => {
    try {
        const response = await fetch('http://localhost:3000/crop');
        if (response.ok) {
            const data = await response.json();
            selectCrop.innerHTML = '<option value="">Selecciona un cultivo</option>';
            data.forEach(crop => {
                const option = document.createElement('option');
                option.value = crop.crop_id;
                option.textContent = crop.crop_name;
                selectCrop.appendChild(option);
            });
        } else {
            console.error('Error al obtener los cultivos:', response.status);
        }
    } catch (error) {
        console.error('Error al hacer la solicitud:', error);
    }
};
loadCultivos();
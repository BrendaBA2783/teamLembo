// header
document.addEventListener("DOMContentLoaded", function() {
    fetch("/frontend/public/views/components/general_header.html")
    .then(response => response.text())
    .then(data => {
        document.querySelector(".hero--general").innerHTML = data; 
        // Asignar el evento de clic al botón después de cargar el contenido
        /* document.getElementById('dark-mode-toggle').addEventListener('click', toggleDarkMode); */
    })
    .catch(error => console.error("Error cargando el hero:", error));
});

// Función para alternar el modo oscuro
/* const toggleDarkMode = () => {
    document.body.classList.toggle('dark-mode');
}; */
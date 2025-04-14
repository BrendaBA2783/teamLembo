document.addEventListener('DOMContentLoaded', function() {
    const visualizarBtn = document.getElementById('visualizarBtn');
    const visualizarMenu = document.getElementById('visualizarMenu');
    
    // Función para mostrar/ocultar el menú desplegable
    visualizarBtn.addEventListener('click', function(e) {
        e.preventDefault();
        visualizarMenu.classList.toggle('show');
    });
    
    // Cerrar el menú desplegable si se hace clic fuera de él
    window.addEventListener('click', function(e) {
        if (!visualizarBtn.contains(e.target)) {
            visualizarMenu.classList.remove('show');
        }
    });
});
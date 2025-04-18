document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    const dropdownMenus = document.querySelectorAll('.dropdown-menu');

    dropdownToggles.forEach((toggle, index) => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            // Ocultar todos los menús excepto el actual
            dropdownMenus.forEach((menu, i) => {
                if (i !== index) {
                    menu.classList.remove('show');
                }
            });
            // Mostrar/ocultar el menú actual
            dropdownMenus[index].classList.toggle('show');
        });
    });

    // Cerrar los menús desplegables si se hace clic fuera de ellos
    window.addEventListener('click', function(e) {
        dropdownMenus.forEach(menu => {
            const relatedToggle = menu.previousElementSibling; // El botón está antes del menú
            if (menu.classList.contains('show') && !menu.contains(e.target) && relatedToggle && !relatedToggle.contains(e.target)) {
                menu.classList.remove('show');
            }
        });
    });
});
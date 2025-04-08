// form/usuarios habilitar/deshabilitar
document.addEventListener("DOMContentLoaded", function() {
    fetch("/components/form.html")
    .then(response => response.text())
    .then(data => {
        document.querySelector(".userForm").innerHTML = data; 
    })
    .catch(error => console.error("Error cargando el userForm:", error));
});

//Se actualiza el texto del parrafo
function cambiarTextoLabel(texto) {
    document.getElementById('idLabel').textContent = texto;
}

if (vistaActual === 'cultivos') {
    cambiarTextoLabel('cultivo');
} else if (vistaActual === 'usuarios') {
    cambiarTextoLabel('usuario');
} else if (vistaActual === 'insumos') {
    cambiarTextoLabel('insumo');
} else if (vistaActual === 'cicloCultivo') {
    cambiarTextoLabel('ciclo de cultivo');
}
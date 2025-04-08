// header
document.addEventListener("DOMContentLoaded", function() {
    fetch("/frontend/public/views/components/header.html")
    .then(response => response.text())
    .then(data => {
        document.querySelector(".hero--unique").innerHTML = data; 
    })
    .catch(error => console.error("Error cargando el hero:", error));
});
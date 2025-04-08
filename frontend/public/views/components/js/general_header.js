// header
document.addEventListener("DOMContentLoaded", function() {
    fetch("/frontend/public/views/components/general_header.html")
    .then(response => response.text())
    .then(data => {
        document.querySelector(".hero--general").innerHTML = data; 
    })
    .catch(error => console.error("Error cargando el hero:", error));
});
document.addEventListener('DOMContentLoaded', function() {
    const selects = document.querySelectorAll('.main__form-field--select'); // Reemplaza con tu selector real
  
    if (selects.length === 2) {
      const abecedario = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
      for (let i = 0; i < abecedario.length; i++) {
        const letra = abecedario[i];
        const option = document.createElement('option');
        option.value = letra;
        option.textContent = letra;
  
        selects[0].appendChild(option.cloneNode(true)); // Aplica al primer select de la lista
        selects[1].appendChild(option);             // Aplica al segundo select de la lista
      }
    } else {
      console.error('No se encontraron exactamente dos elementos select con el selector especificado');
    }
  });
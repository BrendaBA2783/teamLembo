document.addEventListener('DOMContentLoaded', () => {
    const addSensorButtons = document.querySelectorAll('.main__form-action--icon-sensor');

    addSensorButtons.forEach(button => {
      button.addEventListener('click', () => {
        const group = button.closest('.main__form-group--flex');
        const container = group.querySelector('.main__form-box-group--sensor');
        const boxes = container.querySelectorAll('.main__form-box');

        // Verificar máximo de 3
        if (boxes.length >= 3) {
          alert('Solo puedes agregar hasta 3 sensores.');
          return;
        }

        const firstBox = boxes[0];
        const clonedBox = firstBox.cloneNode(true);

        /* Eliminar el p (label) del clon */
        const label = clonedBox.querySelector('p');
        if (label) label.remove();

        /* Reiniciar el select */
        const select = clonedBox.querySelector('select');
        if (select) select.selectedIndex = 0;

        // Crear botón eliminar
        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'main__form-action--remove';
        removeBtn.title = 'Eliminar este sensor';
        removeBtn.innerHTML = '<li class="fas fa-minus"></li>';

        removeBtn.addEventListener('click', () => {
          clonedBox.remove();
        });

        clonedBox.appendChild(removeBtn);

        container.appendChild(clonedBox);
      });
    });
});
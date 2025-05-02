document.addEventListener('DOMContentLoaded', () => {
    const addButtons = document.querySelectorAll('.main__form-action--icon-supplies');

    addButtons.forEach(button => {
      button.addEventListener('click', () => {
        const group = button.closest('.main__form-group--flex');
        const container = group.querySelector('.main__form-box-group');
        const firstBox = container.querySelector('.main__form-box');

        const clonedBox = firstBox.cloneNode(true);

        // Eliminar el <p> del clon
        const label = clonedBox.querySelector('p');
        if (label) label.remove();
        
        // Limpiar el select
        const select = clonedBox.querySelector('select');
        if (select) select.selectedIndex = 0;

        // Crear botón eliminar
        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'main__form-action--remove';
        removeBtn.title = 'Eliminar seleccion de insumo';
        removeBtn.innerHTML = '<li class="fas fa-minus"></li>';

        // Evento para eliminar este bloque
        removeBtn.addEventListener('click', () => {
          clonedBox.remove();
        });

        // Agregar botón al bloque
        clonedBox.appendChild(removeBtn);

        container.appendChild(clonedBox);
      });
    });
});
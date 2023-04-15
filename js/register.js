document.addEventListener('DOMContentLoaded', () => {
  function filtro(event) {
    let tecla = event.key;
    if (['.', 'e', '-'].includes(tecla)) event.preventDefault();
  }

  phoneFormField = document.getElementById('phone');
  phoneFormField.addEventListener('keydown', filtro);
});

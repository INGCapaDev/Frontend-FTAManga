document.addEventListener('DOMContentLoaded', () => {
  function pintarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito'));
    const nPrecio = Object.values(carrito).reduce(
      (acc, { cantidad, price }) => acc + cantidad * price,
      0
    );
    const nCantidad = Object.values(carrito).reduce(
      (acc, { cantidad }) => acc + cantidad,
      0
    );
    document.getElementById('total-mxn').textContent = nPrecio;

    document.getElementById('carrito-cantidad').textContent = nCantidad;
    const contenedorProductos = document.getElementById('productsContainer');
    const productosTemplate = document.getElementById('productTemplate');
    const fragment = document.createDocumentFragment();
    const totalclone = document.getElementById('total-li').cloneNode(true);
    for (const data of Object.values(carrito)) {
      const clone = productosTemplate.content.cloneNode(true);

      clone.querySelector('#product-name').textContent = data.name;
      clone.querySelector('#product-price').textContent = data.cantidad;

      fragment.appendChild(clone);
    }

    fragment.appendChild(totalclone);
    contenedorProductos.innerHTML = '';
    contenedorProductos.append(fragment);
  }

  async function createSale(event) {
    try {
      event.preventDefault();
      const pay = document.getElementById('paymentMethod').value;
      const carrito = JSON.parse(localStorage.getItem('carrito'));
      const nPrecio = Object.values(carrito).reduce(
        (acc, { cantidad, price }) => acc + cantidad * price,
        0
      );
    } catch (error) {
      window.alert('Ocurrio un error');
      console.log(error);
    }
  }

  const formCheckout = document.getElementById('form-checkout');
  formCheckout.addEventListener('submit', createSale);
  pintarCarrito();
});

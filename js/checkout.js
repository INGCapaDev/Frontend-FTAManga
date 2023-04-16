document.addEventListener('DOMContentLoaded', () => {
  const baseUrl = '/api/api/';
  // const baseUrl = 'http://localhost:3000/api/';
  if (sessionStorage.getItem('token')) {
    const TOKEN = JSON.parse(sessionStorage.getItem('token'));
    axios.defaults.headers.common['Authorization'] = `Bearer ${TOKEN}`;
  }

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
      const id_user = JSON.parse(sessionStorage.getItem('user')).id;
      const carrito = JSON.parse(localStorage.getItem('carrito'));
      const total = Object.values(carrito).reduce(
        (acc, { cantidad, price }) => acc + cantidad * price,
        0
      );

      const newSale = {
        pay,
        id_user,
        total,
      };

      const urlSale = `${baseUrl}sales`;
      const urlSaleDetail = `${baseUrl}sale/details`;
      const sale = await axios.post(urlSale, newSale);

      for (const data of Object.values(carrito)) {
        const price = parseFloat(data.price);
        const cantidad = parseInt(data.cantidad);
        const subtotal = parseFloat(price * cantidad);

        const newSaleDetail = {
          id_sale: sale.data.id,
          id_product: data.id,
          quantity: data.cantidad,
          subtotal,
        };

        await axios.post(urlSaleDetail, newSaleDetail);
      }

      localStorage.removeItem('carrito');
      window.alert('Gracias por su compra');
      window.location.href = '/html/productos.html';
    } catch (error) {
      window.alert('Ocurrio un error');
      console.log(error);
    }
  }

  const formCheckout = document.getElementById('form-checkout');
  formCheckout.addEventListener('submit', createSale);
  pintarCarrito();
});

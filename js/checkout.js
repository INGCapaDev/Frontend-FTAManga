document.addEventListener('DOMContentLoaded', () => {
  const carrito = JSON.parse(localStorage.getItem('carrito'));
  const nPrecio = Object.values(carrito).reduce(
    (acc, { cantidad, price }) => acc + cantidad * price,
    0
  );

  document.getElementById('total-mxn').textContent = nPrecio;

  document.getElementById('carrito-cantidad').textContent =
    Object.keys(carrito).length;

  async function createSale(event) {
    event.preventDefault();
    const pay = document.getElementById('paymentMethod').value;
    console.log(pay);
  }

  const formCheckout = document.getElementById('form-checkout');
  formCheckout.addEventListener('submit', createSale);
});

document.addEventListener('DOMContentLoaded', () => {
  const baseUrl = '/api/api/products';

  const mostrarTodos = async () => {
    return await axios.get(baseUrl);
  };

  async function mostrarProductos() {
    const contenedorProductos = document.getElementById(
      'contenedor--productos'
    );
    const templateProduct = document.getElementById('templateProduct');
    const fragment = document.createDocumentFragment();

    try {
      const response = await mostrarTodos();

      for (const data of response.data.data) {
        const clone = templateProduct.content.cloneNode(true);

        const price = data.price.toFixed(2);

        if (data.img) {
          clone.querySelector('img').src = data.img;
        }
        if (!data.img) {
          clone.querySelector('img').src =
            'https://res.cloudinary.com/dghcswbuw/image/upload/v1680234812/ftamanga/ok0wepcs3tipmstgtvx1.jpg';
        }

        clone.querySelector('.producto--boton').dataset.id = data.id;
        clone.querySelector('h3').textContent = data.name;
        clone.querySelector(
          'span.producto--precio'
        ).textContent = `$ ${price} MXN`;
        clone.querySelector(
          'span.editorial'
        ).textContent = `Editorial: ${data.editorial}`;
        clone.querySelector(
          'span.year'
        ).textContent = `Publicacion: ${data.year}`;

        fragment.appendChild(clone);
      }

      contenedorProductos.innerHTML = '';
      contenedorProductos.appendChild(fragment);
    } catch (error) {
      console.log(error);
    }
  }

  mostrarProductos();
});

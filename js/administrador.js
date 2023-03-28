document.addEventListener('DOMContentLoaded', () => {
  const baseUrl = 'http://localhost:3001/api/products/';

  const mostrarTodos = async () => {
    return await axios.get(baseUrl);
  };

  const productRender = async () => {
    const table = document.getElementById('tableData');
    const productTemplate = document.getElementById('productTemplate');
    const fragment = document.createDocumentFragment();

    try {
      const response = await mostrarTodos();

      for (const data of response.data.data) {
        const clone = productTemplate.content.cloneNode(true);

        const price = data.price.toFixed(3);
        clone.querySelector('#id').textContent = data.id;
        clone.querySelector('#name').textContent = data.name;
        clone.querySelector('#price').textContent = `$ ${price}`;
        clone.querySelector('#editorial').textContent = data.editorial;
        if (data.img != null) {
          clone.querySelector('#img').src = data.img;
        }
        if (data.img == null) {
          clone.querySelector('#img').src = '/img/defaultImage.jpg';
        }
        clone.querySelector('#year').textContent = data.year;

        clone.querySelector('.edit').addEventListener('click', () => {
          document.querySelector('#form-edit-id').value = data.id;
          document.querySelector('#nombre-edit').value = data.name;
          document.querySelector('#precio-edit').value = data.price;
          document.querySelector('#editorial-edit').value = data.editorial;
          if (data.img != null) {
            document.querySelector('#img-edit').src = data.img;
          }
          if (data.img == null) {
            document.querySelector('#img-edit').src = '/img/defaultImage.jpg';
          }
          document.querySelector('#year-edit').value = data.year;
          $('#editEmployeeModal').modal();
        });

        clone.querySelector('.delete').addEventListener('click', () => {
          document.querySelector('#form-delete-id').value = data.id;
          $('#deleteEmployeeModal').modal();
        });

        fragment.appendChild(clone);
      }
      table.innerHTML = '';
      table.appendChild(fragment);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerDatosAgregar = () => {
    const name = document.getElementById('nombre-add').value;
    const price = document.getElementById('precio-add').value;
    const editorial = document.getElementById('editorial-add').value;
    const year = document.getElementById('year-add').value;

    const inputFile = document.getElementById('imagen-add');
    if (inputFile.files && inputFile.files[0]) {
      const img = inputFile.files[0];

      var formData = new FormData();
      formData.append('img', img);
      formData.append('name', name);
      formData.append('price', price);
      formData.append('editorial', editorial);
      formData.append('year', year);

      return formData;
    }

    const newProduct = {
      name,
      price,
      editorial,
      year,
    };

    return newProduct;
  };

  const agregarForm = document.getElementById('addForm');
  agregarForm.onsubmit = async (event) => {
    event.preventDefault();
    const newProduct = obtenerDatosAgregar();
    console.log(newProduct);
    try {
      await axios.post(baseUrl, newProduct);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const limpiarCampos = () => {
    document.getElementById('nombre-edit').value = '';
    document.getElementById('precio-edit').value = '';
    document.getElementById('editorial-edit').value = '';
    document.getElementById('year-edit').value = '';
  };

  const btnLimpiar = document.getElementById('limpiar-campos');
  btnLimpiar.addEventListener('click', limpiarCampos);

  productRender();
});

document.addEventListener('DOMContentLoaded', () => {
  // const baseUrl = '/api/api/products/';
  const baseUrl = 'http://localhost:3000/api/products/';

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
        if (data.img) {
          clone.querySelector('#img').src = data.img;
        }
        if (!data.img) {
          clone.querySelector('#img').src =
            'https://res.cloudinary.com/dghcswbuw/image/upload/v1680234812/ftamanga/ok0wepcs3tipmstgtvx1.jpg';
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
            document.querySelector('#img-edit').src =
              'https://res.cloudinary.com/dghcswbuw/image/upload/v1680234812/ftamanga/ok0wepcs3tipmstgtvx1.jpg';
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
    const alert = document.getElementById('alert-add');

    try {
      alert.hidden = false;
      alert.innerHTML = 'Subiendo a la base de datos...';
      await axios.post(baseUrl, newProduct);
      window.location.reload();
    } catch (error) {
      alert.hidden = true;
      if (error.response.status === 401) {
        window.alert('Usuario NO Autorizado');
        window.location.href = '/index.html';
        return;
      }
      window.alert(error.response.data.error);
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

  const obtenerDatosEliminar = () => {
    return document.getElementById('form-delete-id').value;
  };

  const eliminarForm = document.getElementById('deleteForm');
  eliminarForm.onsubmit = async (event) => {
    event.preventDefault();
    const id = obtenerDatosEliminar();
    const url = `${baseUrl}${id}`;

    try {
      await axios.delete(url);
      window.location.reload();
    } catch (error) {
      if (error.response.status === 401) {
        window.alert('Usuario NO Autorizado');
        window.location.href = '/index.html';
        return;
      }
      window.alert(error.response.data.error);
      console.log(error);
    }
  };

  const obtenerDatosBuscar = () => {
    return document.getElementById('form-search-id').value;
  };

  const buscarForm = document.getElementById('searchForm');
  buscarForm.onsubmit = async (event) => {
    event.preventDefault();
    const table = document.getElementById('tableData');
    const productTemplate = document.getElementById('productTemplate');
    const fragment = document.createDocumentFragment();
    const id = obtenerDatosBuscar();
    const url = `${baseUrl}${id}`;
    const alert = document.getElementById('alert-search');

    try {
      let { data } = await axios.get(url);
      data = data.data;
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
        clone.querySelector('#img').src =
          'https://res.cloudinary.com/dghcswbuw/image/upload/v1680234812/ftamanga/ok0wepcs3tipmstgtvx1.jpg';
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
          document.querySelector('#img-edit').src =
            'https://res.cloudinary.com/dghcswbuw/image/upload/v1680234812/ftamanga/ok0wepcs3tipmstgtvx1.jpg';
        }
        document.querySelector('#year-edit').value = data.year;
        $('#editEmployeeModal').modal();
      });

      clone.querySelector('.delete').addEventListener('click', () => {
        document.querySelector('#form-delete-id').value = data.id;
        $('#deleteEmployeeModal').modal();
      });

      fragment.appendChild(clone);
      table.innerHTML = '';
      table.appendChild(fragment);
      $('#searchEmployeeModal').modal('hide');
    } catch (error) {
      alert.hidden = false;
      alert.innerHTML = error.response.data.error;
    }
  };

  $('#searchEmployeeModal').on('hidden.bs.modal', () => {
    document.getElementById('alert-search').hidden = true;
    document.getElementById('alert-search').innerHTML = '';
    document.getElementById('form-search-id').value = '';
  });

  const obtenerDatosEditar = () => {
    const id = document.getElementById('form-edit-id').value;
    const name = document.getElementById('nombre-edit').value;
    const price = document.getElementById('precio-edit').value;
    const editorial = document.getElementById('editorial-edit').value;
    const year = document.getElementById('year-edit').value;

    const inputFile = document.getElementById('imagen-edit');
    if (inputFile.files && inputFile.files[0]) {
      const img = inputFile.files[0];

      var formData = new FormData();
      formData.append('id', id);
      formData.append('img', img);
      formData.append('name', name);
      formData.append('price', price);
      formData.append('editorial', editorial);
      formData.append('year', year);

      return formData;
    }

    const newProduct = {
      id,
      name,
      price,
      editorial,
      year,
    };

    return newProduct;
  };

  const editarForm = document.getElementById('editForm');
  editarForm.onsubmit = async (event) => {
    event.preventDefault();
    const newData = obtenerDatosEditar();
    const id = document.getElementById('form-edit-id').value;
    const url = `${baseUrl}${id}`;
    const alert = document.getElementById('alert-update');

    try {
      alert.hidden = false;
      alert.innerHTML = 'Subiendo a la base de datos...';
      await axios.put(url, newData);
      window.location.reload();
    } catch (error) {
      alert.hidden = true;
      if (error.response.status === 401) {
        window.alert('Usuario NO Autorizado');
        window.location.href = '/index.html';
        return;
      }
      window.alert(error.response.data.error);
      console.log(error);
    }
  };

  productRender();
});

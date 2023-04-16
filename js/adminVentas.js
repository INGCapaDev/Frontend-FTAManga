document.addEventListener('DOMContentLoaded', () => {
  // const baseUrl = '/api/api/users/';
  const baseUrl = 'http://localhost:3000/api/users/';

  if (sessionStorage.getItem('token')) {
    const TOKEN = JSON.parse(sessionStorage.getItem('token'));
    axios.defaults.headers.common['Authorization'] = `Bearer ${TOKEN}`;
  }

  const mostrarTodos = async () => {
    return await axios.get(baseUrl);
  };

  const userRender = async () => {
    const table = document.getElementById('tableData');
    const userTemplate = document.getElementById('userTemplate');
    const fragment = document.createDocumentFragment();

    try {
      const response = await mostrarTodos();

      for (const data of response.data.data) {
        const clone = userTemplate.content.cloneNode(true);

        clone.querySelector('#id').textContent = data.id;
        clone.querySelector('#name').textContent = data.name;
        clone.querySelector('#user').textContent = data.user;
        clone.querySelector('#address').textContent = data.address;
        clone.querySelector('#phone').textContent = data.phone;
        clone.querySelector('#email').textContent = data.email;
        clone.querySelector('#role').textContent = data.role;

        clone.querySelector('.edit').addEventListener('click', () => {
          document.querySelector('#form-edit-id').value = data.id;
          document.querySelector('#name-edit').value = data.name;
          document.querySelector('#user-edit').value = data.user;
          document.querySelector('#address-edit').value = data.address;
          document.querySelector('#phone-edit').value = data.phone;
          document.querySelector('#email-edit').value = data.email;
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
    const name = document.getElementById('name-add').value;
    const user = document.getElementById('user-add').value;
    const password = document.getElementById('pass-add').value;
    const address = document.getElementById('address-add').value;
    const phone = document.getElementById('phone-add').value;
    const email = document.getElementById('email-add').value;

    const newUser = {
      name,
      user,
      password,
      address,
      phone,
      email,
    };

    return newUser;
  };

  const agregarForm = document.getElementById('addForm');
  agregarForm.onsubmit = async (event) => {
    event.preventDefault();
    const newUser = obtenerDatosAgregar();
    const alert = document.getElementById('alert-add');

    try {
      alert.hidden = false;
      alert.innerHTML = 'Subiendo a la base de datos...';
      await axios.post(baseUrl, newUser);
      window.location.reload();
    } catch (error) {
      alert.hidden = true;
      if (error.response.status === 401) {
        window.alert('Usuario NO Autorizado');
        window.location.href = '/index.html';
        return;
      }
      if (error.response.data.error === 'ERROR_REGISTER_USER') {
        return window.alert('El usuario o el correo ya existe');
      }

      if (error.response.data.errors[0]) {
        alert.hidden = false;
        alert.innerHTML = error.response.data.errors[0].msg;
        return;
      }
      window.alert('Ocurrio un error');
      console.log(error);
    }
  };

  const limpiarCampos = () => {
    document.getElementById('name-edit').value = '';
    document.getElementById('user-edit').value = '';
    document.getElementById('pass-edit').value = '';
    document.getElementById('address-edit').value = '';
    document.getElementById('phone-edit').value = '';
    document.getElementById('email-edit').value = '';
    document.getElementById('role-edit').value = '';
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
      window.alert('No se pudo eliminar el usuario');
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
    const userTemplate = document.getElementById('userTemplate');
    const fragment = document.createDocumentFragment();
    const id = obtenerDatosBuscar();
    const url = `${baseUrl}${id}`;
    const alert = document.getElementById('alert-search');

    try {
      let { data } = await axios.get(url);
      data = data.data;
      const clone = userTemplate.content.cloneNode(true);

      clone.querySelector('#id').textContent = data.id;
      clone.querySelector('#name').textContent = data.name;
      clone.querySelector('#user').textContent = data.user;
      clone.querySelector('#address').textContent = data.address;
      clone.querySelector('#phone').textContent = data.phone;
      clone.querySelector('#email').textContent = data.email;
      clone.querySelector('#role').textContent = data.role;

      clone.querySelector('.edit').addEventListener('click', () => {
        document.querySelector('#form-edit-id').value = data.id;
        document.querySelector('#name-edit').value = data.name;
        document.querySelector('#user-edit').value = data.user;
        document.querySelector('#address-edit').value = data.address;
        document.querySelector('#phone-edit').value = data.phone;
        document.querySelector('#email-edit').value = data.email;
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
    const name = document.getElementById('name-edit').value;
    const user = document.getElementById('user-edit').value;
    const password = document.getElementById('pass-edit').value;
    const address = document.getElementById('address-edit').value;
    const phone = document.getElementById('phone-edit').value;
    const email = document.getElementById('email-edit').value;
    const role = document.getElementById('role-edit').value;

    const newUser = {
      name,
      user,
      password,
      address,
      phone,
      email,
      role,
    };

    return newUser;
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

      if (error.response.data.error === 'ERROR_UPDATE_USER') {
        return window.alert('El usuario o el correo ya existe');
      }

      if (error.response.data.errors[0]) {
        alert.hidden = false;
        alert.innerHTML = error.response.data.errors[0].msg;
        return;
      }
      window.alert('Ocurrio un error');
      console.log(error);
    }
  };

  userRender();
});

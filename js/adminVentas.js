document.addEventListener('DOMContentLoaded', () => {
  // const baseUrl = '/api/api/sales/';
  const baseUrl = 'http://localhost:3000/api/sales/';

  if (sessionStorage.getItem('token')) {
    const TOKEN = JSON.parse(sessionStorage.getItem('token'));
    axios.defaults.headers.common['Authorization'] = `Bearer ${TOKEN}`;
  }

  const mostrarTodos = async () => {
    return await axios.get(baseUrl);
  };

  const userRender = async () => {
    const table = document.getElementById('tableData');
    const saleTemplate = document.getElementById('saleTemplate');
    const fragment = document.createDocumentFragment();

    try {
      const response = await mostrarTodos();

      for (const data of response.data.data) {
        const clone = saleTemplate.content.cloneNode(true);
        console.log(data);
        // clone.querySelector('#id').textContent = data.id;
        // clone.querySelector('#name').textContent = data.name;
        // clone.querySelector('#user').textContent = data.user;
        // clone.querySelector('#address').textContent = data.address;
        // clone.querySelector('#phone').textContent = data.phone;
        // clone.querySelector('#email').textContent = data.email;
        // clone.querySelector('#role').textContent = data.role;

        clone.querySelector('.edit').addEventListener('click', () => {
          $('#editEmployeeModal').modal();
        });

        fragment.appendChild(clone);
      }
      table.innerHTML = '';
      table.appendChild(fragment);
    } catch (error) {
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
    const saleTemplate = document.getElementById('saleTemplate');
    const fragment = document.createDocumentFragment();
    const id = obtenerDatosBuscar();
    const url = `${baseUrl}${id}`;
    const alert = document.getElementById('alert-search');

    try {
      let { data } = await axios.get(url);
      data = data.data;
      const clone = saleTemplate.content.cloneNode(true);
      console.log(data);
      // clone.querySelector('#id').textContent = data.id;
      // clone.querySelector('#name').textContent = data.name;
      // clone.querySelector('#user').textContent = data.user;
      // clone.querySelector('#address').textContent = data.address;
      // clone.querySelector('#phone').textContent = data.phone;
      // clone.querySelector('#email').textContent = data.email;
      // clone.querySelector('#role').textContent = data.role;

      clone.querySelector('.edit').addEventListener('click', () => {
        $('#editEmployeeModal').modal();
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

  userRender();
});

document.addEventListener('DOMContentLoaded', () => {
  // const baseUrl = '/api/api/sales/';
  const baseUrl = 'http://localhost:3000/api/sales/';
  const table = document.getElementById('tableData');
  const saleTemplate = document.getElementById('saleTemplate');
  const detailTemplate = document.getElementById('detailTemplate');
  const detailsContainer = document.getElementById('detailsContainer');

  if (sessionStorage.getItem('token')) {
    const TOKEN = JSON.parse(sessionStorage.getItem('token'));
    axios.defaults.headers.common['Authorization'] = `Bearer ${TOKEN}`;
  }

  const mostrarTodos = async () => {
    return await axios.get(baseUrl);
  };

  const userRender = async () => {
    const fragment = document.createDocumentFragment();
    const detailFragment = document.createDocumentFragment();

    try {
      const response = await mostrarTodos();

      for (const data of response.data.data) {
        const clone = saleTemplate.content.cloneNode(true);
        clone.querySelector('#id').textContent = data.id;
        clone.querySelector('#user_name').textContent = data.user.name;
        clone.querySelector('#user_address').textContent = data.user.address;
        const total = parseFloat(data.total).toFixed(3);
        clone.querySelector('#total').textContent = `$ ${total}`;
        clone.querySelector('#pay').textContent = data.pay;

        const details = data.sales_details;
        clone.querySelector('.edit').addEventListener('click', () => {
          for (const detail of details) {
            const clone = detailTemplate.content.cloneNode(true);
            const subtotal = parseFloat(detail.subtotal).toFixed(3);
            clone.querySelector('#product-price').textContent = subtotal;
            clone.querySelector('#product-name').textContent =
              detail.product.name;
            clone.querySelector('#product-quantity').textContent =
              detail.quantity;
            detailFragment.appendChild(clone);
          }
          detailsContainer.innerHTML = '';
          detailsContainer.appendChild(detailFragment);
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
    const detailFragment = document.createDocumentFragment();
    const fragment = document.createDocumentFragment();
    const id = obtenerDatosBuscar();
    const url = `${baseUrl}${id}`;
    const alert = document.getElementById('alert-search');

    try {
      let { data } = await axios.get(url);
      data = data.data;
      const clone = saleTemplate.content.cloneNode(true);
      clone.querySelector('#id').textContent = data.id;
      clone.querySelector('#user_name').textContent = data.user.name;
      clone.querySelector('#user_address').textContent = data.user.address;
      const total = parseFloat(data.total).toFixed(3);
      clone.querySelector('#total').textContent = `$ ${total}`;
      clone.querySelector('#pay').textContent = data.pay;

      const details = data.sales_details;

      clone.querySelector('.edit').addEventListener('click', () => {
        for (const detail of details) {
          const clone = detailTemplate.content.cloneNode(true);
          const subtotal = parseFloat(detail.subtotal).toFixed(3);
          clone.querySelector('#product-price').textContent = subtotal;
          clone.querySelector('#product-name').textContent =
            detail.product.name;
          clone.querySelector('#product-quantity').textContent =
            detail.quantity;
          detailFragment.appendChild(clone);
        }
        detailsContainer.innerHTML = '';
        detailsContainer.appendChild(detailFragment);
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

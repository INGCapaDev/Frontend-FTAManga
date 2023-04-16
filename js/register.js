document.addEventListener('DOMContentLoaded', () => {
  // const baseUrl = '/api/api/auth/';
  const baseUrl = 'http://localhost:3000/api/auth/';

  function filtro(event) {
    let tecla = event.key;
    if (['.', 'e', '-'].includes(tecla)) event.preventDefault();
  }

  phoneFormField = document.getElementById('phone');
  phoneFormField.addEventListener('keydown', filtro);

  function getValuesRegister() {
    const user = document.getElementById('user').value;
    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;

    const values = {
      name,
      user,
      password,
      email,
      address,
      phone,
    };

    return values;
  }

  const formRegister = document.getElementById('formRegister');
  formRegister.addEventListener('submit', async (event) => {
    event.preventDefault();
    const newUser = getValuesRegister();
    const url = `${baseUrl}register`;

    try {
      const registerUser = await axios.post(url, newUser);
      const token = registerUser.data.data.token;
      const userData = registerUser.data.data.user;
      window.sessionStorage.setItem('user', JSON.stringify(userData));
      window.sessionStorage.setItem('token', JSON.stringify(token));

      window.alert('Usuario Registrado Correctamente');
      window.location.href = '/html/checkout.html';
    } catch (error) {
      if (error.response.data.error === 'ERROR_REGISTER_USER') {
        return window.alert('El usuario o el correo ya existe');
      }

      if (error.response.data.errors[0]) {
        return window.alert(error.response.data.errors[0].msg);
      }

      window.alert('Ocurrio un error');
      console.log(error);
    }
  });
});

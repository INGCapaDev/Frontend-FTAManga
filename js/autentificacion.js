const btnLimpiar = document.getElementById('btnLimpiar');
const user = document.getElementById('user');
const pass = document.getElementById('pass');

const limpiar = (event) => {
  event.preventDefault();
  pass.value = '';
  user.value = '';
};

btnLimpiar.addEventListener('click', limpiar);

window.onload = inicializar;

// const baseUrl = '/api/api/products/';
const baseUrl = 'http://localhost:3000/api/auth/';

function inicializar() {
  const formAutentificacion = document.getElementById('form--autentificacion');
  formAutentificacion.addEventListener('submit', autentificar);
}

async function autentificar(event) {
  event.preventDefault();

  const user = event.target.user.value;
  const password = event.target.pass.value;
  const url = `${baseUrl}login`;

  const loginInfo = {
    user,
    password,
  };

  try {
    const dataAuth = await axios.post(url, loginInfo);
    const token = dataAuth.data.data.token;
    const userData = dataAuth.data.data.user;
    window.sessionStorage.setItem('user', JSON.stringify(userData));
    window.sessionStorage.setItem('token', JSON.stringify(token));

    if (userData.role === 'Admin') {
      window.alert('Bienvenido al administrador');
      window.location.href = '/html/administrador.html';
      return;
    }
    window.alert('Usuario no autorizado');
  } catch (error) {
    console.log(error);
    if (error.response.status === 404 || error.response.status === 401) {
      window.alert(error.response.data.error);
    }
    if (error.response.data.errors) {
      error.response.data.errors.forEach((error) => {
        console.log(`Error: ${error.msg} Param: ${error.param}`);
      });
    }
  }

  /*
  const auth = await getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert('Bienvenido al administrador');
      window.location.href = '/html/administrador.html';
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert('Error Email o Password Incorrectos');
    });
    */
}

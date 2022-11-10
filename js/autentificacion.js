const btnLimpiar = document.getElementById("btnLimpiar");
const email = document.getElementById("correo");
const pass = document.getElementById("pass");

const limpiar = () => {
  pass.value = "";
  correo.value = "";
};

btnLimpiar.addEventListener("click", limpiar);

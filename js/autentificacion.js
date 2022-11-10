const btnLimpiar = document.getElementById("btnLimpiar");
const email = document.getElementById("correo");
const pass = document.getElementById("pass");

const limpiar = () => {
  pass.value = "";
  correo.value = "";
};

btnLimpiar.addEventListener("click", limpiar);

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import {
  signInWithEmailAndPassword,
  getAuth,
} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC75xXa9hKaJOFsFt1k76lt-4ac8SqDcKc",
  authDomain: "ftamanga-d6767.firebaseapp.com",
  databaseURL: "https://ftamanga-d6767-default-rtdb.firebaseio.com",
  projectId: "ftamanga-d6767",
  storageBucket: "ftamanga-d6767.appspot.com",
  messagingSenderId: "250816955229",
  appId: "1:250816955229:web:e9843c64808962c2da5eb4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

window.onload = inicializar;
var formAutentificacion;

function inicializar() {
  formAutentificacion = document.getElementById("form--autentificacion");
  formAutentificacion.addEventListener("submit", autentificar);
}

async function autentificar(event) {
  event.preventDefault();

  const email = event.target.correo.value;
  const password = event.target.pass.value;

  const auth = await getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("Bienvenido al administrador");
      window.location.href = "/html/administrador.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Error Email o Password Incorrectos");
    });
}

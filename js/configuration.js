// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";

import {
  getDatabase,
  onValue,
  ref,
  set,
  child,
  get,
  update,
  remove,
} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js";

import {
  getStorage,
  ref as refS,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-storage.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC75xXa9hKaJOFsFt1k76lt-4ac8SqDcKc",
  authDomain: "ftamanga-d6767.firebaseapp.com",
  projectId: "ftamanga-d6767",
  storageBucket: "ftamanga-d6767.appspot.com",
  messagingSenderId: "250816955229",
  appId: "1:250816955229:web:e9843c64808962c2da5eb4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

const btnAgregar = document.getElementById("btnAgregar");
const btnConsultar = document.getElementById("btnConsultar");
const btnActualizar = document.getElementById("btnActualizar");
const btnBorrar = document.getElementById("btnBorrar");
const btnTodos = document.getElementById("btnTodos");
const btnLimpiar = document.getElementById("btnLimpiar");
const btnVerImagen = document.getElementById("verImagen");
const archivos = document.getElementById("archivo");

//Insertar variables inputs
var codigo = "";
var nombre = "";
var editorial = "";
var precio = "";
var fecha = "";
var url = "";
var archivo = "";

function leerInputs() {
  codigo = document.getElementById("codigo").value;
  nombre = document.getElementById("nombre").value;
  editorial = document.getElementById("editorial").value;
  precio = document.getElementById("precio").value;
  fecha = document.getElementById("fecha").value;
  archivo = document.getElementById("archivo");
  url = document.getElementById("url").value;
}

function insertarDatos() {
  leerInputs();
  set(ref(db, "productos/" + codigo), {
    nombre: nombre,
    editorial: editorial,
    precio: precio,
    fecha: fecha,
    imagen: url,
    status: 0,
  })
    .then((res) => {
      alert("Se Inserto con exito");
      mostrarProductos();
    })
    .catch((error) => {
      alert("Surgio un error " + error);
    });
}

function mostrarDatos() {
  leerInputs();
  const dbref = ref(db);
  get(child(dbref, "productos/" + codigo))
    .then((snapshot) => {
      if (snapshot.exists()) {
        nombre = snapshot.val().nombre;
        editorial = snapshot.val().editorial;
        precio = snapshot.val().precio;
        fecha = snapshot.val().fecha;
        imagen = snapshot.val().imagen;
        escribirInputs();
      } else {
        alert("No se encontro el registro ");
      }
    })
    .catch((error) => {
      alert("Surgio un error " + error);
    });
}

function actualizar() {
  leerInputs();
  update(ref(db, "productos/" + codigo), {
    nombre: nombre,
    editorial: editorial,
    precio: precio,
    fecha: fecha,
    imagen: url,
    status: 0,
  })
    .then(() => {
      alert("Se realizo actualizacion");
      mostrarProductos();
    })
    .catch(() => {
      alert("Causo Error " + error);
    });
}

function desabilitar() {
  leerInputs();
  update(ref(db, "productos/" + codigo), {
    status: 1,
  })
    .then(() => {
      alert("Se realizo actualizacion");
      mostrarProductos();
    })
    .catch(() => {
      alert("Causo Error " + error);
    });
}

function mostrarProductos() {
  const db = getDatabase();
  const dbRef = ref(db, "alumnos");

  onValue(
    dbRef,
    (snapshot) => {
      lista.innerHTML = "";
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();

        lista.innerHTML =
          "<div class='formulario--campo'>" +
          lista.innerHTML +
          childKey +
          " | " +
          childData.nombre +
          " | " +
          childData.editorial +
          " | " +
          childData.precio +
          " | " +
          childData.fecha +
          " | " +
          childData.imagen +
          " | " +
          childData.status +
          "<br></div>";
        console.log(childKey + ":");
        console.log(childData.nombre);
      });
    },
    {
      onlyOnce: true,
    }
  );
}

function limpiar() {
  lista.innerHTML = "";
  codigo = "";
  nombre = "";
  editorial = "";
  precio = "";
  fecha = "";
  url = "";
  archivo = "";
  escribirInputs();
}

function escribirInputs() {
  document.getElementById("codigo").value = codigo;
  document.getElementById("nombre").value = nombre;
  document.getElementById("editorial").value = editorial;
  document.getElementById("precio").value = precio;
  document.getElementById("fecha").value = fecha;
  document.getElementById("archivo").value = archivo;
  document.getElementById("url").value = url;
}

function cargarImagen() {
  const file = event.target.files[0];
  const name = event.target.files[0].name;
  document.getElementById("imgNombre").value = name;

  const storage = getStorage();
  const storageRef = refS(storage, "imagenes/" + name);
  uploadBytes(storageRef, file).then((snapshot) => {
    alert("Se cargo la imagen");
  });
}

//btnAgregar.addEventListener('click', leerInputs);
btnAgregar.addEventListener("click", insertarDatos);
btnConsultar.addEventListener("click", mostrarDatos);
btnActualizar.addEventListener("click", actualizar);
btnBorrar.addEventListener("click", borrar);
btnTodos.addEventListener("click", mostrarAlumnos);
btnLimpiar.addEventListener("click", limpiar);
archivos.addEventListener("change", cargarImagen);
btnVerImagen.addEventListener("click", descargarImagen);

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";

import {
  getDatabase,
  onValue,
  ref,
} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-database.js";

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
const contenedorProductos = document.getElementById("contenedor--productos");
const templateProduct = document.getElementById("templateProduct");

function cardProducts(nombre, precio, editorial, fecha, url) {
  let template = templateProduct.content.cloneNode(true);
  let imagenProducto = template.querySelector("img");
  let nombreProducto = template.querySelector("h3");
  let precioProducto = template.querySelector("span.producto--precio");
  let descripcion = template.querySelector("span.producto--descripcion");

  imagenProducto.src = url;
  nombreProducto.innerHTML = nombre;
  precioProducto.innerHTML = "$" + parseFloat(precio).toFixed(2) + " MXN";
  descripcion.innerHTML =
    "Editorial: " + editorial + "<br/>" + "Publicacion: " + fecha;

  contenedorProductos.appendChild(template);
}

async function mostrarProductos() {
  const dbRef = ref(db, "productos");

  await onValue(
    dbRef,
    (snapshot) => {
      contenedorProductos.innerHTML = "";
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();

        if (childData.status === 0) {
          cardProducts(
            childData.nombre,
            childData.precio,
            childData.editorial,
            childData.fecha,
            childData.imagen
          );
        }

        console.log(childKey + ":");
        console.log(childData.nombre);
      });
    },
    {
      onlyOnce: true,
    }
  );
}

mostrarProductos();

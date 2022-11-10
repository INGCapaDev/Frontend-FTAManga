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
const btnDesactivar = document.getElementById("btnDesactivar");
const btnActivar = document.getElementById("btnActivar");
const btnLimpiar = document.getElementById("btnLimpiar");
const archivos = document.getElementById("archivo");
const defaultIMG =
  "https://firebasestorage.googleapis.com/v0/b/ftamanga-d6767.appspot.com/o/imagenes%2FdefaultImage.jpg?alt=media&token=de1aa06e-c4d0-4f4d-947b-5045d863fd07";

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
  archivo = document.getElementById("imgNombre");
  url = document.getElementById("url").value;
}

function insertarDatos() {
  leerInputs();
  const dbref = ref(db);

  if (codigo && nombre && editorial && precio && fecha && url != 0) {
    get(child(dbref, "productos/" + codigo))
      .then((snapshot) => {
        if (snapshot.exists()) {
          alert("Ya existe un registro con ese codigo ");
        } else {
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
      })
      .catch((error) => {
        alert("Surgio un error " + error);
      });
  } else if (codigo && nombre && editorial && precio && fecha != 0) {
    get(child(dbref, "productos/" + codigo))
      .then((snapshot) => {
        if (snapshot.exists()) {
          alert("Ya existe un registro con ese codigo ");
        } else {
          set(ref(db, "productos/" + codigo), {
            nombre: nombre,
            editorial: editorial,
            precio: precio,
            fecha: fecha,
            imagen: defaultIMG,
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
      })
      .catch((error) => {
        alert("Surgio un error " + error);
      });
  } else {
    alert("Todos los campos son necesarios...");
  }
}

function mostrarDatos() {
  leerInputs();
  const dbref = ref(db);
  if (codigo != 0) {
    get(child(dbref, "productos/" + codigo))
      .then((snapshot) => {
        if (snapshot.exists()) {
          nombre = snapshot.val().nombre;
          editorial = snapshot.val().editorial;
          precio = snapshot.val().precio;
          fecha = snapshot.val().fecha;
          url = snapshot.val().imagen;
          escribirInputs();
        } else {
          alert("No se encontro el registro ");
        }
      })
      .catch((error) => {
        alert("Surgio un error " + error);
      });
  } else {
    alert("Se necesita el codigo del producto...");
  }
}

function actualizar() {
  leerInputs();
  const dbref = ref(db);

  if (codigo && nombre && editorial && precio && fecha && url != 0) {
    get(child(dbref, "productos/" + codigo))
      .then((snapshot) => {
        if (snapshot.exists()) {
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
        } else {
          alert("No se encontro el registro ");
        }
      })
      .catch((error) => {
        alert("Surgio un error " + error);
      });
  } else {
    alert("Todos los campos son necesarios...");
  }
}

function desabilitar() {
  leerInputs();
  const dbref = ref(db);

  if (codigo != 0) {
    get(child(dbref, "productos/" + codigo))
      .then((snapshot) => {
        if (snapshot.exists()) {
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
        } else {
          alert("No se encontro el registro ");
        }
      })
      .catch((error) => {
        alert("Surgio un error " + error);
      });
  } else {
    alert("Se necesita el codigo del producto...");
  }
}

function habilitar() {
  leerInputs();
  const dbref = ref(db);

  if (codigo != 0) {
    get(child(dbref, "productos/" + codigo))
      .then((snapshot) => {
        if (snapshot.exists()) {
          update(ref(db, "productos/" + codigo), {
            status: 0,
          })
            .then(() => {
              alert("Se realizo actualizacion");
              mostrarProductos();
            })
            .catch(() => {
              alert("Causo Error " + error);
            });
        } else {
          alert("No se encontro el registro ");
        }
      })
      .catch((error) => {
        alert("Surgio un error " + error);
      });
  } else {
    alert("Se necesita el codigo del producto...");
  }
}

function mostrarProductos() {
  const db = getDatabase();
  const dbRef = ref(db, "productos");

  onValue(
    dbRef,
    (snapshot) => {
      lista.innerHTML = "";
      snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();

        if (childData.status === 0) {
          lista.innerHTML =
            "<div class='prolista'>" +
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
            " | Activo " +
            "<br></div>";
        } else {
          lista.innerHTML =
            "<div class='prolista'>" +
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
            " | Inactivo " +
            "<br></div>";
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

function limpiar() {
  codigo = "";
  nombre = "";
  editorial = "";
  precio = "";
  fecha = "";
  url = "";
  archivo = "";
  archivos.value = null;
  escribirInputs();
  document.getElementById("imagen").src = defaultIMG;
}

function escribirInputs() {
  document.getElementById("codigo").value = codigo;
  document.getElementById("nombre").value = nombre;
  document.getElementById("editorial").value = editorial;
  document.getElementById("precio").value = precio;
  document.getElementById("fecha").value = fecha;
  document.getElementById("imgNombre").value = archivo;
  document.getElementById("url").value = url;
  document.getElementById("imagen").src = url;
}

function cargarImagen() {
  const file = event.target.files[0];
  const name = event.target.files[0].name;
  document.getElementById("imgNombre").value = name;

  const storage = getStorage();
  const storageRef = refS(storage, "imagenes/" + name);
  uploadBytes(storageRef, file).then((snapshot) => {
    alert("Se cargo la imagen");
    descargarImagen();
  });
}

function descargarImagen() {
  archivo = document.getElementById("imgNombre").value;

  const storage = getStorage();
  const starstRef = refS(storage, "imagenes/" + archivo);

  getDownloadURL(starstRef)
    .then((url) => {
      console.log(url);

      document.getElementById("imagen").src = url;
      document.getElementById("url").value = url;
    })
    .catch((error) => {
      switch (error.code) {
        case "storage/object-not-found":
          console.log("No se encontro la imagen");
          break;
        case "storage/unauthorized":
          console.log("NO Tiene permisos para accesar imagen");
          break;
        case "storage/canceled":
          console.log("se cancelo la subida");
          break;
        // ...
        case "storage/unknown":
          // Unknown error occurred, inspect the server response
          break;
      }
    });
}

mostrarProductos();
btnAgregar.addEventListener("click", insertarDatos);
btnConsultar.addEventListener("click", mostrarDatos);
btnActualizar.addEventListener("click", actualizar);
btnDesactivar.addEventListener("click", desabilitar);
btnActivar.addEventListener("click", habilitar);
btnLimpiar.addEventListener("click", limpiar);
archivos.addEventListener("change", cargarImagen);

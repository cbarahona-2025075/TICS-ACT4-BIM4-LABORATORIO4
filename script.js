// Dirección de la API a utilizar
const url = "https://fakestoreapi.com/products";

// Elementos del HTML que vamos a usar
const contenedor = document.getElementById("productos");
const buscador = document.getElementById("buscador");
const btnBuscar = document.getElementById("btnBuscar");

// Aquí guardamos los productos que trae la API
let productos = [];

// Pide los datos a la API
async function obtenerProductos() {
    try {
        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            throw new Error("No se pudieron obtener los productos");
        }

        productos = await respuesta.json();
        mostrarProductos(productos);

    } catch (error) {
        contenedor.innerHTML = "<p>No se pudieron cargar los productos.</p>";
        console.error("Error:", error);
    }
}

// Muestra una lista de productos en pantalla
function mostrarProductos(lista) {
    contenedor.innerHTML = "";

    if (lista.length === 0) {
        contenedor.innerHTML = "<p>No se encontraron productos.</p>";
        return;
    }

    lista.forEach((producto) => {
        const item = document.createElement("div");
        item.classList.add("producto");
        item.innerHTML = `
            <img src="${producto.image}" alt="${producto.title}">
            <h2>${producto.title}</h2>
            <p>$${producto.price}</p>
        `;
        contenedor.appendChild(item);
    });
}

// Filtra los productos según lo que escriba el usuario
function buscarProducto() {
    const texto = buscador.value.toLowerCase();
    const resultados = productos.filter((producto) =>
        producto.title.toLowerCase().includes(texto)
    );
    mostrarProductos(resultados);
}

// Conecta el botón con la búsqueda
btnBuscar.addEventListener("click", buscarProducto);

// Carga los productos al abrir la página
obtenerProductos();
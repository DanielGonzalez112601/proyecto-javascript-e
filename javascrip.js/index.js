
let carrito = [];


class Producto {
    constructor(id, nombre, precio, imagen) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
    }
}

const imagenesProductos = {
    "REAL MADRID": "./camisetas/real-madrid.webp",
    "ATLETICO DE MADRID": "./camisetas/atletico-de-madrid-.jpg",
    "REAL BETIS": "./camisetas/betis.webp",
    "VALENCIA": "./camisetas/valencia.jpg",
    "BARCELONA": "./camisetas/barselona.webp",
    "CELTA DE VIGO": "./camisetas/celta-de-vigo.jpg"
  };
  
function agregarAlCarrito(id) {
    let producto;

    if (id === 1) {
        producto = new Producto(id, "REAL MADRID", 120, "./camisetas/real-madrid.webp");
    } else if (id === 2) {
        producto = new Producto(id, "ATLETICO DE MADRID", 120, "./camisetas/atletico-de-madrid-.jpg");
    } else if (id === 3) {
        producto = new Producto(id, "REAL BETIS", 100, "./camisetas/betis.webp");
    } else if (id === 4) {
        producto = new Producto(id, "VALENCIA", 100, "./camisetas/valencia.jpg");
    } else if (id === 5) {
        producto = new Producto(id, "BARCELONA", 100, "./camisetas/barselona.webp");
    } else if (id === 6) {
        producto = new Producto(id, "CELTA DE VIGO", 100, "./camisetas/celta-de-vigo.jpg");
    }

    carrito.push(producto);

 
    actualizarCarrito();
    actualizarMontoTotal();
}


function actualizarCarrito() {
    let carritoElemento = document.getElementById("carrito");
    carritoElemento.innerHTML = "";


    for (let i = 0; i < carrito.length; i++) {
        let producto = carrito[i];

        let li = document.createElement("li");
        let img = document.createElement("img");
        img.src = producto.imagen;
        img.alt = producto.nombre;
        let spanNombre = document.createElement("span");
        spanNombre.textContent = producto.nombre;
        let spanPrecio = document.createElement("span");
        spanPrecio.textContent = "$" + producto.precio.toFixed(2);
        let botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.setAttribute("onclick", "eliminarDelCarrito(" + i + ")");

        li.appendChild(img);
        li.appendChild(spanNombre);
        li.appendChild(document.createTextNode(" - "));
        li.appendChild(spanPrecio);
        li.appendChild(botonEliminar);

        carritoElemento.appendChild(li);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function actualizarMontoTotal() {
    let total = 0;

    for (let i = 0; i < carrito.length; i++) {
        total += carrito[i].precio;
    }

    let montoTotalElemento = document.getElementById("monto-total");
    montoTotalElemento.textContent = "$" + total.toFixed();


    localStorage.setItem("montoTotal", total.toFixed());
}


function cargarDesdeLocalStorage() {
    let carritoGuardado = localStorage.getItem("carrito");
    let montoTotalGuardado = localStorage.getItem("montoTotal");

    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarCarrito();
    }
    if (montoTotalGuardado) {
        let montoTotalElemento = document.getElementById("monto-total");
        montoTotalElemento.textContent = "$" + montoTotalGuardado;
    }
}


document.addEventListener("DOMContentLoaded", function() {
    cargarDesdeLocalStorage();
});


function eliminarDelCarrito(index) {
    carrito.splice(index, 1);


    actualizarCarrito();
    actualizarMontoTotal();
}
